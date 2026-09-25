import './Clients.css';

// Carga los logos de clientes y selecciona los más representativos, en orden.
const logoModules = import.meta.glob('../../assets/img/clients/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const CURATED = [
  'google',
  'amazon',
  'netflix',
  'spotify',
  'uber-freight',
  'adidas',
  'visa',
  'pinterest',
  'tiktok',
  'paramount',
];

const LOGOS = CURATED.map((name) => {
  const key = Object.keys(logoModules).find(
    (k) => k.split('/').pop().replace(/\.[^.]+$/, '') === name
  );
  return key ? { name, src: logoModules[key] } : null;
}).filter(Boolean);

// Nombres legibles para el alt de cada logo.
const label = (name) =>
  name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function Clients({ title = 'We’ve been working with some great people' }) {
  return (
    <section className="clients">
      <div className="clients__inner">
        <div className="clients__panel">
          <h2 className="clients__title">{title}</h2>
          <ul className="clients__grid">
            {LOGOS.map((logo) => (
              <li className="clients__logo" key={logo.name}>
                <img src={logo.src} alt={label(logo.name)} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Clients;
