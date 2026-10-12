import { DOWNLOAD_GROUPS } from './downloadsData';
import './Downloads.css';

// Página de descargas. La información viene del sitio anterior
// (cms.indigoff.com/downloads/) pero adaptada a nuestro lenguaje de diseño:
// encabezado con eyebrow + título + descripción y grupos con filas de pills.
function Downloads() {
  return (
    <section className="downloads">
      {/* --- Encabezado --- */}
      <header className="downloads__head downloads__inner">
        <div className="downloads__head-left">
          <span className="downloads__eyebrow">Resources</span>
          <h1 className="downloads__title">Downloads</h1>
        </div>
        <p className="downloads__intro">
          Specification sheets and 3D models for our acoustic systems. Download
          technical data (PDF) and ready-to-use 3D files to bring Indigoff into
          your drawings and renders.
        </p>
      </header>

      {/* --- Grupos --- */}
      <div className="downloads__inner downloads__body">
        <div className="downloads__grid">
          {DOWNLOAD_GROUPS.map((group) => (
            <div key={group.title} className="dl-group">
              <h2 className="dl-group__title">{group.title}</h2>
              <ul className="dl-group__list">
                {group.rows.map((row) => (
                  <li key={row.name} className="dl-row">
                    <span className="dl-row__name">{row.name}</span>
                    <span className="dl-row__files">
                      {row.pdf && (
                        <a
                          className="dl-pill"
                          href={row.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          PDF
                        </a>
                      )}
                      {row.model && (
                        <a
                          className="dl-pill"
                          href={row.model}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          3D
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Downloads;
