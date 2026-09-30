import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductCategory } from '../../hooks/useProductCategory';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import './ProductCategory.css';

function ProductCategory({ slug: slugProp }) {
  const params = useParams();
  const categorySlug = slugProp || params.categorySlug;
  const { category, collection, products, loading, loadingMore, hasMore, loadMore, error } =
    useProductCategory(categorySlug);

  // Scroll infinito: al ver el sentinel, carga la siguiente página.
  const sentinelRef = useRef(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '600px 0px' } // precarga antes de llegar al final
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadMore]);

  if (loading) return <Loader text="Loading products…" />;

  const name = category?.name || '';
  const collLabel = collection?.label || 'Indigoff';
  const collRoute = collection?.route || '/';
  // Si la categoría es la raíz de su colección, esta página ES la colección:
  // el "volver" apunta al inicio en vez de a sí misma.
  const isRoot = category && !category.parent;
  const backTo = isRoot ? '/' : collRoute;
  const backLabel = isRoot ? 'Home' : collLabel;

  return (
    <section className="pcat">
      <div className="pcat__inner">
        <Link to={backTo} className="pcat__back">
          ← {backLabel}
        </Link>

        <header className="pcat__head">
          {!isRoot && <span className="pcat__eyebrow">{collLabel}</span>}
          <h1
            className="pcat__title"
            dangerouslySetInnerHTML={{ __html: isRoot ? collLabel : name || 'Productos' }}
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

        {/* Sentinel + indicador de carga para el scroll infinito */}
        {hasMore && <div ref={sentinelRef} className="pcat__sentinel" aria-hidden="true" />}
        {loadingMore && (
          <div className="pcat__more" role="status" aria-live="polite">
            <span className="pcat__more-spinner" />
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductCategory;
