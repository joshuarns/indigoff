import './LogoMarquee.css';

// Importa TODOS los logos de src/assets/img/clients automáticamente.
// Para añadir/quitar un cliente, solo agrega/borra su archivo en esa carpeta.
const modules = import.meta.glob(
  '../../assets/img/clients/*.{jpg,jpeg,png,svg,webp}',
  { eager: true, import: 'default' }
);

const LOGOS = Object.entries(modules)
  .map(([path, src]) => ({
    src,
    name: path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
      .replace(/-/g, ' '),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function LogoMarquee({ title = 'Trusted by leading brands' }) {
  if (LOGOS.length === 0) return null;

  return (
    <section className="logos">
      {title && (
        <p className="logos__title logos__inner">{title}</p>
      )}
      <div className="logos__viewport">
        {/* Dos copias del set para un loop continuo sin cortes. */}
        <ul className="logos__track" aria-label="Clientes">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <li className="logos__item" key={`${logo.name}-${i}`} aria-hidden={i >= LOGOS.length}>
              <img src={logo.src} alt={logo.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LogoMarquee;
