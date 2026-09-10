// Hook para cargar el menú de navegación desde WordPress.
// Mientras carga (o si falla el endpoint) devuelve un menú de respaldo
// para que el navbar nunca quede vacío.

import { useState, useEffect } from 'react';
import { getMenu } from '../services/wordpressApi';

// Menú de respaldo: refleja el diseño hasta que el endpoint de WP responda.
const FALLBACK_MENU = [
  { id: 1, title: 'Collections', path: '/collections', children: [] },
  { id: 2, title: 'Categories', path: '/categories', children: [] },
  { id: 3, title: 'Possibilities', path: '/possibilities', children: [] },
  { id: 4, title: 'Portfolio', path: '/portfolio', children: [] },
  { id: 5, title: 'Downloads', path: '/downloads', children: [] },
  { id: 6, title: 'Contact Us', path: '/contact', children: [] },
  { id: 7, title: 'My list', path: '/my-list', children: [] },
];

export function useMenu(location) {
  const [items, setItems] = useState(FALLBACK_MENU);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getMenu(location)
      .then((data) => {
        // Usa el menú de WP solo si trae items; si no, mantiene el fallback.
        if (active && Array.isArray(data) && data.length > 0) {
          setItems(data);
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
  }, [location]);

  return { items, loading, error };
}
