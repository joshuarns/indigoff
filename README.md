# Indigoff — React + WordPress (headless)

Frontend en React (Vite) que consume el contenido de un WordPress a través
de su **API REST** (`/wp-json/wp/v2`).

## Requisitos

- Node.js 18+ (probado con Node 24)
- Un WordPress con la API REST habilitada (viene activa por defecto)

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y pon la URL de tu WordPress:

   ```
   VITE_WP_API_URL=https://tudominio.com/wp-json/wp/v2
   ```

## Scripts

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo
npm run build   # build de producción (carpeta dist/)
npm run preview # previsualizar el build
```

## Estructura del proyecto

```
src/
├── assets/
│   ├── img/                 # imágenes del proyecto
│   └── styles/              # estilos globales
│       ├── variables.css    # design tokens (colores, espaciado…)
│       └── global.css       # reset + base
├── components/              # componentes reutilizables (cada uno con su .css)
│   ├── Header/
│   ├── Footer/
│   ├── Layout/              # header + contenido + footer
│   ├── Loader/
│   └── PostCard/
├── pages/                   # vistas asociadas a rutas
│   ├── Home/                # listado de posts
│   ├── PostDetail/          # post individual (/post/:slug)
│   └── NotFound/            # 404
├── hooks/                   # hooks de datos (usePosts, usePost)
├── services/
│   └── wordpressApi.js      # cliente de la API REST de WordPress
├── config/
│   └── api.js               # URL base y endpoints
├── App.jsx                  # rutas
└── main.jsx                 # punto de entrada
```

## Cómo se conecta con WordPress

- `src/config/api.js` define la URL base (desde `.env`) y los endpoints.
- `src/services/wordpressApi.js` hace las peticiones `fetch` y expone funciones
  como `getPosts()`, `getPostBySlug()` y `getCategories()`.
- Los hooks (`usePosts`, `usePost`) envuelven esas llamadas y manejan los
  estados de carga y error.
- Los componentes solo consumen los hooks; no saben nada de la API.

> Nota: los títulos y contenidos de WordPress llegan como HTML y se
> renderizan con `dangerouslySetInnerHTML`, que es lo habitual en headless
> WordPress. Si el origen del contenido no es de confianza, conviene
> sanitizarlo antes de mostrarlo.
