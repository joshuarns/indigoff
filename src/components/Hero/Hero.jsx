import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { heroContent, heroImages } from '../../data/heroSlides';
import './Hero.css';

const AUTOPLAY_MS = 6000;

// Renderiza un enlace interno (Link) o externo (<a>) con estilo "flecha".
function HeroButton({ button }) {
  const inner = (
    <>
      <span className="hero__btn-label">{button.label}</span>
      <span className="hero__btn-arrow" aria-hidden="true">
        ›
      </span>
    </>
  );
  if (button.to) {
    return (
      <Link to={button.to} className="hero__btn">
        {inner}
      </Link>
    );
  }
  return (
    <a href={button.href} className="hero__btn" target="_blank" rel="noreferrer">
      {inner}
    </a>
  );
}

// Hero del home: un solo contenido fijo con un slideshow de imágenes de fondo
// (crossfade + Ken Burns). Solo las imágenes rotan; el texto no cambia.
function Hero({ content = heroContent, images = heroImages }) {
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % images.length),
    [images.length]
  );

  // Auto-avance del slideshow de fondo. Usa setInterval + delta real (Date.now)
  // para ser fiable también cuando la pestaña está en segundo plano.
  useEffect(() => {
    if (images.length <= 1) return undefined;

    let elapsed = 0;
    let last = Date.now();

    const id = setInterval(() => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      elapsed += dt;
      if (elapsed >= AUTOPLAY_MS) {
        clearInterval(id);
        next();
      }
    }, 100);

    return () => clearInterval(id);
  }, [active, next, images.length]);

  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="hero__viewport">
        {/* Slideshow de imágenes de fondo (crossfade + Ken Burns). */}
        <div className="hero__slides" aria-hidden="true">
          {images.map((img, i) => (
            <div
              key={i}
              className={`hero__slide ${i === active ? 'is-active' : ''}`}
            >
              <div
                className="hero__slide-media"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>

        {/* Capa de legibilidad. */}
        <div className="hero__overlay" />

        {/* Contenido fijo (un solo hero). */}
        <div className="hero__content">
          <h1 className="hero__title">{content.title}</h1>
          {content.buttons?.length > 0 && (
            <div className="hero__actions">
              {content.buttons.map((button) => (
                <HeroButton key={button.label} button={button} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Hero;
