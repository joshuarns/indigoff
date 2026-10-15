import { Link } from 'react-router-dom';
import SectionHero from '../../components/SectionHero/SectionHero';
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
    title: 'Natural absorption',
    text: 'Wool fibers that lend the interior a breathable, naturally composed finish.',
  },
  {
    n: '02',
    title: 'Soft Reverberation Control',
    text: 'Designed to temper reflections and create rooms of deeper comfort.',
  },
  {
    n: '03',
    title: 'Thermal Insulation',
    text: 'A considered balance of thermal comfort and acoustic ease.',
  },
  {
    n: '04',
    title: 'Visual Comfort',
    text: 'Softens hard surfaces and gives the room a more composed atmosphere.',
  },
];

const QUALITIES = [
  {
    title: 'Design Flexibility',
    text: 'Equally at home in hospitality, workplace, residential, and cultural interiors.',
  },
  {
    title: 'Natural Character',
    text: 'A wool-based surface with organic depth, a soft hand, and a quiet presence.',
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
      {/* --- Hero banner full-bleed (primero la imagen, luego el contenido) --- */}
      <SectionHero
        image={portada}
        imageAlt="Woolskin — Acoustic Wool Panels"
        eyebrow="Indigoff Woolskin"
        title="Wool acoustic panels with an architectural softness"
      />

      {/* --- The wool --- */}
      <section className="fx-fabric fx-inner">
        <div className="fx-fabric__lead">
          <span className="fx-label">The wool</span>
          <h2 className="fx-section-title">A softer architectural skin.</h2>
        </div>
        <p className="fx-fabric__text">
          Woolskin is Indigoff’s wool-felt acoustic collection, composed to
          bring warmth, texture, and measured quiet to architectural spaces.
          Its soft textile surface absorbs unwanted sound while lending walls,
          ceilings, and tailored applications a refined visual depth.
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
              More than a finish, Woolskin becomes an acoustic skin for the
              interior. Its natural materiality reduces echo and softens
              reverberation while giving hospitality, workplace, residential,
              and cultural spaces a more intimate sense of comfort.
            </p>
            <p>
              Each panel is made to feel natural, matte, and tactile. The wool
              surface deepens color, enriches light and shadow, and offers a
              level of warmth seldom found in conventional acoustic materials.
            </p>
            <p>
              Routed patterns, layered compositions, modular geometries, and
              tailored colorways allow Woolskin to shape both sound and space.
              It can remain understated or become sculptural, always integrated
              with the architectural character of the project.
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
          Request a material sample
        </Link>
      </section>
    </div>
  );
}

export default Woolskin;
