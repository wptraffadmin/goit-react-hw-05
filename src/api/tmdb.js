import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjg5Y2YzZjZkOWRiOTgwYWVhYzdhNzUwOWRhOTNlMSIsIm5iZiI6MTc0MDMzMzA5MC43MjgsInN1YiI6IjY3YmI2MDIyYmY1MjFmMTkwZjBhNzQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OwUHiv_6upVZjuSyzVDr5GF-p5K_th6gMF64YC4q2P8'; // Замініть на ваш токен
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default api;