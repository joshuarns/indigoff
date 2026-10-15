import { Link } from 'react-router-dom';
import colorsImg from '../../assets/img/Colors.jpg';
import printImg from '../../assets/img/Print.png';
import textureImg from '../../assets/img/Textures.jpg';
import engravingImg from '../../assets/img/Engraving-.png';
import embossedImg from '../../assets/img/embossed.jpeg';
import './OtherPossibilities.css';

// Acabados de la sección Possibilities. `to` apunta a la página del acabado
// cuando existe; el resto cae a la página general de Possibilities.
const FINISHES = [
  { title: 'Colors', image: colorsImg, to: '/colors' },
  { title: 'Print', image: printImg, to: '/printed' },
  { title: 'Texture', image: textureImg, to: '/texture' },
  { title: 'Engraving', image: engravingImg, to: '/routing' },
  { title: 'Embossed', image: embossedImg, to: '/embossed' },
];

// Muestra los demás acabados (excluye `exclude`) como enlaces.
function OtherPossibilities({ exclude, title = 'Further expressions' }) {
  const items = FINISHES.filter((f) => f.title !== exclude);

  return (
    <section className="other-poss">
      <div className="other-poss__inner">
        <h2 className="other-poss__title">{title}</h2>
        <div className="other-poss__grid">
          {items.map((f) => (
            <Link key={f.title} to={f.to} className="other-poss-card">
              <div className="other-poss-card__media">
                <img src={f.image} alt={f.title} loading="lazy" />
                <span className="other-poss-card__name">{f.title}</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="other-poss__closing">
          <span className="other-poss__closing-lead">
            Material expression, resolved with acoustic precision.
          </span>{' '}
          <span className="other-poss__closing-rest">
            Explore finishes designed to lend depth, character, and quiet to
            the architectural envelope.
          </span>
        </p>
      </div>
    </section>
  );
}

export default OtherPossibilities;
