// Hook para una categoría de producto: resuelve el slug a término product_cat,
// obtiene sus productos y también su colección raíz (para migas de pan).

import { useState, useEffect } from 'react';
import {
  getProductCategoryBySlug,
  getProductsByCategory,
  getProductCategoriesByIds,
} from '../services/wordpressApi';
import { collectionByRootSlug } from '../config/collections';

export function useProductCategory(slug) {
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setCategory(null);
    setCollection(null);
    setProducts([]);

    getProductCategoryBySlug(slug)
      .then(async (cat) => {
        if (!active) return;
        if (!cat) {
          setCategory(null);
          return;
        }
        setCategory(cat);

        // Productos de la categoría + colección raíz (por el término padre).
        const [list, parents] = await Promise.all([
          getProductsByCategory(cat.id, { perPage: 24 }),
          cat.parent ? getProductCategoriesByIds([cat.parent]) : Promise.resolve([]),
        ]);
        if (!active) return;
        if (Array.isArray(list)) setProducts(list);
        // Si la categoría tiene padre, la colección es el padre; si es una raíz
        // (p. ej. Fckoff), la colección es ella misma.
        const rootSlug = parents[0]?.slug || (cat.parent ? null : cat.slug);
        if (rootSlug) setCollection(collectionByRootSlug(rootSlug));
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  return { category, collection, products, loading, error };
}
