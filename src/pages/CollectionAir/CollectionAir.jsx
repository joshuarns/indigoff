import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/indigoff-air-portada.jpg';
import bafflesImg from '../../assets/img/air-acoustic-baffles.jpeg';
import ceilingsImg from '../../assets/img/air-acoustic-ceilings.jpg';
import cloudsImg from '../../assets/img/air-acoustic-clouds.png';

// Textos de indigoff.com/indigoff-air/.
const CATEGORIES = [
  {
    title: 'Acoustic Baffles',
    text: 'Suspended vertical panels that absorb sound and add architectural rhythm overhead.',
    to: '/indigoff-air/baffles-air',
    image: bafflesImg,
  },
  {
    title: 'Acoustic Ceilings',
    text: 'Full ceiling systems that manage reverberation across large, open interiors.',
    to: '/indigoff-air/ceilings-air',
    image: ceilingsImg,
  },
  {
    title: 'Acoustic Clouds',
    text: 'Floating cloud forms that soften noise while sculpting the space above.',
    to: '/indigoff-air/clouds-air',
    image: cloudsImg,
  },
];

function CollectionAir() {
  return (
    <Collection
      brandLabel="Air"
      title="Acoustic Ceiling Solutions"
      description="Indigoff Air includes suspended acoustic baffles, ceiling systems, and cloud forms designed to manage sound while adding architectural rhythm overhead. Built for commercial, hospitality, workplace, education, and public interiors, each solution helps soften noise without compromising design intent."
      cover={portada}
      coverAlt="Indigoff Air — Acoustic Ceiling Solutions"
      categories={CATEGORIES}
    />
  );
}

export default CollectionAir;
