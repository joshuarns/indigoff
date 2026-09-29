import { Link } from 'react-router-dom';
import OtherPossibilities from '../../components/OtherPossibilities/OtherPossibilities';
import banner from '../../assets/img/printed-hero-banner.jpg';
import p2 from '../../assets/img/printed-02.jpg';
import p3 from '../../assets/img/printed-03.jpg';
import p4 from '../../assets/img/printed-04.jpg';
import p5 from '../../assets/img/printed-05.jpg';
import p6 from '../../assets/img/printed-06.jpg';
import './Print.css';

const GALLERY = [p2, p3, p4, p5, p6];

function Print() {
  return (
    <div className="print">
      {/* --- Intro (misma línea que las demás secciones) --- */}
      <section className="print-intro">
        <div className="print-intro__inner">
          <Link to="/possibilities" className="print-intro__back">
            ← Possibilities
          </Link>
          <span className="print-intro__eyebrow">Print</span>
          <h1 className="print-intro__title">
            Personalization with a visual signature
          </h1>
          <p className="print-intro__desc">
            Printed acoustic panels merge sound control with graphic presence.
            Soften the room while carrying imagery, patterns, or branded
            compositions that make the wall feel intentional, never utilitarian.
            Ideal for lobbies, corridors, meeting areas, and hospitality spaces,
            they let acoustics become part of the visual narrative: calm,
            curated, and unmistakably designed.
          </p>
        </div>
      </section>

      {/* --- Banner --- */}
      <section className="print-banner">
        <div className="print-banner__inner">
          <div className="print-banner__media">
            <img src={banner} alt="Printed acoustic panel — botanical wall" />
          </div>
        </div>
      </section>

      {/* --- Galería de ejemplos --- */}
      <section className="print-gallery">
        <div className="print-gallery__inner">
          {GALLERY.map((src, i) => (
            <div className="print-gallery__item" key={i}>
              <img src={src} alt={`Printed acoustic panel example ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* --- Otras possibilities --- */}
      <OtherPossibilities exclude="Print" />
    </div>
  );
}

export default Print;
