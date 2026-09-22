import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/gallery-portada.jpg';
import muralsImg from '../../assets/img/murals.jpg';
import canvasImg from '../../assets/img/canvas.jpg';

// Textos de indigoff.com/indigoff-gallery/.
const CATEGORIES = [
  {
    title: 'Murals',
    text: 'Large-scale acoustic murals that turn whole walls into identity and texture.',
    to: '/indigoff-gallery/murals',
    image: muralsImg,
  },
  {
    title: 'Canvas',
    text: 'Framed acoustic canvas pieces that soften sound as collectible wall art.',
    to: '/indigoff-gallery/canvas',
    image: canvasImg,
  },
];

function CollectionGallery() {
  return (
    <Collection
      brandLabel="Gallery"
      title="Acoustic Art for Walls"
      description="Indigoff Gallery transforms acoustic performance into collectible wall art. The collection includes acoustic murals and canvas pieces designed to soften sound while bringing identity, texture, and curated visual presence to interiors. Built for hospitality, workplace, commercial, and statement spaces, each piece turns sound control into an expressive architectural feature."
      cover={portada}
      coverAlt="Indigoff Gallery — Acoustic Art for Walls"
      categories={CATEGORIES}
    />
  );
}

export default CollectionGallery;
