import banner from '../../assets/img/possibilities-banner.jpg';
import colorsImg from '../../assets/img/Colors.jpg';
import printImg from '../../assets/img/Print.png';
import textureImg from '../../assets/img/Textures.jpg';
import engravingImg from '../../assets/img/Engraving-.png';
import embossedImg from '../../assets/img/embossed.jpeg';
import './Possibilities.css';

// Acabados de indigoff.com/possibilities/ (mismo contenido).
const FINISHES = [
  { title: 'Colors', image: colorsImg },
  { title: 'Print', image: printImg },
  { title: 'Texture', image: textureImg },
  { title: 'Engraving', image: engravingImg },
  { title: 'Embossed', image: embossedImg },
];

function Possibilities() {
  return (
    <div className="poss">
      {/* --- Intro --- */}
      <section className="poss__intro">
        <div className="poss__intro-inner">
          <p className="poss__eyebrow">Possibilities</p>
          <h1 className="poss__title">
            Acoustic finishes designed as a material language
          </h1>
          <p className="poss__desc">
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
        </div>
      </section>

      {/* --- Banner --- */}
      <section className="poss__hero">
        <div className="poss__hero-inner">
          <div className="poss__hero-img">
            <img src={banner} alt="Indigoff — acoustic finishes and treatments" />
          </div>
        </div>
      </section>

      {/* --- Acabados --- */}
      <section className="poss__finishes">
        <div className="poss__finishes-inner">
          <h2 className="poss__section-title">Finishes</h2>
          <div className="poss__grid">
            {FINISHES.map((f) => (
              <article className="finish-card" key={f.title}>
                <div className="finish-card__media">
                  <img src={f.image} alt={f.title} loading="lazy" />
                </div>
                <h3 className="finish-card__title">{f.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Possibilities;
