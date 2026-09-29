import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Al cambiar de ruta lleva el scroll al inicio (comportamiento normal de una
// página). Si la URL trae un ancla (#id), se desplaza a ese elemento.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    // 'instant' evita un scroll animado molesto en cada navegación.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
