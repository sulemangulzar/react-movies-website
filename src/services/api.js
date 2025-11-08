// /src/services/api.js

const API_KEY = "7c4be8a860ec2da2f413becc749de4aa"; 
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch trending movies (100 total = 5 pages × 20 movies per page)
 */
export const getTrendingMovies = async () => {
  try {
    const totalPages = 30; 
    const requests = [];

    for (let i = 1; i <= totalPages; i++) {
      requests.push(
        fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${i}`).then(res => res.json())
      );
    }

    const responses = await Promise.all(requests);
    const movies = responses.flatMap(r => r.results || []);

    return movies.slice(0, 3000); // just in case any extra are returned
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

/**
 * Search movies by query (returns up to 100 movies)
 */
export const searchMovies = async (query) => {
  try {
    const totalPages = 30; // fetch up to 5 pages for search results too
    const requests = [];

    for (let i = 1; i <= totalPages; i++) {
      requests.push(
        fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${i}`
        ).then(res => res.json())
      );
    }

    const responses = await Promise.all(requests);
    const results = responses.flatMap(r => r.results || []);

    return results.slice(0, 3000);
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
