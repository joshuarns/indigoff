// Slides del hero. Edita aquí los textos, botones e imágenes.
//
// buttons: hasta 2 botones. `to` para rutas internas, `href` para externas.

import slide1Img from '../assets/img/28452.png';
import slide2Img from '../assets/img/6829456.png';
import slide3Img from '../assets/img/4728403.png';

export const heroSlides = [
  {
    id: 1,
    title: 'listen closer\nfeel the silence',
    subtitle:
      'Design the unseen, reshape your space with acoustic mastery',
    image: slide1Img,
    bg: 'linear-gradient(160deg, #2f4858 0%, #1f2f3a 100%)',
    buttons: [
      { label: 'View Cushion', to: '/collections' },
      { label: 'View Pillow', to: '/collections' },
    ],
  },
  {
    id: 2,
    title: 'Shape the sound',
    subtitle: 'Modular panels designed to fit any space and any acoustic need.',
    image: slide2Img,
    bg: 'linear-gradient(160deg, #b5651d 0%, #8a4a12 100%)',
    buttons: [{ label: 'Explore Collections', to: '/collections' }],
  },
  {
    id: 3,
    title: 'Color your quiet',
    subtitle: 'A full palette to match your brand, your mood, your room.',
    image: slide3Img,
    bg: 'linear-gradient(160deg, #4b5842 0%, #333d2c 100%)',
    buttons: [{ label: 'View Colors', to: '/categories' }],
  },
];
