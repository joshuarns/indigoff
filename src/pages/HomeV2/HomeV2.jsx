import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { heroContent, heroImages } from '../../data/heroSlides';
import { quotes } from '../../data/quotes';
import { useProjects } from '../../hooks/useProjects';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import featureImg from '../../assets/img/4728403.png';
import colorsImg from '../../assets/img/Colors.jpg';
import printImg from '../../assets/img/Print.png';
import textureImg from '../../assets/img/Textures.jpg';
import './HomeV2.css';

const AUTOPLAY_MS = 6000;

// --- Logos de clientes (misma curaduría que la sección Clients original) ---
const logoModules = import.meta.glob(
  '../../assets/img/clients/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);
const CURATED = [
  'google', 'amazon', 'netflix', 'spotify', 'uber-freight',
  'adidas', 'visa', 'pinterest', 'tiktok', 'paramount',
];
const CLIENT_LOGOS = CURATED.map((name) => {
  const key = Object.keys(logoModules).find(
    (k) => k.split('/').pop().replace(/\.[^.]+$/, '') === name
  );
  return key ? { name, src: logoModules[key] } : null;
}).filter(Boolean);
const logoLabel = (name) =>
  name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// Rutas de colección por etiqueta de marca (para hacer las placas navegables
// sin añadir texto nuevo). Las labels vienen de data/quotes.
const BRAND_ROUTES = {
  Air: '/indigoff-air',
  Skin: '/indigoff-skin',
  Glow: '/indigoff-glow',
  On: '/indigoff-on',
  Fckoff: '/indigoff-fckoff',
  Gallery: '/indigoff-gallery',
};

// Acabados destacados (mismos textos/recursos que FeaturedFinishes).
const FINISHES = [
  { title: 'Colors', tag: 'Possibilities', image: colorsImg, to: '/colors' },
  { title: 'Print', tag: 'Possibilities', image: printImg, to: '/printed' },
  { title: 'Texture', tag: 'Possibilities', image: textureImg, to: '/texture' },
];

function ArrowLink({ to, href, children, className = '' }) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="hv2-arrow" aria-hidden="true">→</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={`hv2-link ${className}`}>{inner}</Link>
    );
  }
  return (
    <a href={href} className={`hv2-link ${className}`} target="_blank" rel="noreferrer">
      {inner}
    </a>
  );
}

