import { useParams, Link } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import { getFeaturedImage } from '../../services/wordpressApi';
import Loader from '../../components/Loader/Loader';
import './PostDetail.css';

function PostDetail() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);

  if (loading) return <Loader text="Cargando publicación…" />;

  if (error) {
    return <p className="post-detail__error">Error: {error}</p>;
  }

  if (!post) {
    return (
      <div className="post-detail__missing">
        <p>No se encontró la publicación.</p>
        <Link to="/">← Volver al inicio</Link>
      </div>
    );
  }

  const image = getFeaturedImage(post);
  const date = new Date(post.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="post-detail">
      <Link to="/" className="post-detail__back">
        ← Volver
      </Link>

      <h1
        className="post-detail__title"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <time className="post-detail__date">{date}</time>

      {image && (
        <img
          className="post-detail__image"
          src={image}
          alt={post.title.rendered}
        />
      )}

      <div
        className="post-detail__content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}

export default PostDetail;
