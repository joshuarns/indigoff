// Hook para un proyecto individual: obtiene el proyecto por slug y su galería
// (imágenes adjuntas en la biblioteca de medios de WordPress).

import { useState, useEffect } from 'react';
import { getProjectBySlug, getProjectMedia } from '../services/wordpressApi';

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setProject(null);
    setGallery([]);

    getProjectBySlug(slug)
      .then(async (proj) => {
        if (!active) return;
        if (!proj) {
          setProject(null);
          return;
        }
        setProject(proj);
        // Galería: imágenes adjuntas al proyecto.
        try {
          const media = await getProjectMedia(proj.id);
          if (active && Array.isArray(media)) setGallery(media);
        } catch {
          /* la galería es opcional; ignoramos su error */
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

  return { project, gallery, loading, error };
}
