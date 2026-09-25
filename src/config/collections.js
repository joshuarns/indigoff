// Mapa de colecciones: relaciona la categoría RAÍZ de producto en WordPress
// (product_cat de nivel 0, por su slug) con su ruta y etiqueta en el frontend.
// Se usa para armar migas de pan, eyebrows y enlaces "volver" de forma genérica
// en las páginas de categoría y de producto.
export const COLLECTIONS = {
  air: { route: '/indigoff-air', label: 'Indigoff Air' },
  skin: { route: '/indigoff-skin', label: 'Indigoff Skin' },
  glow: { route: '/indigoff-glow', label: 'Indigoff Glow' },
  on: { route: '/indigoff-on', label: 'Indigoff On' },
  gallery: { route: '/indigoff-gallery', label: 'Indigoff Gallery' },
  'indigoff-fusetex': { route: '/fusetex', label: 'Indigoff Fusetex' },
  'indigoff-woolskin': { route: '/indigoff-woolskin', label: 'Indigoff Woolskin' },
};

// Devuelve la colección del frontend a partir del slug de la categoría raíz.
export function collectionByRootSlug(slug) {
  return COLLECTIONS[slug] || null;
}
