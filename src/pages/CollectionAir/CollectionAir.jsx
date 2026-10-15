import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/indigoff-air-portada.jpg';
import bafflesImg from '../../assets/img/air-acoustic-baffles.jpeg';
import ceilingsImg from '../../assets/img/air-acoustic-ceilings.jpg';
import cloudsImg from '../../assets/img/air-acoustic-clouds.png';

// Textos de indigoff.com/indigoff-air/.
const CATEGORIES = [
  {
    title: 'Acoustic Baffles',
    text: 'Suspended elements that bring measured rhythm, acoustic clarity, and sculptural presence overhead.',
    to: '/indigoff-air/baffles-air',
    image: bafflesImg,
  },
  {
    title: 'Acoustic Ceilings',
    text: 'Composed ceiling planes that temper reverberation across expansive interiors.',
    // El slug en WordPress está escrito "cielings-air" (con esa errata).
    to: '/indigoff-air/cielings-air',
    image: ceilingsImg,
  },
  {
    title: 'Acoustic Clouds',
    text: 'Floating forms that soften the acoustic field while refining the ceilingscape.',
    to: '/indigoff-air/clouds-air',
    image: cloudsImg,
  },
];

function CollectionAir() {
  return (
    <Collection
      brandLabel="Air"
      title="Acoustic compositions for the ceiling plane"
      description="Indigoff Air brings baffles, ceiling systems, and cloud forms into a singular architectural language. Each element calibrates sound while lending rhythm, scale, and composure to the room below."
      cover={portada}
      coverAlt="Indigoff Air — Acoustic Ceiling Solutions"
      categories={CATEGORIES}
    />
  );
}

export default CollectionAir;
