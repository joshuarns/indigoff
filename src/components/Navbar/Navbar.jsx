import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { MENU_LOCATION } from '../../config/api';
import NavItem from './NavItem';
import logo from '../../assets/img/indigoff-logo-black.svg';
import './Navbar.css';

// Navbar principal. El logo es fijo (marca) y los enlaces se consumen
// desde WordPress a través del hook useMenu.
function Navbar() {
  const { items } = useMenu(MENU_LOCATION);
  const [open, setOpen] = useState(false); // menú móvil

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Indigoff" className="navbar__logo-img" />
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          <ul className="navbar__list">
            {items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
