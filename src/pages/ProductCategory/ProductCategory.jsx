import { useParams, Link } from 'react-router-dom';
import { useProductCategory } from '../../hooks/useProductCategory';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import './ProductCategory.css';

function ProductCategory() {
  const { categorySlug } = useParams();
  const { category, products, loading, error } = useProductCategory(categorySlug);

  if (loading) return <Loader text="Cargando productos…" />;

  const name = category?.name || '';

  return (
    <section className="pcat">
      <div className="pcat__inner">
        <Link to="/indigoff-air" className="pcat__back">
          ← Indigoff Air
        </Link>

        <header className="pcat__head">
          <span className="pcat__eyebrow">Indigoff Air</span>
          <h1
            className="pcat__title"
            dangerouslySetInnerHTML={{ __html: name || 'Productos' }}
          />
          {category?.description && (
            <p className="pcat__desc">{category.description}</p>
          )}
        </header>
      </div>

      <div className="pcat__inner">
        {error ? (
          <p className="pcat__error">
            No se pudieron cargar los productos: {error}
          </p>
        ) : !category ? (
          <p className="pcat__empty">No se encontró la categoría.</p>
        ) : products.length === 0 ? (
          <p className="pcat__empty">No hay productos en esta categoría.</p>
        ) : (
          <div className="pcat__grid">
            {products.map((product) => {
              const img = getFeaturedImage(product);
              const pname = product.title?.rendered || '';
              return (
                <article className="prod-card" key={product.id}>
                  <div className="prod-card__media">
                    {img && <img src={img} alt={pname} loading="lazy" />}
                  </div>
                  <h2
                    className="prod-card__title"
                    dangerouslySetInnerHTML={{ __html: pname }}
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductCategory;
