import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useProjects } from '../../hooks/useProjects';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../Loader/Loader';
import './Projects.css';

function ArrowIcon({ dir }) {
  // Flecha simple izquierda/derecha.
  const d =
    dir === 'left'
      ? 'M13 5 L6 12 L13 19 M6 12 H19'
      : 'M11 5 L18 12 L11 19 M18 12 H5';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Projects({
  title = 'Where Sound Becomes an Experience',
  description = 'Each project is a bespoke composition of silence and design — acoustic environments crafted for the world’s most distinguished spaces, where every surface is as refined to the ear as it is to the eye.',
  ctaLabel = 'Peruse our portfolio',
  ctaHref = 'https://indigoff.com/proyects/',
}) {
  const { projects, loading, error } = useProjects({ perPage: 12 });
  const swiperRef = useRef(null);

  return (
    <section className="projects">
      <div className="projects__head projects__inner">
        <h2 className="projects__title">{title}</h2>
        <p className="projects__desc">{description}</p>
      </div>

      {loading ? (
        <Loader text="Cargando proyectos…" />
      ) : error ? (
        <p className="projects__error projects__inner">
          No se pudieron cargar los proyectos: {error}
        </p>
      ) : (
        <>
          <Swiper
            className="projects__swiper"
            onSwiper={(s) => (swiperRef.current = s)}
            loop={projects.length > 2}
            speed={400}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={20}
          >
            {projects.map((project) => {
              const img = getFeaturedImage(project);
              const name = project.title?.rendered || '';
              return (
                <SwiperSlide key={project.id} className="projects__slide">
                  <a
                    className="project-card"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="project-card__media">
                      {img && <img src={img} alt={name} loading="lazy" />}
                    </div>
                    <span
                      className="project-card__title"
                      dangerouslySetInnerHTML={{ __html: name }}
                    />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="projects__footer projects__inner">
            <a className="projects__cta" href={ctaHref} target="_blank" rel="noreferrer">
              {ctaLabel}
            </a>
            <div className="projects__nav">
              <button
                type="button"
                className="projects__arrow"
                aria-label="Anterior"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ArrowIcon dir="left" />
              </button>
              <button
                type="button"
                className="projects__arrow"
                aria-label="Siguiente"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ArrowIcon dir="right" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Projects;
