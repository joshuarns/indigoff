import { Link } from 'react-router-dom';
import SectionHero from '../SectionHero/SectionHero';
import SectionIntro from '../SectionIntro/SectionIntro';
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
  sectionTitle = 'Explore the collection',
}) {
  return (
    <div className="collection">
      {/* --- Hero banner full-bleed (primero la imagen, luego el contenido) --- */}
      <SectionHero
        image={cover || undefined}
        imageAlt={coverAlt}
        eyebrow={`Indigoff ${brandLabel}`}
        title={title}
      />

      {/* --- Intro (descripción) --- */}
      <SectionIntro label={`Indigoff ${brandLabel}`}>
        <p>{description}</p>
      </SectionIntro>

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
                <span className="cat-card__link">Discover →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;
