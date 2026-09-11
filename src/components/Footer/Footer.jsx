import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-indigoff-white.svg';
import './Footer.css';

// Columnas del footer (estilo turf): cada una con encabezado y sus enlaces
// apilados. Los enlaces son los del navbar, agrupados por tema.
const FOOTER_COLUMNS = [
  {
    heading: 'Products',
    links: [
      { title: 'Collections', path: '/collections' },
      { title: 'Categories', path: '/categories' },
      { title: 'Possibilities', path: '/possibilities' },
    ],
  },
  {
    heading: 'Inspiration',
    links: [{ title: 'Portfolio', path: '/portfolio' }],
  },
  {
    heading: 'Resources',
    links: [
      { title: 'Downloads', path: '/downloads' },
      { title: 'My list', path: '/my-list' },
    ],
  },
  {
    heading: 'Need a Hand',
    links: [{ title: 'Contact Us', path: '/contact' }],
  },
];

// Enlace interno (React Router) o externo (<a>), igual criterio que el navbar.
function isInternal(path = '') {
  return path.startsWith('/') && !path.startsWith('//');
}

function FooterLink({ item }) {
  const label = <span dangerouslySetInnerHTML={{ __html: item.title }} />;
  if (isInternal(item.path)) {
    return (
      <Link to={item.path} className="footer__link">
        {label}
      </Link>
    );
  }
  return (
    <a
      className="footer__link"
      href={item.url || item.path}
      target={item.target || undefined}
      rel={item.target === '_blank' ? 'noreferrer' : undefined}
    >
      {label}
    </a>
  );
}

// Iconos de redes. Los href son placeholders (#) hasta tener las URLs reales.
const SOCIAL = [
  {
    name: 'Facebook',
    href: '#',
    path: 'M14 8.5h2V5.7C15.6 5.6 14.8 5.5 14 5.5c-1.9 0-3.3 1.2-3.3 3.3V11H8v3h2.7v7.5h3.3V14h2.7l.4-3H14V9.3c0-.6.3-.8 1-.8Z',
  },
  {
    name: 'Instagram',
    href: '#',
    path: 'M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM20 8.9c-.1-1.5-.4-2.8-1.5-3.9C17.4 3.9 16.1 3.6 14.6 3.5 13.1 3.4 8.9 3.4 7.4 3.5 5.9 3.6 4.6 3.9 3.5 5 2.4 6.1 2.1 7.4 2 8.9 1.9 10.4 1.9 14.6 2 16.1c.1 1.5.4 2.8 1.5 3.9 1.1 1.1 2.4 1.4 3.9 1.5 1.5.1 5.7.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5 1.1-1.1 1.4-2.4 1.5-3.9.1-1.5.1-5.7 0-7.2Zm-2 8.8a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4-1.3 0-4.1.1-5.3-.4A3 3 0 0 1 4 17.7c-.5-1.2-.4-4-.4-5.3 0-1.3-.1-4.1.4-5.3A3 3 0 0 1 5.7 5.4C6.9 4.9 9.7 5 11 5c1.3 0 4.1-.1 5.3.4A3 3 0 0 1 18 7.1c.5 1.2.4 4 .4 5.3 0 1.3.1 4.1-.4 5.3Z',
  },
  {
    name: 'LinkedIn',
    href: '#',
    path: 'M6.9 8.8H3.7V20h3.2V8.8ZM5.3 4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 20v-6.2c0-3.1-1.7-4.6-3.9-4.6-1.8 0-2.6 1-3 1.7V8.8H10.1c0 .9 0 11.2 0 11.2h3.2v-6.3c0-.3 0-.7.1-.9.3-.7.9-1.4 1.9-1.4 1.4 0 1.9 1 1.9 2.6V20h3.1Z',
  },
  {
    name: 'Pinterest',
    href: '#',
    path: 'M12 3.5a8.5 8.5 0 0 0-3.1 16.4c-.1-.7-.1-1.7 0-2.4.2-.8 1.1-4.8 1.1-4.8s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.2-.2 1 .5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.3 2-4.3 4.1 0 .8.3 1.7.7 2.1.1.1.1.2.1.3l-.2.9c0 .2-.1.2-.3.1-1.2-.5-1.9-2.2-1.9-3.6 0-2.9 2.1-5.6 6.1-5.6 3.2 0 5.7 2.3 5.7 5.3 0 3.2-2 5.8-4.8 5.8-.9 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.8 1.9-1.2 2.5A8.5 8.5 0 1 0 12 3.5Z',
  },
  {
    name: 'YouTube',
    href: '#',
    path: 'M21.6 8.3a2.5 2.5 0 0 0-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.5A2.5 2.5 0 0 0 2.4 8.3C2 9.9 2 12 2 12s0 2.1.4 3.7a2.5 2.5 0 0 0 1.8 1.8C5.8 18 12 18 12 18s6.2 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-3.7.4-3.7s0-2.1-.4-3.7ZM10 15V9l5.2 3L10 15Z',
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <Link to="/" className="footer__logo" aria-label="Indigoff — inicio">
            <img src={logo} alt="Indigoff" />
          </Link>
        </div>

        <nav className="footer__cols" aria-label="Pie de página">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="footer__col">
              <h3 className="footer__col-title">{col.heading}</h3>
              <ul className="footer__col-links">
                {col.links.map((item) => (
                  <li key={item.path}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer__bottom">
          <div className="footer__meta">
            <span className="footer__copy">© {year} Indigoff, Inc.</span>
            <a className="footer__legal" href="#">Terms &amp; Conditions</a>
            <a className="footer__legal" href="#">Intellectual Property</a>
          </div>

          <ul className="footer__social">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href={s.href} aria-label={s.name} className="footer__social-link">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
