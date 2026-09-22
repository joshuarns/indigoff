import { Link } from 'react-router-dom';
import './Collection.css';

// Placeholder de imagen reutilizable (hasta cargar las imágenes reales).
function ImagePlaceholder({ ratio = '16 / 9', label = 'Imagen' }) {
  return (
    <div className="ph" style={{ aspectRatio: ratio }} aria-hidden="true">
      <span className="ph__label">{label}</span>
    </div>
  );
}

// Página de colección genérica (Air, Skins, Glow…). Sigue los tokens del sitio.
// props:
//  - brandLabel: palabra de la colección (ej. "Air", "Skins")
//  - title, description, cover (img o null), coverAlt
//  - categories: [{ title, text, to, image }]
//  - sectionTitle
function Collection({
  brandLabel,
  title,
  description,
  cover = null,
  coverAlt = '',
  categories = [],
  sectionTitle = 'Categories',
}) {
  return (
    <div className="collection">
      {/* --- Intro --- */}
      <section className="collection__intro">
        <div className="collection__intro-inner">
          <p className="collection__eyebrow">
            indig<span className="collection__eyebrow-o">o</span>ff {brandLabel}
          </p>
          <h1 className="collection__title">{title}</h1>
          <p className="collection__desc">{description}</p>
        </div>
      </section>

      {/* --- Imagen principal --- */}
      <section className="collection__hero-media">
        <div className="collection__hero-media-inner">
          <div className="collection__hero-img">
            {cover ? (
              <img src={cover} alt={coverAlt} />
            ) : (
              <ImagePlaceholder ratio="16 / 7" label="Imagen de portada" />
            )}
          </div>
        </div>
      </section>

      {/* --- Categorías --- */}
      <section className="collection__categories">
        <div className="collection__categories-inner">
          <h2 className="collection__section-title">{sectionTitle}</h2>
          <div className="collection__grid">
            {categories.map((cat) => (
              <Link key={cat.title} to={cat.to} className="cat-card">
                <div className="cat-card__media">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.title} />
                  ) : (
                    <ImagePlaceholder ratio="4 / 3" label={cat.title} />
                  )}
                </div>
                <h3 className="cat-card__title">{cat.title}</h3>
                <p className="cat-card__text">{cat.text}</p>
                <span className="cat-card__link">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;
