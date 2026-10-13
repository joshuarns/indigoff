import { Link } from 'react-router-dom';
import './SectionIntro.css';

// Intro de sección (bajo el hero): layout de dos columnas para aprovechar el
// ancho. A la izquierda una columna de apoyo (volver + etiqueta); a la derecha
// la descripción, amplia y prominente. En móvil se apila.
//
// props:
//  - backTo, backLabel: enlace "volver" opcional
//  - label: etiqueta pequeña de la columna izquierda (opcional)
//  - children: contenido de la descripción (uno o varios <p>)
function SectionIntro({ backTo, backLabel = 'Back', label, children }) {
  const hasAside = backTo || label;
  return (
    <section className="section-intro">
      <div className={`section-intro__inner ${hasAside ? '' : 'section-intro__inner--single'}`}>
        {hasAside && (
          <div className="section-intro__aside">
            {backTo && (
              <Link to={backTo} className="section-intro__back">
                ← {backLabel}
              </Link>
            )}
            {label && <span className="section-intro__label">{label}</span>}
          </div>
        )}
        <div className="section-intro__body">{children}</div>
      </div>
    </section>
  );
}

export default SectionIntro;
