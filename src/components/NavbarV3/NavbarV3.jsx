import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { MENU_LOCATION } from '../../config/api';
import logo from '../../assets/img/indigoff-logo-black.svg';
import './NavbarV3.css';

function isInternal(path = '') {
  return path.startsWith('/') && !path.startsWith('//');
}

function MenuLink({ item, className, onNavigate }) {
  const content = <span dangerouslySetInnerHTML={{ __html: item.title }} />;
  if (isInternal(item.path)) {
    return <Link to={item.path} className={className} onClick={onNavigate}>{content}</Link>;
  }
  return (
    <a href={item.url || item.path} className={className} target={item.target || undefined}
      rel={item.target === '_blank' ? 'noreferrer' : undefined} onClick={onNavigate}>
      {content}
    </a>
  );
}

function NavbarV3() {
  const { items } = useMenu(MENU_LOCATION);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nv3 ${open ? 'is-open' : ''}`}>
      <div className="nv3__bar">
        <Link to="/home-v3" className="nv3__logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Indigoff" />
        </Link>
        <button className="nv3__toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span>{open ? 'Close' : 'Menu'}</span>
          <i aria-hidden="true" />
        </button>
        <nav className="nv3__nav" aria-label="Primary navigation">
          <ul>
            {items.map((item) => (
              <li key={item.id} className={item.children?.length ? 'nv3__item--has-children' : ''}>
                <MenuLink item={item} className="nv3__link" onNavigate={() => setOpen(false)} />
                {item.children?.length > 0 && (
                  <ul className="nv3__subnav">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <MenuLink item={child} className="nv3__sublink" onNavigate={() => setOpen(false)} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavbarV3;
