// Cliente para consumir la API REST de WordPress.
// Todas las funciones devuelven promesas y lanzan un Error si la
// petición falla, para que quien las use pueda manejar el estado.

import {
  WP_API_URL,
  ENDPOINTS,
  DEFAULT_QUERY,
  MENU_ENDPOINT,
  MENU_LOCATION,
} from '../config/api';

/**
 * Realiza una petición GET a la API de WordPress.
 * @param {string} endpoint - Ruta relativa (ej: '/posts').
 * @param {Object} params - Parámetros de query (ej: { per_page: 5 }).
 * @returns {Promise<any>}
 */
async function request(endpoint, params = {}) {
  const url = new URL(`${WP_API_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `Error ${response.status} al pedir ${endpoint}: ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Obtiene un listado de posts.
 * @param {Object} options
 * @param {number} [options.page=1]
 * @param {number} [options.perPage=DEFAULT_QUERY.perPage]
 * @param {string} [options.search]
 * @param {number} [options.category]
 */
export function getPosts({
  page = 1,
  perPage = DEFAULT_QUERY.perPage,
  search,
  category,
} = {}) {
  return request(ENDPOINTS.posts, {
    page,
    per_page: perPage,
    search,
    categories: category,
    _embed: DEFAULT_QUERY.embed ? 1 : undefined,
  });
}

/**
 * Obtiene un post por su slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getPostBySlug(slug) {
  const posts = await request(ENDPOINTS.posts, {
    slug,
    _embed: DEFAULT_QUERY.embed ? 1 : undefined,
  });
  return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
}

/**
 * Obtiene las categorías.
 */
export function getCategories() {
  return request(ENDPOINTS.categories, { per_page: 100 });
}

/**
 * Obtiene los proyectos (CPT "proyects") con su imagen destacada.
 * @param {Object} options
 * @param {number} [options.perPage=12]
 */
export function getProjects({ perPage = 12 } = {}) {
  return request(ENDPOINTS.projects, {
    per_page: perPage,
    _embed: DEFAULT_QUERY.embed ? 1 : undefined,
  });
}

/**
 * Obtiene un proyecto (CPT "proyects") por su slug, con imagen destacada.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getProjectBySlug(slug) {
  const res = await request(ENDPOINTS.projects, {
    slug,
    _embed: DEFAULT_QUERY.embed ? 1 : undefined,
  });
  return Array.isArray(res) && res.length > 0 ? res[0] : null;
}

/**
 * Obtiene las imágenes adjuntas a un proyecto (galería) desde la biblioteca
 * de medios de WordPress (media con parent = id del proyecto).
 * @param {number} projectId
 * @returns {Promise<Array>}
 */
export function getProjectMedia(projectId) {
  return request(ENDPOINTS.media, {
    parent: projectId,
    per_page: 50,
    // La colección de adjuntos no admite orderby=menu_order (devuelve 400);
    // se ordena por fecha ascendente.
    orderby: 'date',
    order: 'asc',
  });
}

/**
 * Obtiene una categoría de producto (taxonomía "product_cat") por su slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getProductCategoryBySlug(slug) {
  const res = await request(ENDPOINTS.productCategories, { slug });
  return Array.isArray(res) && res.length > 0 ? res[0] : null;
}

/**
 * Obtiene categorías de producto (taxonomía "product_cat") por sus IDs.
 * @param {number[]} ids
 * @returns {Promise<Array>}
 */
export function getProductCategoriesByIds(ids = []) {
  if (!ids.length) return Promise.resolve([]);
  return request(ENDPOINTS.productCategories, {
    include: ids.join(','),
    per_page: 100,
    _fields: 'id,name,slug,parent',
  });
}

/**
 * Obtiene un producto (CPT WooCommerce "product") por su slug, con su imagen
 * destacada y datos embebidos.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getProductBySlug(slug) {
  const res = await request(ENDPOINTS.products, {
    slug,
    _embed: DEFAULT_QUERY.embed ? 1 : undefined,
  });
  return Array.isArray(res) && res.length > 0 ? res[0] : null;
}

/**
 * Obtiene los productos (CPT WooCommerce "product") de una categoría, con su
 * imagen destacada.
 * @param {number} categoryId - ID del término product_cat.
 * @param {Object} options
 * @param {number} [options.perPage=24]
 * @returns {Promise<Array>}
 */
export function getProductsByCategory(categoryId, { perPage = 24 } = {}) {
  return request(ENDPOINTS.products, {
    product_cat: categoryId,
    per_page: perPage,
    _embed: DEFAULT_QUERY.embed ? 1 : undefined,
  });
}

/**
 * Obtiene el menú de navegación desde WordPress (mu-plugin indigoff/v1).
 * Devuelve los items ya anidados (con children para los desplegables).
 * @param {string} [location=MENU_LOCATION] - Ubicación del menú en WP.
 * @returns {Promise<Array>}
 */
export async function getMenu(location = MENU_LOCATION) {
  const url = new URL(MENU_ENDPOINT);
  url.searchParams.append('location', location);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error ${response.status} al cargar el menú`);
  }
  return response.json();
}

/**
 * Extrae la URL de la imagen destacada desde un post con _embed.
 * @param {Object} post
 * @returns {string|null}
 */
export function getFeaturedImage(post) {
  return (
    post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
  );
}
