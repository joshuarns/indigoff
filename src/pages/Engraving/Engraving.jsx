import { Link } from 'react-router-dom';
import OtherPossibilities from '../../components/OtherPossibilities/OtherPossibilities';
import SectionHero from '../../components/SectionHero/SectionHero';
import SectionIntro from '../../components/SectionIntro/SectionIntro';
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
      <SectionHero
        image={banner}
        imageAlt="Engraved acoustic panel"
        eyebrow="Engraving"
        title="Precision carved into the surface"
      />

      <SectionIntro backTo="/possibilities" backLabel="Possibilities" label="Engraving">
        <p>
          Engraving gives the acoustic panel a disciplined graphic language.
          Fine lines, carved patterns, and measured relief catch the light and
          create a sense of depth that changes through the day. The result is
          a tactile architectural surface, expressive in the most restrained
          way.
        </p>
      </SectionIntro>

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
