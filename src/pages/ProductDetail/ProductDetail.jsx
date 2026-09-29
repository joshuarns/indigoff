import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import './ProductDetail.css';

// --- Colores estándar: se cargan desde assets/img/colors. El nombre del
// archivo es el nombre del color (p. ej. "Forest Green.jpg" → "Forest Green").
const colorModules = import.meta.glob(
  '../../assets/img/colors/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' }
);

// Normaliza un nombre de color para comparar sin importar mayúsculas/espacios.
const normColor = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// Cada color tiene dos imágenes: con sufijo "-1" (textura plana) y sin sufijo
// (foto del panel). En el producto usamos la TEXTURA; el panel es solo fallback.
const bySuffix = {};
for (const [path, src] of Object.entries(colorModules)) {
  const file = path.split('/').pop().replace(/\.[^.]+$/, '');
  const hasSuffix = /-\d+$/.test(file);
  const key = normColor(file.replace(/-\d+$/, ''));
  bySuffix[key] = bySuffix[key] || {};
  if (hasSuffix) bySuffix[key].texture = src;
  else bySuffix[key].panel = src;
}

// Colores estándar (orden y nombres oficiales de la página Colors).
const COLOR_NAMES = [
  'Red', 'Cherry', 'Orange', 'Citrus', 'Green', 'Forest Green',
  'Moka', 'Ivory', 'White', 'Peach', 'Violet', 'Navy Blue',
  'Blue', 'Teal', 'Deep Blue', 'Black', 'Oxford', 'Soft Gray',
];

const COLORS = COLOR_NAMES
  .map((name) => {
    const e = bySuffix[normColor(name)] || {};
    return { name, src: e.texture || e.panel };
  })
  .filter((c) => c.src);

// Devuelve la paleta de colores para una colección: su subconjunto si define
// `colors`, o todos los colores disponibles.
function paletteFor(collection) {
  if (!collection?.colors) return COLORS;
  const allowed = collection.colors.map(normColor);
  return COLORS.filter((c) => allowed.includes(normColor(c.name)));
}

// Campos ACF de descarga del producto (cada uno es una URL o `false`).
// Presentes en todos los productos; se muestran solo los que tienen archivo.
const DOWNLOAD_FIELDS = [
  { key: 'select_pdf', label: 'Specification Sheet', ext: 'PDF' },
  { key: 'dwg', label: 'CAD Drawing', ext: 'DWG' },
  { key: '3dm', label: 'Rhino 3D Model', ext: '3DM' },
  { key: 'skp', label: 'SketchUp Model', ext: 'SKP' },
  { key: 'rvt', label: 'Revit Family', ext: 'RVT' },
];

// Convierte el excerpt (HTML con <b>Etiqueta:</b> valor) en pares etiqueta/valor.
function parseSpecs(html) {
  if (!html) return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return [...doc.querySelectorAll('p')]
    .map((p) => {
      const bold = p.querySelector('b, strong');
      const label = bold ? bold.textContent.replace(/:\s*$/, '').trim() : '';
      const value = bold
        ? p.textContent.replace(bold.textContent, '').trim()
        : p.textContent.trim();
      return { label, value };
    })
    .filter((s) => s.label || s.value);
}

