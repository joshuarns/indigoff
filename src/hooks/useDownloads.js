// Hook para la página de descargas: trae TODOS los productos, se queda con los
// que tienen archivos de descarga (campos ACF) y los agrupa por colección.

import { useState, useEffect } from 'react';
import {
  getAllProductsLite,
  getAllProductCategories,
} from '../services/wordpressApi';

// Campos ACF de descarga → etiqueta de la pill. El orden define el de las pills.
const DOWNLOAD_FIELDS = [
  { key: 'select_pdf', ext: 'PDF' },
  { key: 'dwg', ext: 'DWG' },
  { key: '3dm', ext: '3DM' },
  { key: 'skp', ext: 'SKP' },
  { key: 'rvt', ext: 'RVT' },
];

// Orden de las colecciones (por slug de la categoría raíz).
const COLLECTION_ORDER = [
  'air',
  'skin',
  'glow',
  'on',
  'gallery',
  'fckoff',
  'indigoff-fusetex',
  'indigoff-woolskin',
];

// Limpia el prefijo "indigoff " del nombre de la colección para el título.
function cleanName(name = '') {
  return name.replace(/^indigoff\s+/i, '').trim();
}

export function useDownloads() {
  const [groups, setGroups] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([getAllProductsLite(), getAllProductCategories()])
      .then(([products, cats]) => {
        if (!active) return;

        // Mapa id → categoría (para resolver la colección raíz de cada producto).
        const byId = new Map(cats.map((c) => [c.id, c]));
        const rootOf = (id) => {
          let term = byId.get(id);
          let guard = 0;
          while (term && term.parent && guard < 10) {
            term = byId.get(term.parent);
            guard += 1;
          }
          return term || null;
        };

        // Agrupa productos con descargas por colección raíz.
        const map = new Map(); // rootId → { slug, title, order, rows: [] }

        for (const p of products) {
          const acf = p.acf || {};
          const files = DOWNLOAD_FIELDS.map((f) => {
            const url = acf[f.key];
            return typeof url === 'string' && url.trim()
              ? { ext: f.ext, url: url.trim() }
              : null;
          }).filter(Boolean);
          if (files.length === 0) continue;

          // Colección raíz del producto (primera categoría que resuelve a raíz).
          let root = null;
          for (const cid of p.product_cat || []) {
            root = rootOf(cid);
            if (root) break;
          }
          const rootId = root?.id ?? 0;
          const rootSlug = root?.slug ?? 'other';
          const rootName = root ? cleanName(root.name) : 'Other';

          if (!map.has(rootId)) {
            const order = COLLECTION_ORDER.indexOf(rootSlug);
            map.set(rootId, {
              slug: rootSlug,
              title: rootName,
              order: order === -1 ? 99 : order,
              rows: [],
            });
          }
          map.get(rootId).rows.push({
            id: p.id,
            name: p.title?.rendered || '',
            slug: p.slug,
            files,
          });
        }

        const result = [...map.values()]
          .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
          .map((g) => ({
            ...g,
            rows: g.rows.sort((a, b) => a.name.localeCompare(b.name)),
          }));

        setGroups(result);
        setTotal(result.reduce((n, g) => n + g.rows.length, 0));
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
  }, []);

  return { groups, total, loading, error };
}
