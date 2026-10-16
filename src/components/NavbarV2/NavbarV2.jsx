import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { MENU_LOCATION } from '../../config/api';
import logoBlack from '../../assets/img/indigoff-logo-black.svg';
import logoWhite from '../../assets/img/logo-indigoff-white.svg';
import './NavbarV2.css';

// --- Enlace interno (Link) o externo (<a>) ---
function isInternal(path = '') {
  return path.startsWith('/') && !path.startsWith('//');
}

function NavLinkV2({ item, className, onNavigate }) {
  const label = <span dangerouslySetInnerHTML={{ __html: item.title }} />;
  if (isInternal(item.path)) {
    return (
      <Link to={item.path} className={className} onClick={onNavigate}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={item.url || item.path}
      className={className}
      target={item.target || undefined}
      rel={item.target === '_blank' ? 'noreferrer' : undefined}
      onClick={onNavigate}
    >
      {label}
    </a>
  );
}

// Item del menú: mega-panel con hover en escritorio, acordeón en móvil.
function NavItemV2({ item, onNavigate }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <li
      className={`nv2-item ${hasChildren ? 'nv2-item--has-children' : ''} ${
        open ? 'is-open' : ''
      }`}
    >
      <div className="nv2-item__label">
        <NavLinkV2 item={item} className="nv2-item__link" onNavigate={handleNavigate} />
        {hasChildren && (
          <button
            type="button"
            className="nv2-item__caret"
            aria-label={open ? 'Cerrar submenú' : 'Abrir submenú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M3 4.5 L6 7.5 L9 4.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && (
        <ul className="nv2-item__submenu">
          {item.children.map((child) => (
            <li key={child.id} className="nv2-item__subitem">
              <NavLinkV2
                item={child}
                className="nv2-item__sublink"
                onNavigate={handleNavigate}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// Navbar v2: overlay transparente sobre el hero que se vuelve sólido al
// hacer scroll (o al abrir el menú móvil). Reutiliza el menú de WordPress.
function NavbarV2() {
  const { items } = useMenu(MENU_LOCATION);
  const [open, setOpen] = useState(false); // menú móvil
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del body cuando el drawer móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`nv2 ${solid ? 'is-solid' : 'is-top'} ${open ? 'is-open' : ''}`}>
      <div className="nv2__inner">
        <Link to="/" className="nv2__logo" onClick={() => setOpen(false)}>
          <img
            src={solid ? logoBlack : logoWhite}
            alt="Indigoff"
            className="nv2__logo-img"
          />
        </Link>

        <nav className="nv2__nav">
          <ul className="nv2__list">
            {items.map((item) => (
              <NavItemV2
                key={item.id}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </ul>
        </nav>

        <button
          className="nv2__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default NavbarV2;
