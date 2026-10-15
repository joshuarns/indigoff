import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/on-portada.jpg';
import pendantImg from '../../assets/img/on-pendant.jpeg';
import floorImg from '../../assets/img/on-floor.jpg';
import wallImg from '../../assets/img/on-wall.jpg';

// Textos de indigoff.com/indigoff-on/.
const CATEGORIES = [
  {
    title: 'Pendant Lights',
    text: 'Suspended lighting objects that compose atmosphere with clarity and grace.',
    to: '/indigoff-on/pendant-lighting',
    image: pendantImg,
  },
  {
    title: 'Floor Lights',
    text: 'Freestanding light forms that anchor a room and guide its rhythm.',
    // El slug en WordPress es "pedestal".
    to: '/indigoff-on/pedestal',
    image: floorImg,
  },
  {
    title: 'Wall Lights',
    text: 'Wall-mounted light objects with a quiet, architectural authority.',
    to: '/indigoff-on/wall',
    image: wallImg,
  },
];

function CollectionOn() {
  return (
    <Collection
      brandLabel="On"
      title="Lighting objects of quiet distinction"
      description="Indigoff On is a collection of architectural light objects for ceiling, wall, and floor. Each piece gives light a deliberate role: defining atmosphere, guiding movement, and lending a room its lasting mood."
      cover={portada}
      coverAlt="Indigoff On — Architectural Lighting Objects"
      categories={CATEGORIES}
    />
  );
}

export default CollectionOn;
