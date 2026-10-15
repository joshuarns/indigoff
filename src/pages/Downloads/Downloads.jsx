import { Link } from 'react-router-dom';
import { useDownloads } from '../../hooks/useDownloads';
import Loader from '../../components/Loader/Loader';
import './Downloads.css';

// Página de descargas: consume TODOS los productos del CMS y muestra los que
// tienen archivos de descarga (campos ACF), agrupados por colección.
function Downloads() {
  const { groups, loading, error } = useDownloads();

  return (
    <section className="downloads">
      {/* --- Encabezado --- */}
      <header className="downloads__head downloads__inner">
        <div className="downloads__head-left">
          <span className="downloads__eyebrow">Specification library</span>
          <h1 className="downloads__title">Technical resources</h1>
        </div>
        <p className="downloads__intro">
          Specification sheets and 3D models for Indigoff collections. Access
          the technical information and design files needed to integrate each
          piece seamlessly into your project.
        </p>
      </header>

      {/* --- Grupos --- */}
      <div className="downloads__inner downloads__body">
        {loading ? (
          <Loader text="Loading downloads…" />
        ) : error ? (
          <p className="downloads__error">Downloads could not be loaded.</p>
        ) : groups.length === 0 ? (
          <p className="downloads__error">No downloads available yet.</p>
        ) : (
          <div className="downloads__grid">
            {groups.map((group) => (
              <div key={group.slug} className="dl-group">
                <h2 className="dl-group__title">{group.title}</h2>
                <ul className="dl-group__list">
                  {group.rows.map((row) => (
                    <li key={row.id} className="dl-row">
                      <Link className="dl-row__name" to={`/producto/${row.slug}`}>
                        {row.name}
                      </Link>
                      <span className="dl-row__files">
                        {row.files.map((file) => (
                          <a
                            key={file.ext}
                            className="dl-pill"
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.ext}
                          </a>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Downloads;
