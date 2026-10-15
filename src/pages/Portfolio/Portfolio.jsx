import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import LogoMarquee from '../../components/LogoMarquee/LogoMarquee';
import './Portfolio.css';

function Portfolio() {
  // Todos los proyectos del CPT "proyects" de WordPress.
  const { projects, loading, error } = useProjects({ perPage: 100 });

  return (
    <section className="portfolio">
      {/* --- Cabecera --- */}
      <header className="portfolio__head portfolio__inner">
        <div className="portfolio__head-left">
          <span className="portfolio__eyebrow">Selected environments</span>
          <h1 className="portfolio__title">Spaces composed for quiet</h1>
        </div>
        <p className="portfolio__intro">
          Each project brings together architecture, acoustics, and material
          expression with absolute intent. From hospitality to cultural and
          commercial settings, these installations show how quiet can elevate
          the atmosphere and the experience of a space.
        </p>
      </header>

      {/* Carrusel de logos de clientes (bajo el título y la descripción) */}
      <LogoMarquee title="Chosen by discerning partners" />

      {/* --- Rejilla de proyectos --- */}
      <div className="portfolio__inner portfolio__body">
        {loading ? (
          <Loader text="Loading projects…" />
        ) : error ? (
          <p className="portfolio__error">
            No se pudieron cargar los proyectos: {error}
          </p>
        ) : (
          <div className="portfolio__grid">
            {projects.map((project) => {
              const img = getFeaturedImage(project);
              const name = project.title?.rendered || '';
              return (
                <Link
                  key={project.id}
                  className="proj-card"
                  to={`/projects/${project.slug}`}
                >
                  <div className="proj-card__media">
                    {img && <img src={img} alt={name} loading="lazy" />}
                  </div>
                  <h2
                    className="proj-card__title"
                    dangerouslySetInnerHTML={{ __html: name }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;
