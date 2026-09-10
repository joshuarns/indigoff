import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="not-found__link">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
