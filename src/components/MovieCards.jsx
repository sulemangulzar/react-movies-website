import React, { useEffect, useState, useMemo } from "react";
import { getTrendingMovies } from "../services/api";
import { Link } from "react-router-dom";

function MovieCards() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingMovies();
      setMovies(data || []);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  // Randomly select 8 movies when data is loaded
  const randomMovies = useMemo(() => {
    return [...movies].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [movies]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl">
        Loading Recommended Movies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 font-poppins text-white py-12 px-4 sm:px-6">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-10 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
        Recommended Movies
      </h1>

      {/* ✅ Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-10 max-w-7xl mx-auto">
        {randomMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-800 bg-gray-900/40 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>

            <div className="absolute bottom-0 p-5">
              <h2 className="text-lg font-semibold text-yellow-400 mb-1 truncate">
                {movie.title}
              </h2>
              <p className="text-sm text-gray-300">
                📅 {movie.release_date?.slice(0, 4) || "N/A"} • ⭐{" "}
                {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
              <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                {movie.overview || "No summary available."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ See All Button */}
      <div className="flex justify-center mt-10">
        <Link to="/movies">
          <button className="text-black font-semibold py-3 px-8 rounded-xl bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 hover:scale-105 transition-transform duration-300">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCards;
