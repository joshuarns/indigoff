import { useParams, Link } from 'react-router-dom';
import { useProductCategory } from '../../hooks/useProductCategory';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import './ProductCategory.css';

function ProductCategory() {
  const { categorySlug } = useParams();
  const { category, collection, products, loading, error } =
    useProductCategory(categorySlug);

  if (loading) return <Loader text="Cargando productos…" />;

  const name = category?.name || '';
  const collLabel = collection?.label || 'Indigoff';
  const collRoute = collection?.route || '/';

  return (
    <section className="pcat">
      <div className="pcat__inner">
        <Link to={collRoute} className="pcat__back">
          ← {collLabel}
        </Link>

        <header className="pcat__head">
          <span className="pcat__eyebrow">{collLabel}</span>
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
                <Link
                  className="prod-card"
                  key={product.id}
                  to={`/producto/${product.slug}`}
                >
                  <div className="prod-card__media">
                    {img && <img src={img} alt={pname} loading="lazy" />}
                  </div>
                  <h2
                    className="prod-card__title"
                    dangerouslySetInnerHTML={{ __html: pname }}
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

export default ProductCategory;
