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
      .then((proj) => {
        if (!active) return;
        setProject(proj || null);
        // El loader se apaga en cuanto llega el proyecto; la galería (media
        // adjunta) se resuelve en segundo plano como respaldo de las ACF.
        setLoading(false);
        if (proj) {
          getProjectMedia(proj.id)
            .then((media) => {
              if (active && Array.isArray(media)) setGallery(media);
            })
            .catch(() => {
              /* la galería es opcional */
            });
        }
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

  return { project, gallery, loading, error };
}
