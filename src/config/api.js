// Configuración central de la conexión con WordPress.
// La URL base se define en el archivo .env (ver .env.example).

export const WP_API_URL =
  import.meta.env.VITE_WP_API_URL || 'https://cms.indigoff.com/wp-json/wp/v2';

// Raíz de la API (/wp-json), derivada de la URL base quitando "/wp/v2".
// Se usa para namespaces propios como el del menú (indigoff/v1).
export const WP_ROOT_URL = WP_API_URL.replace(/\/wp\/v2\/?$/, '');

// Endpoint del menú (mu-plugin indigoff-menu-endpoint.php).
// Ubicación por defecto del menú principal en WordPress.
export const MENU_ENDPOINT = `${WP_ROOT_URL}/indigoff/v1/menu`;
export const MENU_LOCATION = import.meta.env.VITE_WP_MENU_LOCATION || 'primary';

// Endpoints disponibles de la API REST de WordPress.
export const ENDPOINTS = {
  posts: '/posts',
  pages: '/pages',
  categories: '/categories',
  media: '/media',
  // CPT de proyectos en WordPress (rest_base "proyects").
  projects: '/proyects',
  // WooCommerce: productos y su taxonomía de categorías.
  products: '/product',
  productCategories: '/product_cat',
};

// Parámetros por defecto para las peticiones de listados.
export const DEFAULT_QUERY = {
  perPage: 10,
  // _embed incluye datos relacionados (imagen destacada, autor, categorías)
  // en la misma respuesta, evitando peticiones adicionales.
  embed: true,
};
