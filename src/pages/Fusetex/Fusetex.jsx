import { Link } from 'react-router-dom';
import SectionHero from '../../components/SectionHero/SectionHero';
import portada from '../../assets/img/fusetex-portada.jpg';
import commercialImg from '../../assets/img/fusetex-comercial.jpg';
import corporateImg from '../../assets/img/fusetex-corporate.jpg';
import residentialImg from '../../assets/img/fusetext-residential.jpg';
import './Fusetex.css';

// Contenido de indigoff.com/fusetex/ (textos conservados).
const FEATURES = [
  {
    n: '01',
    title: 'Acoustic performance',
    text: 'NRC 0.80, Class B absorption tested to ASTM C423 / ISO 354.',
  },
  {
    n: '02',
    title: 'Velvet finish',
    text: 'A soft-touch PES velvet with a supple, tactile character.',
  },
  {
    n: '03',
    title: 'Recycled PET core',
    text: 'A considered core with ≥ 60% recycled content and a fully recyclable backing.',
  },
  {
    n: '04',
    title: 'Fire & air safety',
    text: 'EN 13501-1 B-s1,d0 · ASTM E84 Class A · Greenguard Gold.',
  },
];

const COMPOSITION = [
  {
    title: 'Velvet surface',
    text: 'Soft-touch velvet fabric with a refined hand and a considered range of colorways.',
  },
  {
    title: 'PET acoustic backing',
    text: 'High-density polyester (PET) fiber panel. 100% recyclable and engineered for superior sound absorption.',
  },
];

const SPECS = [
  ['Product', 'Fusetex'],
  ['Type', 'Acoustic Wallcovering'],
  ['Backing Material', '100% Recycled PET (Polyester)'],
  ['Surface Material', 'Velvet (PES)'],
  ['Thickness', '3 mm (±10%)'],
  ['Panel Size', '600 × 600 mm / 600 × 1200 mm (23.6" × 23.6" / 23.6" × 47.2")'],
  ['Weight', '± 2.8 kg/m²'],
  ['Fire Rating', 'EN 13501-1: B-s1,d0 · ASTM E84 Class A'],
  ['VOC Emissions', 'Low VOC · Greenguard Gold'],
  ['Recycled Content', '≥ 60% (PET backing)'],
  ['Recyclability', '100% Recyclable'],
  ['Installation', 'Adhesive (recommended) or mechanical fixing'],
  ['Maintenance', 'Vacuum or soft brush; spot clean with mild detergent'],
  ['Indoor Use', 'Yes'],
];

const APPLICATIONS = [
  { title: 'Commercial', image: commercialImg, to: '/fusetex/commercial-indigoff-fusetex' },
  { title: 'Corporate', image: corporateImg, to: '/fusetex/corporate' },
  { title: 'Residential', image: residentialImg, to: '/fusetex/residential-indigoff-fusetex' },
];

function Fusetex() {
  return (
    <div className="fusetex">
      {/* --- Hero banner full-bleed (primero la imagen, luego el contenido) --- */}
      <SectionHero
        image={portada}
        imageAlt="Fusetex — Acoustic Wallcovering"
        eyebrow="Indigoff Fusetex"
        title="A velvet acoustic wallcovering"
      />

      {/* --- The fabric --- */}
      <section className="fx-fabric fx-inner">
        <div className="fx-fabric__lead">
          <span className="fx-label">The fabric</span>
          <h2 className="fx-section-title">
            A refined acoustic skin, made for calm.
          </h2>
        </div>
        <p className="fx-fabric__text">
          Fusetex pairs a high-performance recycled PET acoustic backing with
          a velvet surface of exceptional tactility. The result is a wallcovering
          that brings sound absorption, material warmth, and enduring elegance
          into one seamless architectural finish.
        </p>

        <ul className="fx-features">
          {FEATURES.map((f) => (
            <li key={f.n} className="fx-feature">
              <span className="fx-feature__n">{f.n}</span>
              <h3 className="fx-feature__title">{f.title}</h3>
              <p className="fx-feature__text">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Composition --- */}
      <section className="fx-composition fx-inner">
        <div className="fx-composition__head">
          <span className="fx-label">Composition</span>
          <h2 className="fx-section-title">
            Composed on the surface, precise beneath it.
          </h2>
        </div>
        <div className="fx-composition__grid">
          {COMPOSITION.map((c) => (
            <div key={c.title} className="fx-layer">
              <h3 className="fx-layer__title">{c.title}</h3>
              <p className="fx-layer__text">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Acoustic performance + Certifications --- */}
      <section className="fx-perf fx-inner">
        <div className="fx-perf__grid">
          <div className="fx-stat">
            <span className="fx-label">Acoustic Performance</span>
            <span className="fx-stat__value">0.80</span>
            <span className="fx-stat__unit">NRC · Noise Reduction Coefficient</span>
            <span className="fx-stat__note">
              Tested in accordance with ASTM C423 / ISO 354
            </span>
          </div>
          <div className="fx-cert">
            <span className="fx-label">Standards &amp; Certifications</span>
            <h3 className="fx-cert__title">EN ISO 11654 — Class B</h3>
            <p className="fx-cert__text">
              Exceptional sound absorption for interiors that demand composure.
            </p>
          </div>
        </div>
      </section>

      {/* --- Technical data --- */}
      <section className="fx-specs fx-inner">
        <div className="fx-specs__head">
          <span className="fx-label">Technical Data</span>
          <h2 className="fx-section-title">Specifications</h2>
        </div>
        <dl className="fx-specs__table">
          {SPECS.map(([key, value]) => (
            <div key={key} className="fx-specs__row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --- Applications --- */}
      <section className="fx-apps fx-inner">
        <h2 className="fx-section-title fx-apps__title">Applications</h2>
        <div className="fx-apps__grid">
          {APPLICATIONS.map((a) => (
            <Link key={a.title} to={a.to} className="fx-app">
              <div className="fx-app__media">
                <img src={a.image} alt={a.title} />
              </div>
              <h3 className="fx-app__title">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="fx-cta fx-inner">
        <Link to="/contact" className="fx-cta__btn">
          Request a material sample
        </Link>
      </section>
    </div>
  );
}

export default Fusetex;
