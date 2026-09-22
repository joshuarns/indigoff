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
          <span className="portfolio__eyebrow">Custom Acoustic Solutions</span>
          <h1 className="portfolio__title">Acoustic Design Portfolio</h1>
        </div>
        <p className="portfolio__intro">
          Our projects are built at the intersection of architecture, acoustics,
          and intention. From offices and hospitality spaces to cultural and
          commercial environments, each installation shows how acoustic
          solutions can shape atmosphere, elevate experience, and support the
          way spaces are truly used.
        </p>
      </header>

      {/* Carrusel de logos de clientes (bajo el título y la descripción) */}
      <LogoMarquee title="Trusted by leading brands" />

      {/* --- Rejilla de proyectos --- */}
      <div className="portfolio__inner portfolio__body">
        {loading ? (
          <Loader text="Cargando proyectos…" />
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
