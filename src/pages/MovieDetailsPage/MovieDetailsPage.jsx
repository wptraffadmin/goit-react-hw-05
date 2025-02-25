import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Outlet } from 'react-router-dom';
import api from '../../api/tmdb';
import styles from './MovieDetailsPage.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await api.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    const from = location.state?.from || '/movies';
    const query = location.state?.query;
    const movies = location.state?.movies;
    navigate(from, { state: { query, movies } }); // Передаємо лише query і movies
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go back
      </button>
      <h1>{movie.title}</h1>
      <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;