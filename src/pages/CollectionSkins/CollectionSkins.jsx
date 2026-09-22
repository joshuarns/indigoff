import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/skin-portada.jpg';
import dividersImg from '../../assets/img/skin-dividers.jpg';
import framesImg from '../../assets/img/skin-frames.jpg';
import wallsImg from '../../assets/img/skin-walls.jpg';

// Textos de indigoff.com/indigoff-skin/.
const CATEGORIES = [
  {
    title: 'Dividers',
    text: 'Freestanding acoustic partitions that shape space and control sound between areas.',
    to: '/indigoff-skin/dividers',
    image: dividersImg,
  },
  {
    title: 'Frames',
    text: 'Framed acoustic systems that turn sound absorption into a refined wall statement.',
    to: '/indigoff-skin/frames-skin',
    image: framesImg,
  },
  {
    title: 'Walls',
    text: 'Acoustic wall panels that reduce noise and bring material expression to any surface.',
    to: '/indigoff-skin/walls-skin',
    image: wallsImg,
  },
];

function CollectionSkins() {
  return (
    <Collection
      brandLabel="Skins"
      title="Acoustic Wall Solutions"
      description="Indigoff Skin includes acoustic wall panels, framed acoustic systems, and spatial dividers designed to manage sound while enhancing vertical surfaces. Built for commercial, hospitality, workplace, education, and public interiors, each solution helps reduce noise, improve focus, and bring refined material expression to walls and interior partitions."
      cover={portada}
      coverAlt="Indigoff Skins — Acoustic Wall Solutions"
      categories={CATEGORIES}
    />
  );
}

export default CollectionSkins;
