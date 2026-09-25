// Mapa de colecciones: relaciona la categoría RAÍZ de producto en WordPress
// (product_cat de nivel 0, por su slug) con su ruta y etiqueta en el frontend.
// Se usa para armar migas de pan, eyebrows y enlaces "volver" de forma genérica
// en las páginas de categoría y de producto.
//
// `colors` (opcional): restringe la paleta de colores del producto a un
// subconjunto (por nombre, según los archivos de assets/img/colors). Si se
// omite, se muestran todos los colores disponibles. On usa una paleta reducida.
export const COLLECTIONS = {
  air: { route: '/indigoff-air', label: 'Indigoff Air' },
  skin: { route: '/indigoff-skin', label: 'Indigoff Skin' },
  glow: { route: '/indigoff-glow', label: 'Indigoff Glow' },
  on: {
    route: '/indigoff-on',
    label: 'Indigoff On',
    colors: ['Moka', 'Ivory', 'White', 'Oxford', 'Soft Gray'],
  },
  gallery: { route: '/indigoff-gallery', label: 'Indigoff Gallery' },
  'indigoff-fusetex': { route: '/fusetex', label: 'Indigoff Fusetex' },
  'indigoff-woolskin': { route: '/indigoff-woolskin', label: 'Indigoff Woolskin' },
  // Fckoff no tiene subcategorías: es una categoría raíz con productos directos.
  fckoff: { route: '/indigoff-fckoff', label: 'Indigoff Fckoff' },
};

// Devuelve la colección del frontend a partir del slug de la categoría raíz.
export function collectionByRootSlug(slug) {
  return COLLECTIONS[slug] || null;
}
