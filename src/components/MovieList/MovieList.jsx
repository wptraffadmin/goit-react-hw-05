import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieList({ movies, onBeforeNavigate }) {
  const location = useLocation();

  const handleNavigate = () => {
    if (onBeforeNavigate) {
      return onBeforeNavigate();
    }
    return {};
  };

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{
              from: location.pathname,
              ...handleNavigate(), // Передаємо лише query і movies, якщо є
            }}
            className={styles.link}
          >
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className={styles.image}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBeforeNavigate: PropTypes.func, // Залишаємо для сумісності, але без скролу
};

export default MovieList;