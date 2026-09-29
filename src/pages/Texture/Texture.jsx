import { useState } from 'react';
import { Link } from 'react-router-dom';
import OtherPossibilities from '../../components/OtherPossibilities/OtherPossibilities';
import banner from '../../assets/img/texture-hero-banner.jpg';
import './Texture.css';

// Texturas desde assets/img/texture/{wood,stone}. Cada textura tiene dos
// imágenes: sin sufijo (foto grande → preview) y con "-01" (swatch → grid).
const mods = import.meta.glob('../../assets/img/texture/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const pool = Object.entries(mods).map(([path, src]) => {
  const parts = path.split('/');
  const folder = parts[parts.length - 2]; // 'wood' | 'stone'
  const file = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  const hasSuffix = /-\d+$/.test(file);
  const key = norm(file.replace(/-\d+$/, ''));
  return { key, hasSuffix, src, folder };
});

// Empareja swatch (-01) y preview (sin sufijo) por nombre (con alias por typos).
function pick(folder, keys) {
  const inFolder = pool.filter((p) => p.folder === folder);
  const swatch = inFolder.find((p) => p.hasSuffix && keys.includes(p.key))?.src;
  const preview = inFolder.find((p) => !p.hasSuffix && keys.includes(p.key))?.src;
  return { swatch: swatch || preview, preview: preview || swatch };
}

// Nombres oficiales (según cms.indigoff.com/texture). Los alias resuelven los
// nombres de archivo con erratas (Alchemi, Arctic, Stata).
const WOOD = [
  'Sand Oak', 'Sandwood Ash', 'Pale Oak', 'Maple Oak', 'Amber Oak', 'Terra Walnut',
  'Crimson Walnut', 'Terra Walnut Blue', 'Verdant Walnut', 'Frost Ash', 'Smoke Ash', 'Charcoal Ash',
];
const STONE = [
  ['Alba'], ['Auric'], ['Opaline'], ['Strata', 'stata'], ['Graphite'], ['Artic', 'arctic'],
  ['Frost'], ['Nocturne'], ['Obsidian'], ['Limestone'], ['Basalt'], ['Alchemy', 'alchemi'],
  ['Verdant'], ['Tide'],
];

const woodColors = WOOD.map((name) => {
  const v = pick('wood', [norm(name)]);
  return v.swatch ? { name, family: 'Wood', ...v } : null;
}).filter(Boolean);

const stoneColors = STONE.map(([name, ...aliases]) => {
  const v = pick('stone', [norm(name), ...aliases]);
  return v.swatch ? { name, family: 'Stone', ...v } : null;
}).filter(Boolean);

const COLORS = [...woodColors, ...stoneColors];
const FAMILIES = ['Wood', 'Stone'];

function Texture() {
  const [active, setActive] = useState(0);
  const current = COLORS[active] || COLORS[0];

  return (
    <div className="tex">
      {/* --- Intro --- */}
      <section className="tex-intro">
        <div className="tex-intro__inner">
          <Link to="/possibilities" className="tex-intro__back">
            ← Possibilities
          </Link>
          <span className="tex-intro__eyebrow">Texture</span>
          <h1 className="tex-intro__title">
            The look of material and the quiet of design
          </h1>
          <p className="tex-intro__desc">
            Printed textures recreate the sensation of materiality: stone,
            textile, grain, or abstract surfaces without adding visual weight.
            They bring depth and atmosphere to large wall fields while
            maintaining a clean architectural language. A subtle way to add
            richness, warmth, and cohesion, while the panel continues to reduce
            echo and elevate comfort.
          </p>
        </div>
      </section>

      {/* --- Banner --- */}
      <section className="tex-banner">
        <div className="tex-banner__inner">
          <div className="tex-banner__media">
            <img src={banner} alt="Wood-textured acoustic panel wall" />
          </div>
        </div>
      </section>

      {/* --- Selector: preview + familias de swatches --- */}
      <section className="tex-picker">
        <div className="tex-picker__inner">
          <div className="tex-picker__preview">
            <img src={current.preview} alt={current.name} />
            <span className="tex-picker__label">{current.name}</span>
          </div>

          <div className="tex-picker__families">
            {FAMILIES.map((fam) => (
              <div className="tex-family" key={fam}>
                <h2 className="tex-family__title">{fam}</h2>
                <div className="tex-swatches">
                  {COLORS.map((c, i) =>
                    c.family === fam ? (
                      <button
                        type="button"
                        key={c.name}
                        className={`tex-swatch ${i === active ? 'is-active' : ''}`}
                        onClick={() => setActive(i)}
                        aria-pressed={i === active}
                      >
                        <span className="tex-swatch__chip">
                          <img src={c.swatch} alt={c.name} loading="lazy" />
                        </span>
                        <span className="tex-swatch__name">{c.name}</span>
                      </button>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Otras possibilities --- */}
      <OtherPossibilities exclude="Texture" />
    </div>
  );
}

export default Texture;
