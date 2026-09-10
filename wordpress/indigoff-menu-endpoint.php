<?php
/**
 * Plugin Name: Indigoff — Menú público (REST)
 * Description: Expone los menús de WordPress de forma pública y anidada
 *              para consumirlos desde el frontend en React.
 * Version: 1.0.0
 *
 * INSTALACIÓN:
 *   Sube este archivo a  wp-content/mu-plugins/indigoff-menu-endpoint.php
 *   (si la carpeta mu-plugins no existe, créala). Se activa solo.
 *
 * USO:
 *   GET /wp-json/indigoff/v1/menu?location=primary
 *   GET /wp-json/indigoff/v1/menu?slug=menu-principal
 *
 * Devuelve un array de items anidados:
 *   [ { id, title, url, path, target, order, children:[...] }, ... ]
 */

if (!defined('ABSPATH')) {
    exit; // Sin acceso directo.
}

add_action('rest_api_init', function () {
    register_rest_route('indigoff/v1', '/menu', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true', // Lectura pública.
        'callback'            => 'indigoff_get_menu',
        'args'                => [
            'location' => ['type' => 'string', 'required' => false],
            'slug'     => ['type' => 'string', 'required' => false],
        ],
    ]);
});

/**
 * Resuelve el menú por ubicación (location) o por slug/nombre y lo devuelve anidado.
 */
function indigoff_get_menu($request)
{
    $location = $request->get_param('location');
    $slug     = $request->get_param('slug');
    $menu     = null;

    // 1) Por ubicación asignada en Apariencia → Menús.
    if ($location) {
        $locations = get_nav_menu_locations();
        if (!empty($locations[$location])) {
            $menu = wp_get_nav_menu_object($locations[$location]);
        }
    }

    // 2) Por slug o nombre del menú.
    if (!$menu && $slug) {
        $menu = wp_get_nav_menu_object($slug);
    }

    // 3) Fallback: primer menú disponible.
    if (!$menu) {
        $all = wp_get_nav_menus();
        if (!empty($all)) {
            $menu = $all[0];
        }
    }

    if (!$menu) {
        return new WP_REST_Response([], 200);
    }

    $items = wp_get_nav_menu_items($menu->term_id);
    if (!$items) {
        return new WP_REST_Response([], 200);
    }

    // Normaliza cada item a un formato simple para el frontend.
    $home = home_url();
    $flat = [];
    foreach ($items as $item) {
        // path = URL relativa (útil para React Router en enlaces internos).
        $path = str_replace($home, '', $item->url);

        $flat[$item->ID] = [
            'id'       => (int) $item->ID,
            'parent'   => (int) $item->menu_item_parent,
            'title'    => $item->title,
            'url'      => $item->url,
            'path'     => $path === '' ? '/' : $path,
            'target'   => $item->target,
            'order'    => (int) $item->menu_order,
            'children' => [],
        ];
    }

    // Construye el árbol (soporta submenús para los desplegables).
    $tree = [];
    foreach ($flat as $id => &$node) {
        if ($node['parent'] && isset($flat[$node['parent']])) {
            $flat[$node['parent']]['children'][] = &$node;
        } else {
            $tree[] = &$node;
        }
    }
    unset($node);

    return new WP_REST_Response(array_values($tree), 200);
}
