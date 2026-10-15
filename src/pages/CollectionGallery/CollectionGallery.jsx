import Collection from '../../components/Collection/Collection';
import portada from '../../assets/img/gallery-portada.jpg';
import muralsImg from '../../assets/img/murals.jpg';
import canvasImg from '../../assets/img/canvas.jpg';

// Textos de indigoff.com/indigoff-gallery/.
const CATEGORIES = [
  {
    title: 'Murals',
    text: 'Large-scale acoustic works that give an entire wall texture, identity, and resonance.',
    to: '/indigoff-gallery/murals',
    image: muralsImg,
  },
  {
    title: 'Canvas',
    text: 'Framed acoustic canvases that pair visual depth with measured quiet.',
    to: '/indigoff-gallery/canvas',
    image: canvasImg,
  },
];

function CollectionGallery() {
  return (
    <Collection
      brandLabel="Gallery"
      title="Acoustic art, composed for the wall"
      description="Indigoff Gallery turns acoustic performance into collectible visual work. Murals and canvases soften the room while bringing texture, identity, and a curated point of view to the architectural envelope."
      cover={portada}
      coverAlt="Indigoff Gallery — Acoustic Art for Walls"
      categories={CATEGORIES}
    />
  );
}

export default CollectionGallery;
