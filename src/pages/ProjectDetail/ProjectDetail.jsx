import { useParams, Link } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import './ProjectDetail.css';

function ProjectDetail() {
  const { slug } = useParams();
  const { project, gallery, loading, error } = useProject(slug);

  if (loading) return <Loader text="Cargando proyecto…" />;

  if (error) {
    return (
      <div className="pd pd__inner">
        <p className="pd__error">No se pudo cargar el proyecto: {error}</p>
        <Link to="/projects" className="pd__back">
          ← Portfolio
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pd pd__inner">
        <p>No se encontró el proyecto.</p>
        <Link to="/projects" className="pd__back">
          ← Portfolio
        </Link>
      </div>
    );
  }

  const name = project.title?.rendered || '';
  const featured = getFeaturedImage(project);

  // Galería: imágenes adjuntas; si no hay, se usa la imagen destacada.
  const images =
    gallery.length > 0
      ? gallery.map((m) => ({
          src: m.source_url,
          alt: m.alt_text || name,
          w: m.media_details?.width,
          h: m.media_details?.height,
        }))
      : featured
        ? [{ src: featured, alt: name }]
        : [];

  return (
    <article className="pd">
      <div className="pd__inner">
        <Link to="/projects" className="pd__back">
          ← Portfolio
        </Link>
        <h1
          className="pd__title"
          dangerouslySetInnerHTML={{ __html: name }}
        />
      </div>

      {images.length > 0 && (
        <div className="pd__inner">
          <div className="pd__gallery">
            {images.map((img, i) => (
              <figure className="pd__figure" key={i}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="pd__inner pd__foot">
        <Link to="/projects" className="pd__back">
          ← Back to portfolio
        </Link>
      </div>
    </article>
  );
}

export default ProjectDetail;
