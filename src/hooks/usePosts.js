// Hook para obtener un listado de posts de WordPress.
// Maneja los estados de carga, error y datos.

import { useState, useEffect } from 'react';
import { getPosts } from '../services/wordpressApi';

export function usePosts(options = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se serializan las opciones para usarlas como dependencia estable.
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getPosts(options)
      .then((data) => {
        if (active) setPosts(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey]);

  return { posts, loading, error };
}
