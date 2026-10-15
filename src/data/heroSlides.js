// Hero del home: un solo contenido fijo (título + botones) y un slideshow de
// imágenes de fondo que rotan con crossfade + efecto Ken Burns.
//
// - heroContent: el texto y los botones (no cambian).
// - heroImages: las imágenes que se van alternando de fondo.

import img1 from '../assets/img/28452.png';
import img2 from '../assets/img/6829456.png';
import img3 from '../assets/img/4728403.png';

export const heroContent = {
  title: 'silence,\nconsidered',
  buttons: [
    { label: 'View Baffles', to: '/indigoff-air/baffles-air' },
    { label: 'View Clouds', to: '/indigoff-air/clouds-air' },
  ],
};

export const heroImages = [img1, img2, img3];
