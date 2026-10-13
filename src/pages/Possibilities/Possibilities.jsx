import { Link } from 'react-router-dom';
import SectionHero from '../../components/SectionHero/SectionHero';
import SectionIntro from '../../components/SectionIntro/SectionIntro';
import banner from '../../assets/img/possibilities-banner.jpg';
import colorsImg from '../../assets/img/Colors.jpg';
import printImg from '../../assets/img/Print.png';
import textureImg from '../../assets/img/Textures.jpg';
import engravingImg from '../../assets/img/Engraving-.png';
import embossedImg from '../../assets/img/embossed.jpeg';
import './Possibilities.css';

// Acabados de indigoff.com/possibilities/ (mismo contenido). `to` enlaza a la
// página del acabado cuando existe.
const FINISHES = [
  { title: 'Colors', image: colorsImg, to: '/colors' },
  { title: 'Print', image: printImg, to: '/printed' },
  { title: 'Texture', image: textureImg, to: '/texture' },
  { title: 'Engraving', image: engravingImg, to: '/routing' },
  { title: 'Embossed', image: embossedImg, to: '/embossed' },
];

function Possibilities() {
  return (
    <div className="poss">
      {/* --- Hero banner full-bleed (primero la imagen, luego el contenido) --- */}
      <SectionHero
        image={banner}
        imageAlt="Indigoff — acoustic finishes and treatments"
        eyebrow="Possibilities"
        title="Acoustic finishes designed as a material language"
      />

      {/* --- Intro (descripción) --- */}
      <SectionIntro label="Possibilities">
        <p>
          Indigoff treatments and finishes are meant to turn acoustic panels
          into a true part of the architecture. Beyond performance, they offer
          a wide range of surface possibilities: tones, textures, patterns, and
          crafted details, so sound control can align with the identity of each
          space. From subtle, minimal applications to bold, expressive
          compositions, these options let you shape how a room feels and how it
          looks at the same time. The result is a more complete design: quieter
          environments with visual coherence, tactile depth, and a calm,
          intentional presence.
        </p>
      </SectionIntro>

      {/* --- Acabados --- */}
      <section className="poss__finishes">
        <div className="poss__finishes-inner">
          <h2 className="poss__section-title">Finishes</h2>
          <div className="poss__grid">
            {FINISHES.map((f) =>
              f.to ? (
                <Link className="finish-card" key={f.title} to={f.to}>
                  <div className="finish-card__media">
                    <img src={f.image} alt={f.title} loading="lazy" />
                  </div>
                  <h3 className="finish-card__title">{f.title}</h3>
                </Link>
              ) : (
                <article className="finish-card" key={f.title}>
                  <div className="finish-card__media">
                    <img src={f.image} alt={f.title} loading="lazy" />
                  </div>
                  <h3 className="finish-card__title">{f.title}</h3>
                </article>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Possibilities;
