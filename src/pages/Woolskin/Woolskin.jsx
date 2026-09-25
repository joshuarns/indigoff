import { Link } from 'react-router-dom';
import portada from '../../assets/img/woolskin-portada.jpg';
import samplesImg from '../../assets/img/SamplesWoolskin.jpg';
import commercialImg from '../../assets/img/woolskin-commercial.jpg';
import corporateImg from '../../assets/img/woolskin-corporate.jpg';
import residentialImg from '../../assets/img/woolskin-residential.jpg';
import '../Fusetex/Fusetex.css'; // patrones de página de producto (fx-*)
import './Woolskin.css';

// Contenido de indigoff.com/indigoff-woolskin/ (textos conservados).
const FEATURES = [
  {
    n: '01',
    title: 'Organic Absorption',
    text: 'Natural fibers that breathe and regulate moisture.',
  },
  {
    n: '02',
    title: 'Soft Reverberation Control',
    text: 'Designed to calm reflections and create quieter, more comfortable interiors.',
  },
  {
    n: '03',
    title: 'Thermal Insulation',
    text: 'Energy efficiency combined with acoustic comfort.',
  },
  {
    n: '04',
    title: 'Visual Comfort',
    text: 'Reduces the harshness of hard surfaces while creating a calmer atmosphere.',
  },
];

const QUALITIES = [
  {
    title: 'Design Flexibility',
    text: 'Adaptable to commercial, residential, office, hospitality, and educational spaces.',
  },
  {
    title: 'Natural Character',
    text: 'A wool-based material with an organic look, soft touch, and premium presence.',
  },
];

const APPLICATIONS = [
  { title: 'Commercial', image: commercialImg, to: '/indigoff-woolskin/commercial' },
  // En WordPress esta subcategoría se llama "office".
  { title: 'Corporate', image: corporateImg, to: '/indigoff-woolskin/office' },
  { title: 'Residential', image: residentialImg, to: '/indigoff-woolskin/residential' },
];

function Woolskin() {
  return (
    <div className="fusetex woolskin">
      {/* --- Hero --- */}
      <section className="fx-hero">
        <div className="fx-inner">
          <p className="fx-eyebrow">
            indig<span className="fx-eyebrow-o">o</span>ff Woolskin
          </p>
          <h1 className="fx-hero__title">
            Acoustic Wool Panels With A Softer Architectural Skin
          </h1>
        </div>
        <div className="fx-inner">
          <div className="fx-hero__media">
            <img src={portada} alt="Woolskin — Acoustic Wool Panels" />
          </div>
        </div>
      </section>

      {/* --- The wool --- */}
      <section className="fx-fabric fx-inner">
        <div className="fx-fabric__lead">
          <span className="fx-label">The wool</span>
          <h2 className="fx-section-title">A softer architectural skin.</h2>
        </div>
        <p className="fx-fabric__text">
          Woolskin is Indigoff’s acoustic panel collection made from wool felt,
          designed to bring warmth, texture, and sound control into
          architectural spaces. Its soft textile surface absorbs unwanted noise
          while adding a refined visual layer to walls, ceilings, and custom
          interior applications.
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

      {/* --- A softer skin for sound (prosa + samples) --- */}
      <section className="ws-story fx-inner">
        <div className="ws-story__grid">
          <div className="ws-story__media">
            <img src={samplesImg} alt="Woolskin — muestras de fieltro de lana" />
          </div>
          <div className="ws-story__text">
            <span className="fx-label">A Softer Skin For Sound</span>
            <p>
              More than a decorative finish, Woolskin works as an acoustic skin
              for interiors. Its materiality helps reduce echo, soften
              reverberation, and improve the overall sound experience in
              commercial, residential, hospitality, educational, and office
              environments.
            </p>
            <p>
              Each panel is crafted to feel natural, matte, and tactile. The
              wool surface gives depth to color, enhances light and shadow, and
              creates a calm, premium atmosphere without the hard or synthetic
              appearance of conventional acoustic materials.
            </p>
            <p>
              Through routed patterns, layered compositions, modular geometries,
              and custom color combinations, Woolskin allows designers to shape
              both sound and space. It can be subtle and minimal, bold and
              sculptural, or fully integrated into the architectural language of
              a project.
            </p>
          </div>
        </div>

        <div className="ws-qualities">
          {QUALITIES.map((q) => (
            <div key={q.title} className="fx-layer">
              <h3 className="fx-layer__title">{q.title}</h3>
              <p className="fx-layer__text">{q.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Applications --- */}
      <section className="fx-apps fx-inner">
        <h2 className="fx-section-title fx-apps__title">Applications</h2>
        <div className="fx-apps__grid">
          {APPLICATIONS.map((a) => (
            <Link key={a.title} to={a.to} className="fx-app">
              <div className="fx-app__media">
                {a.image ? (
                  <img src={a.image} alt={a.title} />
                ) : (
                  <div className="ws-ph" aria-hidden="true">
                    <span>{a.title}</span>
                  </div>
                )}
              </div>
              <h3 className="fx-app__title">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="fx-cta fx-inner">
        <Link to="/contact" className="fx-cta__btn">
          Request a sample
        </Link>
      </section>
    </div>
  );
}

export default Woolskin;
