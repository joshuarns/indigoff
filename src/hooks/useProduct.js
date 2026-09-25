// Hook para un producto individual: obtiene el producto por slug y, además,
// una lista de productos relacionados de su misma categoría principal.

import { useState, useEffect } from 'react';
import {
  getProductBySlug,
  getProductsByCategory,
  getProductCategoriesByIds,
} from '../services/wordpressApi';
import { collectionByRootSlug } from '../config/collections';

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setProduct(null);
    setCategory(null);
    setCollection(null);
    setRelated([]);

    getProductBySlug(slug)
      .then(async (prod) => {
        if (!active) return;
        if (!prod) {
          setProduct(null);
          return;
        }
        setProduct(prod);

        const ids = Array.isArray(prod.product_cat) ? prod.product_cat : [];
        if (!ids.length) return;

        try {
          const terms = await getProductCategoriesByIds(ids);
          // Raíz = la categoría de nivel 0 que corresponde a una colección
          // conocida (un producto puede estar en varias raíces).
          const root = terms.find((t) => t.parent === 0 && collectionByRootSlug(t.slug));
          // Subcategoría = la hija de esa raíz; si no, la primera con padre.
          const primary = root
            ? terms.find((t) => t.parent === root.id)
            : terms.find((t) => t.parent) || terms[0];
          if (!active) return;
          if (root) setCollection(collectionByRootSlug(root.slug));
          if (primary) setCategory(primary);

          // Relacionados: de la subcategoría si existe; si no (categorías raíz
          // como Fckoff), de la propia raíz. Excluye el producto actual.
          const relCatId = primary?.id || root?.id;
          if (relCatId) {
            const list = await getProductsByCategory(relCatId, { perPage: 8 });
            if (active && Array.isArray(list)) {
              setRelated(list.filter((p) => p.id !== prod.id).slice(0, 4));
            }
          }
        } catch {
          /* categoría/relacionados son opcionales */
        }
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

  return { product, category, collection, related, loading, error };
}
