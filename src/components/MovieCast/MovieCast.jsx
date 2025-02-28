import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/tmdb';
import styles from './MovieCast.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await api.get(`/movie/${movieId}/credits`);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Cast</h2>
      <ul className={styles.list}>
        {cast.slice(0, 5).map(actor => (
          <li key={actor.id} className={styles.item}>
            <img
              src={`${IMG_URL}${actor.profile_path}`}
              alt={actor.name}
              className={styles.image}
            />
            <p>{actor.name}</p>
            <p>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;