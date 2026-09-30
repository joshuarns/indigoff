// Hook para una categoría de producto: resuelve el slug a término product_cat,
// obtiene sus productos (paginados, para scroll infinito) y su colección raíz.

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getProductCategoryBySlug,
  getProductsByCategoryPage,
  getProductCategoriesByIds,
} from '../services/wordpressApi';
import { collectionByRootSlug, resolveCategorySlug } from '../config/collections';

const PER_PAGE = 24;

export function useProductCategory(slug) {
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // carga inicial
  const [loadingMore, setLoadingMore] = useState(false); // páginas siguientes
  const [error, setError] = useState(null);

  // Estado de paginación en refs (no provocan re-render por sí mismos).
  const catIdRef = useRef(null);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setCategory(null);
    setCollection(null);
    setProducts([]);
    setHasMore(false);
    catIdRef.current = null;
    pageRef.current = 1;
    totalPagesRef.current = 1;

    // El slug del menú puede no coincidir con el real (typos): se traduce.
    getProductCategoryBySlug(resolveCategorySlug(slug))
      .then(async (cat) => {
        if (!active) return;
        if (!cat) {
          setCategory(null);
          setLoading(false);
          return;
        }
        setCategory(cat);
        catIdRef.current = cat.id;

        const [firstPage, parents] = await Promise.all([
          getProductsByCategoryPage(cat.id, { page: 1, perPage: PER_PAGE }),
          cat.parent ? getProductCategoriesByIds([cat.parent]) : Promise.resolve([]),
        ]);
        if (!active) return;

        setProducts(firstPage.items);
        totalPagesRef.current = firstPage.totalPages;
        setHasMore(firstPage.totalPages > 1);

        const rootSlug = parents[0]?.slug || (cat.parent ? null : cat.slug);
        if (rootSlug) setCollection(collectionByRootSlug(rootSlug));
        setLoading(false);
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  // Carga la siguiente página y la agrega al listado (scroll infinito).
  const loadMore = useCallback(() => {
    if (loadingMore) return;
    if (!catIdRef.current) return;
    if (pageRef.current >= totalPagesRef.current) return;

    const next = pageRef.current + 1;
    setLoadingMore(true);
    getProductsByCategoryPage(catIdRef.current, { page: next, perPage: PER_PAGE })
      .then((res) => {
        pageRef.current = next;
        setProducts((prev) => {
          // Evita duplicados si una petición llega dos veces.
          const seen = new Set(prev.map((p) => p.id));
          return [...prev, ...res.items.filter((p) => !seen.has(p.id))];
        });
        setHasMore(next < totalPagesRef.current);
      })
      .catch(() => {
        /* si falla una página, dejamos de intentar */
        setHasMore(false);
      })
      .finally(() => setLoadingMore(false));
  }, [loadingMore]);

  return { category, collection, products, loading, loadingMore, hasMore, loadMore, error };
}
