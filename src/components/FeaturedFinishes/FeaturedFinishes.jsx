import { Link } from 'react-router-dom';
import colorsImg from '../../assets/img/Colors.jpg';
import printImg from '../../assets/img/Print.png';
import textureImg from '../../assets/img/Textures.jpg';
import './FeaturedFinishes.css';

// Tres possibilities destacadas para el home (estilo "Featured Products").
const ITEMS = [
  { title: 'Colors', tag: 'Possibilities', image: colorsImg },
  { title: 'Print', tag: 'Possibilities', image: printImg },
  { title: 'Texture', tag: 'Possibilities', image: textureImg },
];

function FeaturedFinishes({ title = 'Featured Finishes', to = '/possibilities' }) {
  return (
    <section className="featfin">
      <div className="featfin__inner">
        <h2 className="featfin__title">{title}</h2>

        <div className="featfin__grid">
          {ITEMS.map((item) => (
            <Link key={item.title} to={to} className="featfin-card">
              <div className="featfin-card__media">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="featfin-card__foot">
                <h3 className="featfin-card__name">{item.title}</h3>
                <span className="featfin-card__tag">{item.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedFinishes;
