// Datos de la página de descargas, replicados de la versión anterior
// (cms.indigoff.com/downloads/). Cada grupo tiene filas con el nombre del
// producto y sus archivos (PDF = ficha técnica, 3D = modelo .zip).
// Los archivos viven en el WordPress (cms.indigoff.com/wp-content/uploads).

const BASE = 'https://cms.indigoff.com/wp-content/uploads/2026/01';

export const DOWNLOAD_GROUPS = [
  {
    title: 'Ceilings',
    rows: [
      { name: 'Baffle Float', pdf: `${BASE}/Ficha-Digital-Cirrus.pdf`, model: `${BASE}/Ceilings_Cirrus.zip` },
      { name: 'Baffle Ripples', pdf: `${BASE}/Ficha-Digital-Mist.pdf`, model: `${BASE}/Baffle_Mist.zip` },
      { name: 'Baffle Axis', pdf: `${BASE}/Ficha-Digital-Stratus.pdf`, model: `${BASE}/Baffle_Stratus.zip` },
      { name: 'Aries', pdf: `${BASE}/Ficha-Digital-Aries.pdf`, model: `${BASE}/Plafon_Aries.zip` },
      { name: 'Hydra', pdf: `${BASE}/Ficha-Digital-Hydra.pdf`, model: `${BASE}/Plafon_Hydra.zip` },
      { name: 'Altus', model: `${BASE}/Baffle_Altus.zip` },
      { name: 'Comp', model: `${BASE}/Plafon_Comp.zip` },
    ],
  },
  {
    title: 'Walls',
    rows: [
      { name: 'Main', pdf: `${BASE}/Walls.pdf` },
      { name: 'Akevia', model: `${BASE}/Wall_Akebia.zip` },
      { name: 'Cissu', model: `${BASE}/Wall_Cissu.zip` },
      { name: 'Clematis', model: `${BASE}/Wall_Clematis.zip` },
      { name: 'Ionicera', model: `${BASE}/Wall_Lonicera.zip` },
      { name: 'Wisteria', model: `${BASE}/Wall_Wisteria.zip` },
    ],
  },
  {
    title: 'Frames',
    rows: [
      { name: 'Main', pdf: `${BASE}/Frames.pdf` },
      { name: 'Cascade', model: `${BASE}/Frame_Cascade.zip` },
      { name: 'Cataract', model: `${BASE}/Frames_Cataract.zip` },
      { name: 'Plungle', model: `${BASE}/Frames_Plungle.zip` },
    ],
  },
  {
    title: 'Clouds',
    rows: [
      { name: 'Main', pdf: `${BASE}/Clouds.pdf` },
      { name: 'Centerline', model: `${BASE}/Nube_Drizzle.zip` },
      { name: 'Aerial Field', model: `${BASE}/Nube_Freezing.zip` },
      { name: 'Spatial Core', model: `${BASE}/Nube_Hail.zip` },
      { name: 'Atrium', model: `${BASE}/Nube_Sleet.zip` },
      { name: 'Continuum', model: `${BASE}/Nube_Snow.zip` },
    ],
  },
];
