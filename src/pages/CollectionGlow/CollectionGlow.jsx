import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/glow-portada.jpeg';
import pendantImg from '../../assets/img/glow-pendant.jpg';
import floorImg from '../../assets/img/glow-floor.jpg';
import tableImg from '../../assets/img/glow-table.png';

// Textos de indigoff.com/indigoff-glow/.
const CATEGORIES = [
  {
    title: 'Pendant Lights',
    text: 'Suspended luminous forms that temper sound and set the tone from above.',
    to: '/indigoff-glow/pendant-lamp',
    image: pendantImg,
  },
  {
    title: 'Floor Lights',
    text: 'Sculptural floor pieces that lend warmth, intimacy, and acoustic ease.',
    to: '/indigoff-glow/floor',
    image: floorImg,
  },
  {
    title: 'Table Lights',
    text: 'Intimate light objects that bring acoustic comfort to the finest details.',
    to: '/indigoff-glow/table',
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
