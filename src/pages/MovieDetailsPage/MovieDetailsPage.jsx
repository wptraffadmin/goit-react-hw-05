import { useEffect, useState, Suspense, useRef } from 'react';
import { useParams, useLocation, useNavigate, Outlet, NavLink } from 'react-router-dom';
import api from '../../api/tmdb';
import styles from './MovieDetailsPage.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const initialPathRef = useRef(null);
  const prevMovieIdRef = useRef(null);

  useEffect(() => {
    if (!initialPathRef.current) {
      initialPathRef.current = location.state?.from || '/movies';
    }

    if (prevMovieIdRef.current === movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await api.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
    prevMovieIdRef.current = movieId;
  }, [movieId, location.state]);

  const handleGoBack = () => {
    const stateToPass = {
      query: location.state?.query || '',
      movies: location.state?.movies || [],
    };
    navigate(initialPathRef.current, { state: stateToPass });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go Back
      </button>
      <h1>{movie.title}</h1>
      <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <div className={styles.linkContainer}>
        <NavLink to="cast" className={styles.link}>Cast</NavLink>
        <NavLink to="reviews" className={styles.link}>Reviews</NavLink>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;