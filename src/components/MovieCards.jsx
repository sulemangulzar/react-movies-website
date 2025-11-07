import React, { useMemo } from "react";
import "tailwindcss";
import { movies } from "../movies";
import { Link } from "react-router-dom";

function MovieCards() {
  const randomMovies = useMemo(() => {
    return [...movies].sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 font-poppins text-white py-12 px-4 sm:px-6">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-10 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
        Recommended Movies
      </h1>

      {/* ✅ Movie Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 max-w-7xl mx-auto">
        {randomMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-800 bg-gray-900/40 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>

            <div className="absolute bottom-0 p-5">
              <h2 className="text-lg font-semibold text-yellow-400 mb-1">{movie.title}</h2>
              <p className="text-sm text-gray-300">
                📅 {movie.year} • ⭐ {movie.rating}
              </p>
              <p className="text-gray-400 text-sm mt-2 line-clamp-3">{movie.summary}</p>
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
