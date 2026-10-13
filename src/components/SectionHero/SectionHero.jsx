import './SectionHero.css';

// Hero full-bleed para páginas de sección: imagen (o video) a sangre que
// abarca toda la ventana, con eyebrow + título superpuestos abajo, al estilo
// del hero del home.
//
// props:
//  - image | video: fuente del medio de fondo
//  - eyebrow: línea pequeña superior (opcional)
//  - title: título grande
//  - imageAlt: alt accesible (si se omite, la imagen es decorativa)
function SectionHero({ image, video, eyebrow, title, imageAlt = '' }) {
  return (
    <section className="section-hero">
      {video ? (
        <video
          className="section-hero__media"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : image ? (
        <img
          className="section-hero__media"
          src={image}
          alt={imageAlt}
          aria-hidden={imageAlt ? undefined : 'true'}
        />
      ) : null}

      <div className="section-hero__overlay" />

      <div className="section-hero__content">
        {eyebrow && <p className="section-hero__eyebrow">{eyebrow}</p>}
        {title && <h1 className="section-hero__title">{title}</h1>}
      </div>
    </section>
  );
}

export default SectionHero;
