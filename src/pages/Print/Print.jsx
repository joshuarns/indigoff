import { Link } from 'react-router-dom';
import OtherPossibilities from '../../components/OtherPossibilities/OtherPossibilities';
import SectionHero from '../../components/SectionHero/SectionHero';
import SectionIntro from '../../components/SectionIntro/SectionIntro';
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
      {/* --- Hero banner full-bleed (primero la imagen, luego el contenido) --- */}
      <SectionHero
        image={banner}
        imageAlt="Printed acoustic panel — botanical wall"
        eyebrow="Print"
        title="An acoustic surface with a signature"
      />

      {/* --- Intro (descripción) --- */}
      <SectionIntro backTo="/possibilities" backLabel="Possibilities" label="Print">
        <p>
          Print brings image, pattern, and art direction to acoustic surfaces.
          A wall becomes a tailored composition—visually arresting, quietly
          functional, and resolved with the same care as the rest of the
          interior. Designed for spaces that ask more of every surface.
        </p>
      </SectionIntro>

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
