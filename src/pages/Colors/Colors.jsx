import { useState } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/img/videoHero.mp4';
import './Colors.css';

// Texturas de color desde assets/img/colors. Cada color tiene dos imágenes:
//  - sin sufijo (p. ej. Red.jpg): foto grande → preview.
//  - con sufijo "-1" (p. ej. Red-1.jpg): swatch pequeño → grid.
const colorModules = import.meta.glob('../../assets/img/colors/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const bySuffix = {};
for (const [path, src] of Object.entries(colorModules)) {
  const file = path.split('/').pop().replace(/\.[^.]+$/, '');
  const hasSuffix = /-\d+$/.test(file);
  const key = norm(file.replace(/-\d+$/, ''));
  bySuffix[key] = bySuffix[key] || {};
  if (hasSuffix) bySuffix[key].swatch = src;
  else bySuffix[key].preview = src;
}

// Orden y nombres oficiales (según cms.indigoff.com/colors).
const COLOR_NAMES = [
  'Red', 'Cherry', 'Orange', 'Citrus', 'Green', 'Forest Green',
  'Moka', 'Ivory', 'White', 'Peach', 'Violet', 'Navy Blue',
  'Blue', 'Teal', 'Deep Blue', 'Black', 'Oxford', 'Soft Gray',
];

const COLORS = COLOR_NAMES.map((name) => {
  const e = bySuffix[norm(name)] || {};
  const swatch = e.swatch || e.preview;
  const preview = e.preview || e.swatch;
  return swatch ? { name, swatch, preview } : null;
}).filter(Boolean);

function Colors() {
  const [active, setActive] = useState(0);
  const current = COLORS[active] || COLORS[0];

  return (
    <div className="colors">
      {/* --- Intro (misma línea que Possibilities/Collections) --- */}
      <section className="colors-intro">
        <div className="colors-intro__inner">
          <Link to="/possibilities" className="colors-intro__back">
            ← Possibilities
          </Link>
          <span className="colors-intro__eyebrow">Colors</span>
          <h1 className="colors-intro__title">Introducing our colorways</h1>
          <p className="colors-intro__desc">
            A curated palette designed to interact with light, material, and
            space. Each color option reinforces the visual qualities of the
            panel, allowing architects and designers to define atmosphere,
            accentuate form, or integrate seamlessly with surrounding finishes
            while maintaining acoustic performance and design coherence.
          </p>
        </div>
      </section>

      {/* --- Banner de video (redondeado, como las demás portadas) --- */}
      <section className="colors-banner">
        <div className="colors-banner__inner">
          <div className="colors-banner__media">
            <video src={heroVideo} autoPlay muted loop playsInline />
          </div>
        </div>
      </section>

      {/* --- Selector: preview grande + grid de swatches --- */}
      <section className="colors-picker">
        <div className="colors-picker__inner">
          <div className="colors-picker__preview">
            <img src={current.preview} alt={current.name} />
            <span className="colors-picker__label">{current.name}</span>
          </div>

          <div className="colors-picker__grid">
            {COLORS.map((c, i) => (
              <button
                type="button"
                key={c.name}
                className={`color-swatch ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="color-swatch__chip">
                  <img src={c.swatch} alt={c.name} loading="lazy" />
                </span>
                <span className="color-swatch__name">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Colors;
