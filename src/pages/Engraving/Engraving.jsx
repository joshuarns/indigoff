import { Link } from 'react-router-dom';
import OtherPossibilities from '../../components/OtherPossibilities/OtherPossibilities';
import banner from '../../assets/img/engraving-hero-banner.jpg';
import './Engraving.css';

// Ejemplos de engraving (assets/img/engvn-*).
const gmods = import.meta.glob('../../assets/img/engvn-*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});
const GALLERY = Object.entries(gmods)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

function Engraving() {
  return (
    <div className="eng">
      {/* --- Intro --- */}
      <section className="eng-intro">
        <div className="eng-intro__inner">
          <Link to="/possibilities" className="eng-intro__back">
            ← Possibilities
          </Link>
          <span className="eng-intro__eyebrow">Engraving</span>
          <h1 className="eng-intro__title">
            Lines, shadows, and acoustic rhythm
          </h1>
          <p className="eng-intro__desc">
            Engraving introduces precision into the surface: grooves, patterns,
            linear and organic compositions that catch light and create
            controlled shadow. It transforms the panel into a tactile
            architectural element quietly expressive, minimal, and refined. The
            result is a wall that feels designed in relief, enhancing both
            spatial character and acoustic calm.
          </p>
        </div>
      </section>

      {/* --- Banner --- */}
      <section className="eng-banner">
        <div className="eng-banner__inner">
          <div className="eng-banner__media">
            <img src={banner} alt="Engraved acoustic panel" />
          </div>
        </div>
      </section>

      {/* --- Galería (masonry) --- */}
      <section className="eng-gallery">
        <div className="eng-gallery__inner">
          {GALLERY.map((src, i) => (
            <figure className="eng-gallery__item" key={i}>
              <img src={src} alt={`Engraved acoustic panel example ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* --- Otras possibilities --- */}
      <OtherPossibilities exclude="Engraving" />
    </div>
  );
}

export default Engraving;
