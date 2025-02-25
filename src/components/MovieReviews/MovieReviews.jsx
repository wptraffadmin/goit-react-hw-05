import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/tmdb'; // Імпорт api
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await api.get(`/movie/${movieId}/reviews`);
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default MovieReviews;