// ======================================================================
//  HERO — full-bleed cinematográfico, contenido editorial abajo-izquierda
// ======================================================================
function HeroV2() {
  const [active, setActive] = useState(0);
  const next = useCallback(
    () => setActive((p) => (p + 1) % heroImages.length),
    []
  );

  useEffect(() => {
    if (heroImages.length <= 1) return undefined;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, next]);

  return (
    <section className="hv2-hero" aria-roledescription="carousel">
      <div className="hv2-hero__slides" aria-hidden="true">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`hv2-hero__slide ${i === active ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className="hv2-hero__scrim" />

      <div className="hv2-hero__inner">
        <div className="hv2-hero__content">
          <span className="hv2-eyebrow hv2-eyebrow--light">Indigoff</span>
          <h1 className="hv2-hero__title">{heroContent.title}</h1>
          <div className="hv2-hero__actions">
            {heroContent.buttons?.map((b) => (
              <ArrowLink key={b.label} to={b.to} className="hv2-link--light">
                {b.label}
              </ArrowLink>
            ))}
          </div>
        </div>

        <div className="hv2-hero__index">
          {heroImages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hv2-hero__tick ${i === active ? 'is-active' : ''}`}
              aria-label={`Ver imagen ${i + 1}`}
              onClick={() => setActive(i)}
            >
              <span className="hv2-hero__tick-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="hv2-hero__tick-bar" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======================================================================
//  MANIFIESTO — declaración editorial a dos columnas (texto de Feature)
// ======================================================================
function Manifesto() {
  return (
    <section className="hv2-manifesto">
      <div className="hv2-container hv2-manifesto__grid">
        <div className="hv2-manifesto__text">
          <span className="hv2-eyebrow">Indigoff Air</span>
          <h2 className="hv2-display">Silence, shaped with intention</h2>
          <p className="hv2-lead">
            Indigoff creates bespoke acoustic elements where technical
            performance is resolved with material sensitivity, proportion, and
            enduring architectural presence.
          </p>
          <ArrowLink to="/indigoff-air">Discover Indigoff Air</ArrowLink>
        </div>
        <figure className="hv2-manifesto__media">
          <img src={featureImg} alt="Wood Textures" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

// ======================================================================
//  COLECCIONES — placas editoriales (textos/imágenes de QuotesSlider)
// ======================================================================
function Collections() {
  return (
    <section className="hv2-collections">
      <div className="hv2-container">
        <header className="hv2-collections__head">
          <h2 className="hv2-display hv2-display--md">
            Designed for spaces where every detail carries weight.
          </h2>
          <p className="hv2-body">
            Each Indigoff piece brings acoustic precision, considered
            materiality, and a quiet sense of permanence to the interior.
          </p>
        </header>
      </div>

      <div className="hv2-plates">
        {quotes.map((q) => {
          const route = BRAND_ROUTES[q.brandLabel];
          const plate = (
            <>
              <div
                className="hv2-plate__media"
                style={{ backgroundImage: `url(${q.image})` }}
              />
              <div className="hv2-plate__foot">
                <span className="hv2-plate__brand">{q.brandLabel}</span>
                <span className="hv2-arrow" aria-hidden="true">→</span>
              </div>
            </>
          );
          return route ? (
            <Link key={q.id} to={route} className="hv2-plate">{plate}</Link>
          ) : (
            <article key={q.id} className="hv2-plate">{plate}</article>
          );
        })}
      </div>
    </section>
  );
}

// ======================================================================
//  PROYECTOS — rejilla editorial (texto de Projects)
// ======================================================================
function ProjectsV2() {
  const { projects, loading, error } = useProjects({ perPage: 4 });

  return (
    <section className="hv2-projects">
      <div className="hv2-container">
        <header className="hv2-projects__head">
          <div>
            <span className="hv2-eyebrow">Portfolio</span>
            <h2 className="hv2-display hv2-display--md">
              Where quiet becomes part of the architecture
            </h2>
          </div>
          <p className="hv2-body">
            Our work brings acoustic clarity to distinguished interiors,
            composing sound, light, texture, and proportion as one considered
            experience.
          </p>
        </header>

        {loading ? (
          <Loader text="Loading projects…" />
        ) : error ? (
          <p className="hv2-error">No se pudieron cargar los proyectos: {error}</p>
        ) : (
          projects.length > 0 && (
            <>
              {/* Proyecto destacado (ancho completo). */}
              {(() => {
                const lead = projects[0];
                const img = getFeaturedImage(lead);
                const name = lead.title?.rendered || '';
                return (
                  <Link
                    to={`/projects/${lead.slug}`}
                    className="hv2-proj hv2-proj--lead"
                  >
                    <div className="hv2-proj__media">
                      {img && <img src={img} alt={name} loading="lazy" />}
                    </div>
                    <span
                      className="hv2-proj__title"
                      dangerouslySetInnerHTML={{ __html: name }}
                    />
                  </Link>
                );
              })()}

              {/* Tres proyectos complementarios bajo el destacado. */}
              <div className="hv2-projects__grid">
                {projects.slice(1, 4).map((project) => {
                  const img = getFeaturedImage(project);
                  const name = project.title?.rendered || '';
                  return (
                    <Link
                      key={project.id}
                      to={`/projects/${project.slug}`}
                      className="hv2-proj"
                    >
                      <div className="hv2-proj__media">
                        {img && <img src={img} alt={name} loading="lazy" />}
                      </div>
                      <span
                        className="hv2-proj__title"
                        dangerouslySetInnerHTML={{ __html: name }}
                      />
                    </Link>
                  );
                })}
              </div>
            </>
          )
        )}

        <div className="hv2-projects__foot">
          <ArrowLink to="/projects">View selected projects</ArrowLink>
        </div>
      </div>
    </section>
  );
}

// ======================================================================
//  ACABADOS — Material expressions (texto de FeaturedFinishes)
// ======================================================================
function Finishes() {
  return (
    <section className="hv2-finishes">
      <div className="hv2-container">
        <h2 className="hv2-display hv2-display--md hv2-finishes__title">
          Material expressions
        </h2>
        <div className="hv2-finishes__grid">
          {FINISHES.map((f) => (
            <Link key={f.title} to={f.to} className="hv2-finish">
              <div className="hv2-finish__media">
                <img src={f.image} alt={f.title} loading="lazy" />
              </div>
              <div className="hv2-finish__foot">
                <h3 className="hv2-finish__name">{f.title}</h3>
                <span className="hv2-finish__tag">{f.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======================================================================
//  CLIENTES — muro de logos (texto de Clients)
// ======================================================================
function ClientsV2() {
  return (
    <section className="hv2-clients">
      <div className="hv2-container">
        <h2 className="hv2-display hv2-display--sm hv2-clients__title">
          We’ve been working with some great people
        </h2>
        <ul className="hv2-clients__grid">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className="hv2-clients__logo">
              <img src={logo.src} alt={logoLabel(logo.name)} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HomeV2() {
  return (
    <div className="hv2">
      <HeroV2 />
      <Manifesto />
      <Collections />
      <ProjectsV2 />
      <Finishes />
      <ClientsV2 />
    </div>
  );
}

export default HomeV2;
