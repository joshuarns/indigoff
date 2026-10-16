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
import './HomeV3.css';

const BRAND_ROUTES = {
  Air: '/indigoff-air',
  Skin: '/indigoff-skin',
  Glow: '/indigoff-glow',
  On: '/indigoff-on',
  Fckoff: '/indigoff-fckoff',
  Gallery: '/indigoff-gallery',
};

const FINISHES = [
  { title: 'Colors', tag: 'Possibilities', image: colorsImg, to: '/colors' },
  { title: 'Print', tag: 'Possibilities', image: printImg, to: '/printed' },
  { title: 'Texture', tag: 'Possibilities', image: textureImg, to: '/texture' },
];

const logoModules = import.meta.glob(
  '../../assets/img/clients/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);
const CLIENT_NAMES = ['google', 'amazon', 'netflix', 'spotify', 'uber-freight', 'adidas'];
const CLIENT_LOGOS = CLIENT_NAMES.map((name) => {
  const path = Object.keys(logoModules).find(
    (key) => key.split('/').pop().replace(/\.[^.]+$/, '') === name
  );
  return path ? { name, src: logoModules[path] } : null;
}).filter(Boolean);

function ArrowLink({ to, children, dark = false }) {
  return (
    <Link to={to} className={`hv3-link ${dark ? 'hv3-link--dark' : ''}`}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function HeroV3() {
  return (
    <section className="hv3-hero">
      <div className="hv3-hero__copy">
        <span className="hv3-kicker">Indigoff</span>
        <h1>{heroContent.title}</h1>
        <div className="hv3-hero__actions">
          {heroContent.buttons?.map((button) => (
            <ArrowLink key={button.label} to={button.to} dark>{button.label}</ArrowLink>
          ))}
        </div>
      </div>
      <div className="hv3-hero__image">
        <img src={heroImages[0]} alt="Indigoff" />
      </div>
      <div className="hv3-hero__note" aria-hidden="true">01 / 03</div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="hv3-intro">
      <span className="hv3-kicker">Indigoff Air</span>
      <div className="hv3-intro__body">
        <h2>Silence, shaped with intention</h2>
        <p>
          Indigoff creates bespoke acoustic elements where technical performance
          is resolved with material sensitivity, proportion, and enduring
          architectural presence.
        </p>
        <ArrowLink to="/indigoff-air">Discover Indigoff Air</ArrowLink>
      </div>
      <figure className="hv3-intro__image">
        <img src={featureImg} alt="Wood Textures" loading="lazy" />
      </figure>
    </section>
  );
}

function CollectionsV3() {
  return (
    <section className="hv3-collections">
      <header className="hv3-section-head">
        <span className="hv3-kicker">Collections</span>
        <div>
          <h2>Designed for spaces where every detail carries weight.</h2>
          <p>
            Each Indigoff piece brings acoustic precision, considered materiality,
            and a quiet sense of permanence to the interior.
          </p>
        </div>
      </header>
      <div className="hv3-collections__list">
        {quotes.map((quote, index) => {
          const route = BRAND_ROUTES[quote.brandLabel];
          const content = (
            <>
              <span className="hv3-collection__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="hv3-collection__name">{quote.brandLabel}</span>
              <span className="hv3-collection__image">
                <img src={quote.image} alt={quote.brandLabel} loading="lazy" />
              </span>
              <span className="hv3-collection__arrow" aria-hidden="true">↗</span>
            </>
          );
          return route ? (
            <Link key={quote.id} to={route} className="hv3-collection">{content}</Link>
          ) : (
            <article key={quote.id} className="hv3-collection">{content}</article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectsV3() {
  const { projects, loading, error } = useProjects({ perPage: 4 });

  return (
    <section className="hv3-projects">
      <header className="hv3-section-head hv3-section-head--light">
        <span className="hv3-kicker">Portfolio</span>
        <div>
          <h2>Where quiet becomes part of the architecture</h2>
          <p>
            Our work brings acoustic clarity to distinguished interiors,
            composing sound, light, texture, and proportion as one considered
            experience.
          </p>
        </div>
      </header>
      {loading ? (
        <Loader text="Loading projects…" />
      ) : error ? (
        <p className="hv3-error">No se pudieron cargar los proyectos: {error}</p>
      ) : (
        <div className="hv3-projects__grid">
          {projects.map((project, index) => {
            const image = getFeaturedImage(project);
            const title = project.title?.rendered || '';
            return (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className={`hv3-project ${index === 0 ? 'hv3-project--lead' : ''}`}
              >
                <div className="hv3-project__image">
                  {image && <img src={image} alt={title} loading="lazy" />}
                </div>
                <span className="hv3-project__meta">{String(index + 1).padStart(2, '0')}</span>
                <span className="hv3-project__title" dangerouslySetInnerHTML={{ __html: title }} />
              </Link>
            );
          })}
        </div>
      )}
      <div className="hv3-projects__foot">
        <ArrowLink to="/projects" dark>View selected projects</ArrowLink>
      </div>
    </section>
  );
}

function FinishesV3() {
  return (
    <section className="hv3-finishes">
      <header className="hv3-finishes__head">
        <span className="hv3-kicker">Possibilities</span>
        <h2>Material expressions</h2>
      </header>
      <div className="hv3-finishes__list">
        {FINISHES.map((finish, index) => (
          <Link key={finish.title} to={finish.to} className="hv3-finish">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <img src={finish.image} alt={finish.title} loading="lazy" />
            <div>
              <h3>{finish.title}</h3>
              <p>{finish.tag}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ClientsV3() {
  return (
    <section className="hv3-clients">
      <h2>We’ve been working with some great people</h2>
      <div className="hv3-clients__rail">
        {CLIENT_LOGOS.map((logo) => (
          <img key={logo.name} src={logo.src} alt={logo.name} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

function HomeV3() {
  return (
    <div className="hv3">
      <HeroV3 />
      <Introduction />
      <CollectionsV3 />
      <ProjectsV3 />
      <FinishesV3 />
      <ClientsV3 />
    </div>
  );
}

export default HomeV3;
