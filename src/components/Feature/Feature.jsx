import { Link } from 'react-router-dom';
import './Feature.css';

// Bloque de dos columnas: imagen con una esquina en arco + texto y botón.
// `corner` elige qué esquina de la imagen se redondea: 'tr', 'tl', 'br', 'bl'.
// `reverse` pone la imagen a la derecha.
function Feature({
  image,
  imageAlt = '',
  title,
  description,
  buttonLabel = 'Read More',
  to = '#',
  corner = 'tr',
  reverse = false,
}) {
  return (
    <section className={`feature ${reverse ? 'feature--reverse' : ''}`}>
      <div className="feature__inner">
        <div className={`feature__media feature__media--${corner}`}>
          <img src={image} alt={imageAlt} />
        </div>

        <div className="feature__content">
          <h2 className="feature__title">{title}</h2>
          {description && <p className="feature__desc">{description}</p>}
          {buttonLabel && (
            <Link to={to} className="feature__btn">
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Feature;
