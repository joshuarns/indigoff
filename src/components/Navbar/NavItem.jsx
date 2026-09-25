import { Link } from 'react-router-dom';

// Decide si un enlace es interno (React Router) o externo (<a>).
function isInternal(path = '') {
  return path.startsWith('/') && !path.startsWith('//');
}

function NavLink({ item, className, onNavigate }) {
  const label = (
    <span dangerouslySetInnerHTML={{ __html: item.title }} />
  );

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

// Un item del menú. Si tiene children, muestra el caret y un submenú.
function NavItem({ item, onNavigate }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return (
    <li className={`nav-item ${hasChildren ? 'nav-item--has-children' : ''}`}>
      <div className="nav-item__label">
        <NavLink item={item} className="nav-item__link" onNavigate={onNavigate} />
        {hasChildren && (
          <svg
            className="nav-item__caret"
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 4.5 L6 7.5 L9 4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {hasChildren && (
        <ul className="nav-item__submenu">
          {item.children.map((child) => (
            <li key={child.id} className="nav-item__subitem">
              <NavLink
                item={child}
                className="nav-item__sublink"
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;
