// Hook para obtener un único post por su slug.

import { useState, useEffect } from 'react';
import { getPostBySlug } from '../services/wordpressApi';

export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getPostBySlug(slug)
      .then((data) => {
        if (active) setPost(data);
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

  return { post, loading, error };
}
