import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [paused, setPaused] = useState(false);

  // Refs para controlar el progreso sin re-renderizar en cada frame.
  const fillRef = useRef(null); // relleno del dot activo
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const goTo = useCallback(
    (index) => setActive((index + images.length) % images.length),
    [images.length]
  );

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % images.length),
    [images.length]
  );

  // Barra de progreso + auto-avance. Se reinicia al cambiar la imagen activa.
  // Usa setInterval + delta real (Date.now) para ser fiable también cuando la
  // pestaña está en segundo plano; en pausa (hover) el progreso se congela.
  useEffect(() => {
    if (images.length <= 1) return undefined;

    const fill = fillRef.current;
    if (fill) fill.style.width = '0%';

    let elapsed = 0;
    let last = Date.now();

    const id = setInterval(() => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      if (pausedRef.current) return; // congelado mientras el cursor está encima

      elapsed += dt;
      const progress = Math.min(elapsed / AUTOPLAY_MS, 1);
      if (fill) fill.style.width = `${progress * 100}%`;
      if (progress >= 1) {
        clearInterval(id);
        next();
      }
    }, 40);

    return () => clearInterval(id);
  }, [active, next, images.length]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
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

        {/* Dots: indican la imagen activa; el activo se llena como progreso. */}
        {images.length > 1 && (
          <div className="hero__dots" role="tablist" aria-label="Background images">
            {images.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  className={`hero__dot ${isActive ? 'is-active' : ''}`}
                  aria-label={`Imagen ${i + 1}`}
                  aria-selected={isActive}
                  role="tab"
                  onClick={() => goTo(i)}
                >
                  {isActive && <span className="hero__dot-fill" ref={fillRef} />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