function ProductDetail() {
  const { slug } = useParams();
  const { product, category, collection, related, loading, error } = useProduct(slug);
  const [activeColor, setActiveColor] = useState(0);

  if (loading) return <Loader text="Cargando producto…" />;

  if (error || !product) {
    return (
      <div className="prod prod__inner">
        <p className="prod__error">
          {error ? `No se pudo cargar el producto: ${error}` : 'No se encontró el producto.'}
        </p>
        <Link to="/indigoff-air" className="prod__back">
          ← Indigoff Air
        </Link>
      </div>
    );
  }

  const name = product.title?.rendered || '';
  const catName = category?.name || '';
  const collLabel = collection?.label || 'Indigoff';
  const collRoute = collection?.route || '/';
  // "Volver" apunta a la subcategoría si existe; si no, a la colección.
  const backTo = category?.slug ? `${collRoute}/${category.slug}` : collRoute;
  const backLabel = catName || collLabel;
  const hero = product.acf?.hero_banner || getFeaturedImage(product);
  const thumb = getFeaturedImage(product);
  // Descargas disponibles (campos ACF con URL).
  const downloads = DOWNLOAD_FIELDS.map((f) => {
    const url = product.acf?.[f.key];
    return typeof url === 'string' && url ? { ...f, url } : null;
  }).filter(Boolean);
  const specs = parseSpecs(product.excerpt?.rendered);
  const colors = paletteFor(collection);
  const active = colors[activeColor] ? activeColor : 0;

  return (
    <article className="prod">
      <div className="prod__inner">
        <Link to={backTo} className="prod__back">
          ← {backLabel}
        </Link>
      </div>

      {/* --- Banner principal --- */}
      {hero && (
        <div className="prod__inner">
          <div className="prod__hero">
            <img src={hero} alt={name} />
          </div>
        </div>
      )}

      {/* --- Cabecera + specs --- */}
      <div className="prod__inner prod__body">
        <div className="prod__head">
          <span className="prod__eyebrow">
            {collLabel}
            {catName ? ` · ${catName}` : ''}
          </span>
          <h1 className="prod__title" dangerouslySetInnerHTML={{ __html: name }} />
        </div>

        <div className="prod__cols">
          {/* Imagen del producto */}
          {thumb && (
            <div className="prod__figure">
              <img src={thumb} alt={name} />
            </div>
          )}

          {/* Especificaciones + acciones */}
          <div className="prod__info">
            {specs.length > 0 && (
              <dl className="prod__specs">
                {specs.map((s, i) => (
                  <div className="prod__spec" key={i}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Descargas (PDF, CAD, 3D) */}
            {downloads.length > 0 && (
              <div className="prod__downloads">
                <h2 className="prod__downloads-title">Downloads</h2>
                <ul className="prod__downloads-list">
                  {downloads.map((d) => (
                    <li key={d.key}>
                      <a
                        className="dl-item"
                        href={d.url}
                        target="_blank"
                        rel="noreferrer"
                        download
                      >
                        <span className="dl-item__label">{d.label}</span>
                        <span className="dl-item__meta">
                          <span className="dl-item__ext">{d.ext}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                              d="M8 2.5v8m0 0L4.5 7M8 10.5 11.5 7M2.5 13.5h11"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prod__actions">
              <button type="button" className="prod__cta">
                Add to my list
              </button>
            </div>
          </div>
        </div>

        {/* --- Colores --- */}
        {colors.length > 0 && (
          <section className="prod__colors">
            <div className="prod__colors-head">
              <h2 className="prod__section-title">Colors</h2>
              <span className="prod__color-active">{colors[active]?.name}</span>
            </div>
            <ul className="prod__swatches">
              {colors.map((c, i) => (
                <li key={c.name}>
                  <button
                    type="button"
                    className={`swatch ${i === active ? 'is-active' : ''}`}
                    onClick={() => setActiveColor(i)}
                    title={c.name}
                    aria-pressed={i === active}
                  >
                    <span className="swatch__chip">
                      <img src={c.src} alt={c.name} loading="lazy" />
                    </span>
                    <span className="swatch__name">{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* --- Relacionados --- */}
      {related.length > 0 && (
        <div className="prod__inner prod__related">
          <h2 className="prod__section-title">Related products</h2>
          <div className="prod__related-grid">
            {related.map((p) => {
              const img = getFeaturedImage(p);
              const pname = p.title?.rendered || '';
              return (
                <Link key={p.id} className="rel-card" to={`/producto/${p.slug}`}>
                  <div className="rel-card__media">
                    {img && <img src={img} alt={pname} loading="lazy" />}
                  </div>
                  <h3
                    className="rel-card__title"
                    dangerouslySetInnerHTML={{ __html: pname }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}

export default ProductDetail;
