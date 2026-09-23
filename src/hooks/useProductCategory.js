// Hook para una categoría de producto: resuelve el slug a término product_cat
// y obtiene los productos de esa categoría desde WooCommerce.

import { useState, useEffect } from 'react';
import {
  getProductCategoryBySlug,
  getProductsByCategory,
} from '../services/wordpressApi';

export function useProductCategory(slug) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setCategory(null);
    setProducts([]);

    getProductCategoryBySlug(slug)
      .then(async (cat) => {
        if (!active) return;
        if (!cat) {
          setCategory(null);
          return;
        }
        setCategory(cat);
        const list = await getProductsByCategory(cat.id, { perPage: 24 });
        if (active && Array.isArray(list)) setProducts(list);
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

  return { category, products, loading, error };
}
