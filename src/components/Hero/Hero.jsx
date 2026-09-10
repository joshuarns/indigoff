import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/heroSlides';
import './Hero.css';

const AUTOPLAY_MS = 6000;

// Renderiza un botón interno (Link) o externo (<a>) según sus props.
function HeroButton({ button }) {
  if (button.to) {
    return (
      <Link to={button.to} className="hero__btn">
        {button.label}
      </Link>
    );
  }
  return (
    <a href={button.href} className="hero__btn" target="_blank" rel="noreferrer">
      {button.label}
    </a>
  );
}

function Hero({ slides = heroSlides }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Refs para controlar el progreso sin re-renderizar en cada frame.
  const fillRef = useRef(null); // relleno del dot activo
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const goTo = useCallback(
    (index) => setActive((index + slides.length) % slides.length),
    [slides.length]
  );

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  // Barra de progreso + auto-avance. Se reinicia al cambiar el slide activo.
  // Usa setInterval + delta real (Date.now) para ser fiable también cuando la
  // pestaña está en segundo plano; en pausa (hover) el progreso se congela.
  useEffect(() => {
    if (slides.length <= 1) return undefined;

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
  }, [active, next, slides.length]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="hero__viewport">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero__slide ${i === active ? 'is-active' : ''}`}
            style={
              slide.image
                ? { backgroundImage: `url(${slide.image})` }
                : { backgroundImage: slide.bg }
            }
            aria-hidden={i !== active}
          >
            <div className="hero__overlay" />
            <div className="hero__content">
              <h1 className="hero__title">{slide.title}</h1>
              {slide.subtitle && (
                <p className="hero__subtitle">{slide.subtitle}</p>
              )}
              {slide.buttons?.length > 0 && (
                <div className="hero__actions">
                  {slide.buttons.map((button) => (
                    <HeroButton key={button.label} button={button} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Dots: el activo es una píldora que se llena como barra de progreso. */}
        <div className="hero__dots" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <button
                key={slide.id}
                className={`hero__dot ${isActive ? 'is-active' : ''}`}
                aria-label={`Ir al slide ${i + 1}`}
                aria-selected={isActive}
                role="tab"
                onClick={() => goTo(i)}
              >
                {isActive && slides.length > 1 && (
                  <span className="hero__dot-fill" ref={fillRef} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
