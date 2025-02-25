import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Відновлюємо запит і список при поверненні
    if (location.state?.query && location.state?.movies) {
      setQuery(location.state.query);
      setMovies(location.state.movies);
    }
  }, [location]);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await api.get('/search/movie', {
        params: { query, include_adult: false, language: 'en-US', page: 1 },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList
        movies={movies}
        onBeforeNavigate={() => ({ query, movies })} // Залишаємо лише query і movies
      />
    </div>
  );
}

export default MoviesPage;