// Hook para obtener los proyectos (CPT "proyects") desde WordPress.

import { useState, useEffect } from 'react';
import { getProjects } from '../services/wordpressApi';

export function useProjects(options = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getProjects(options)
      .then((data) => {
        if (active) setProjects(Array.isArray(data) ? data : []);
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

  return { projects, loading, error };
}
