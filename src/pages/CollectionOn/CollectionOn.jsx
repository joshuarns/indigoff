import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/on-portada.jpg';
import pendantImg from '../../assets/img/on-pendant.jpeg';
import floorImg from '../../assets/img/on-floor.jpg';
import wallImg from '../../assets/img/on-wall.jpg';

// Textos de indigoff.com/indigoff-on/.
const CATEGORIES = [
  {
    title: 'Pendant Lights',
    text: 'Suspended lighting objects that define zones and shape atmosphere from above.',
    to: '/indigoff-on/pendant-lighting',
    image: pendantImg,
  },
  {
    title: 'Floor Lights',
    text: 'Freestanding light objects that guide movement and ground a space.',
    // El slug en WordPress es "pedestal".
    to: '/indigoff-on/pedestal',
    image: floorImg,
  },
  {
    title: 'Wall Lights',
    text: 'Architectural wall fixtures that treat light as a calm, intentional presence.',
    to: '/indigoff-on/wall',
    image: wallImg,
  },
];

function CollectionOn() {
  return (
    <Collection
      brandLabel="On"
      title="Architectural Lighting Objects"
      description="Indigoff On is a curated collection of lighting objects designed to shape atmosphere through ceiling, wall, and floor typologies. Built for hospitality, workplace, residential, commercial, and public interiors, each piece treats light as an architectural tool that guides movement, defines zones, and brings a calmer, more intentional presence to the room."
      cover={portada}
      coverAlt="Indigoff On — Architectural Lighting Objects"
      categories={CATEGORIES}
    />
  );
}

export default CollectionOn;
