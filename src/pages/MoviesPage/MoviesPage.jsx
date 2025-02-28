import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import api from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryFromUrl);

  useEffect(() => {
    // Відновлюємо стан із location.state, якщо є
    if (location.state?.query && location.state?.movies) {
      setQuery(location.state.query);
      setMovies(location.state.movies);
      setSearchParams({ query: location.state.query }); // Синхронізуємо URL
      return;
    }

    // Виконуємо пошук, якщо є query в URL
    if (!queryFromUrl) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/search/movie', {
          params: { query: queryFromUrl, include_adult: false, language: 'en-US', page: 1 },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Failed to load movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [location.state, queryFromUrl, setSearchParams]); // Залежності: location.state і queryFromUrl

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    // Оновлюємо URL-параметри при новому пошуку
    setSearchParams({ query });
  };

  return (
    <div className={styles.container}>
      
      <h1>Search Movies</h1>
      
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!isLoading && !error && movies.length === 0 && queryFromUrl && (
        <div>No movies found for {queryFromUrl}</div>
      )}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList
          movies={movies}
          onBeforeNavigate={() => ({ query, movies })}
        />
      )}
    </div>
  );
};

export default MoviesPage;