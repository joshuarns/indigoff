import { Link } from 'react-router-dom';
import { getFeaturedImage } from '../../services/wordpressApi';
import './PostCard.css';

// Tarjeta que muestra el resumen de un post.
// Los campos de WordPress (title, excerpt) vienen como HTML renderizado.
function PostCard({ post }) {
  const image = getFeaturedImage(post);

  return (
    <article className="post-card">
      {image && (
        <Link to={`/post/${post.slug}`} className="post-card__image-link">
          <img
            className="post-card__image"
            src={image}
            alt={post.title.rendered}
            loading="lazy"
          />
        </Link>
      )}

      <div className="post-card__body">
        <h2 className="post-card__title">
          <Link
            to={`/post/${post.slug}`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h2>

        <div
          className="post-card__excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <Link to={`/post/${post.slug}`} className="post-card__link">
          Leer más →
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
