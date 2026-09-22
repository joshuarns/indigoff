import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/glow-portada.jpeg';
import pendantImg from '../../assets/img/glow-pendant.jpg';
import floorImg from '../../assets/img/glow-floor.jpg';
import tableImg from '../../assets/img/glow-table.png';

// Textos de indigoff.com/indigoff-glow/.
const CATEGORIES = [
  {
    title: 'Pendant Lights',
    text: 'Suspended acoustic fixtures that shape atmosphere and absorb sound overhead.',
    to: '/indigoff-glow/pendant-lamp',
    image: pendantImg,
  },
  {
    title: 'Floor Lights',
    text: 'Sculptural floor lighting that brings warmth and quiet to any corner.',
    to: '/indigoff-glow/floor-lamp',
    image: floorImg,
  },
  {
    title: 'Table Lights',
    text: 'Compact acoustic lamps that turn light into an object on every surface.',
    to: '/indigoff-glow/table-lamp',
    image: tableImg,
  },
];

function CollectionGlow() {
  return (
    <Collection
      brandLabel="Glow"
      title="Acoustic Lighting Solutions"
      description="Indigoff Glow includes acoustic lighting fixtures, pendant lights, floor lights, and table lights designed to manage sound while shaping atmosphere through illumination. Built for hospitality, workplace, residential, studio, and design-driven interiors, each solution helps soften reverberation, create visual warmth, and turn light into both a sculptural object and an acoustic tool."
      cover={portada}
      coverAlt="Indigoff Glow — Acoustic Lighting Solutions"
      categories={CATEGORIES}
    />
  );
}

export default CollectionGlow;
