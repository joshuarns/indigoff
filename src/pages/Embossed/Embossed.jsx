import { useState } from 'react';
import { Link } from 'react-router-dom';
import OtherPossibilities from '../../components/OtherPossibilities/OtherPossibilities';
import banner from '../../assets/img/embossed-hero-banner.jpg';
import './Embossed.css';

// Modelos de embossed: cada uno tiene "model-N" (foto en escena → preview) y
// "model-0N" (detalle del relieve → swatch).
const mods = import.meta.glob('../../assets/img/embossed/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});
const byName = {};
for (const [path, src] of Object.entries(mods)) {
  byName[path.split('/').pop().replace(/\.[^.]+$/, '')] = src;
}

const MODELS = [1, 2, 3]
  .map((n) => ({
    name: `Model ${n}`,
    preview: byName[`model-${n}`] || byName[`model-0${n}`],
    swatch: byName[`model-0${n}`] || byName[`model-${n}`],
  }))
  .filter((m) => m.preview);

function Embossed() {
  const [active, setActive] = useState(0);
  const current = MODELS[active] || MODELS[0];

  return (
    <div className="emb">
      {/* --- Intro --- */}
      <section className="emb-intro">
        <div className="emb-intro__inner">
          <Link to="/possibilities" className="emb-intro__back">
            ← Possibilities
          </Link>
          <span className="emb-intro__eyebrow">Embossed</span>
          <h1 className="emb-intro__title">
            Sculpted depth that you feel in the room
          </h1>
          <p className="emb-intro__desc">
            Dimensionality through raised forms and soft relief, creating a
            richer play of texture and presence. It’s an approach for spaces
            that need tactility and visual warmth without clutter. The panel
            becomes almost sculptural, shaping the atmosphere through depth,
            touch, and a quieter soundscape.
          </p>
        </div>
      </section>

      {/* --- Banner --- */}
      <section className="emb-banner">
        <div className="emb-banner__inner">
          <div className="emb-banner__media">
            <img src={banner} alt="Embossed acoustic panel" />
          </div>
        </div>
      </section>

      {/* --- Selector: preview + modelos --- */}
      <section className="emb-picker">
        <div className="emb-picker__inner">
          <div className="emb-picker__preview">
            <img src={current.preview} alt={current.name} />
            <span className="emb-picker__label">{current.name}</span>
          </div>

          <div className="emb-picker__grid">
            {MODELS.map((m, i) => (
              <button
                type="button"
                key={m.name}
                className={`emb-swatch ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="emb-swatch__chip">
                  <img src={m.swatch} alt={m.name} loading="lazy" />
                </span>
                <span className="emb-swatch__name">{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Otras possibilities --- */}
      <OtherPossibilities exclude="Embossed" />
    </div>
  );
}

export default Embossed;
