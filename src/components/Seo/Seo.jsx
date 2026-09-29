import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getYoast } from '../../services/wordpressApi';

// El CMS headless vive en cms.indigoff.com pero el sitio público es
// www.indigoff.com. Reescribimos las URLs de página (canonical/OG/schema) al
// dominio público, pero conservamos las de media (/wp-content) en el CMS,
// que es donde están alojados los archivos.
const CMS = 'cms.indigoff.com';
const PUBLIC = 'www.indigoff.com';

function rewriteDomain(str) {
  if (typeof str !== 'string') return str;
  return str
    .split(`${CMS}/wp-content`)
    .join('§MEDIA§/wp-content')
    .split(CMS)
    .join(PUBLIC)
    .split('§MEDIA§')
    .join(CMS);
}

// Decodifica entidades HTML (&amp; → &) que trae Yoast en los títulos.
function decodeEntities(str) {
  if (!str) return '';
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
}

// SEO por defecto (home y fallback cuando una ruta no tiene entidad en WP).
const DEFAULT_SEO = {
  title: 'Indigoff | Custom Acoustic Panels, Baffles & Sound Solutions',
  description:
    'Indigoff designs custom acoustic panels, baffles, ceilings, lighting and sound solutions that merge refined design with acoustic performance.',
  og_site_name: 'Indigoff | Custom Acoustic Panels, Baffles & Sound Solutions',
  og_type: 'website',
  og_locale: 'en_US',
  og_url: `https://${PUBLIC}/`,
  twitter_card: 'summary_large_image',
  robots: { index: 'index', follow: 'follow' },
};

// Construye la lista de tags de <head> a partir del objeto yoast_head_json.
function buildTags(y) {
  const tags = [];
  const meta = (attrs) => tags.push({ tag: 'meta', attrs });

  const description = y.description || y.og_description;
  if (description) meta({ name: 'description', content: decodeEntities(description) });

  if (y.robots) {
    const content = Object.values(y.robots).filter(Boolean).join(', ');
    if (content) meta({ name: 'robots', content });
  }

  if (y.canonical) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: rewriteDomain(y.canonical) } });
  }

  // Open Graph
  const og = {
    'og:locale': y.og_locale,
    'og:type': y.og_type,
    'og:title': decodeEntities(y.og_title || y.title),
    'og:description': decodeEntities(y.og_description || description),
    'og:url': rewriteDomain(y.og_url),
    'og:site_name': decodeEntities(y.og_site_name),
  };
  Object.entries(og).forEach(([property, content]) => {
    if (content) meta({ property, content });
  });

  const img = Array.isArray(y.og_image) ? y.og_image[0] : null;
  if (img?.url) {
    meta({ property: 'og:image', content: img.url }); // media: se queda en el CMS
    if (img.width) meta({ property: 'og:image:width', content: String(img.width) });
    if (img.height) meta({ property: 'og:image:height', content: String(img.height) });
  }

  // Twitter
  if (y.twitter_card) meta({ name: 'twitter:card', content: y.twitter_card });
  if (y.twitter_misc && typeof y.twitter_misc === 'object') {
    Object.entries(y.twitter_misc).forEach(([label, data], i) => {
      meta({ name: `twitter:label${i + 1}`, content: label });
      meta({ name: `twitter:data${i + 1}`, content: decodeEntities(String(data)) });
    });
  }

  // Schema JSON-LD (reescribiendo el dominio de página, no el de media)
  if (y.schema) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: rewriteDomain(JSON.stringify(y.schema)),
    });
  }

  return tags;
}

// Elimina cualquier tag en conflicto (incluido el estático del index.html)
// para que quede una sola versión de cada meta/canonical.
function removeConflicts(t) {
  let sel = null;
  if (t.tag === 'meta' && t.attrs.name) sel = `head meta[name="${t.attrs.name}"]`;
  else if (t.tag === 'meta' && t.attrs.property) sel = `head meta[property="${t.attrs.property}"]`;
  else if (t.tag === 'link' && t.attrs.rel) sel = `head link[rel="${t.attrs.rel}"]`;
  if (sel) document.querySelectorAll(sel).forEach((el) => el.remove());
}

// Aplica los tags al <head>, reemplazando los que gestionamos (data-seo).
function applyHead(y) {
  document.title = decodeEntities(rewriteDomain(y.title) || DEFAULT_SEO.title);
  document.querySelectorAll('head [data-seo]').forEach((el) => el.remove());
  const frag = document.createDocumentFragment();
  buildTags(y).forEach((t) => {
    removeConflicts(t);
    const el = document.createElement(t.tag);
    Object.entries(t.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (t.text) el.textContent = t.text;
    el.setAttribute('data-seo', '');
    frag.appendChild(el);
  });
  document.head.appendChild(frag);
}

// Determina de qué entidad de WordPress sacar el SEO según la ruta.
function resolveSource(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null; // home → default
  const [a, b] = parts;
  if (a === 'producto' && b) return { endpoint: '/product', slug: b };
  if (a === 'projects' && b) return { endpoint: '/proyects', slug: b };
  if (a === 'post' && b) return { endpoint: '/posts', slug: b };
  // Ruta de categoría de producto: /indigoff-air/baffles-air → término product_cat.
  if (b) return { endpoint: '/product_cat', slug: b };
  // Página simple (colección, possibilities, contact, etc.): slug = primer segmento.
  return { endpoint: '/pages', slug: a };
}

// Inyecta el SEO de Yoast según la ruta actual. Se monta una sola vez en Layout.
function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    let active = true;
    const source = resolveSource(pathname);

    if (!source) {
      applyHead(DEFAULT_SEO);
      return undefined;
    }

    getYoast(source.endpoint, source.slug)
      .then((yoast) => {
        if (active) applyHead(yoast || DEFAULT_SEO);
      })
      .catch(() => {
        if (active) applyHead(DEFAULT_SEO);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  return null;
}

export default RouteSeo;
