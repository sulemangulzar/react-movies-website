import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/api";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredMovies([]);
      return;
    }

    setLoading(true);
    const results = await searchMovies(value);
    setFilteredMovies(results.slice(0, 8)); // show top 8
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 pt-44 sm:pt-56 text-white font-poppins overflow-hidden px-4">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-4 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
        🎬 Welcome to CineScope
      </h1>
      <p className="text-center text-gray-300 mb-10 text-sm sm:text-base px-2">
        Discover trending movies, spy thrillers, and cinematic masterpieces.
      </p>

      <div className="flex flex-col items-center gap-4 relative">
        <div className="relative w-full sm:w-[600px] md:w-[800px] max-w-[90vw]">
          <input
            type="search"
            placeholder="Enter Movie Name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-14 sm:h-16 outline-none bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-black rounded-3xl px-5 text-base sm:text-lg font-medium placeholder-black"
          />

          {/* Dropdown results */}
          {filteredMovies.length > 0 && (
            <div className="no-scrollbar absolute mt-2 w-full bg-gray-800 rounded-2xl shadow-lg p-3 animate-fade-in overflow-x-auto flex gap-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[160px] bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-52 object-cover"
                  />
                  <p className="text-center text-sm mt-2 px-2">{movie.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {!searchTerm && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {["YouTube", "X", "Instagram", "TikTok", "Discord"].map((platform) => (
              <button
                key={platform}
                className="px-4 sm:px-6 py-2 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-black rounded-xl text-sm sm:text-base font-medium hover:scale-105 transition-transform"
              >
                {platform}
              </button>
            ))}
          </div>
        )}
      </div>

      {!searchTerm && (
        <div className="flex justify-center mt-8">
          <Link to="/movies">
            <button className="border-2 border-white px-6 py-2 rounded-xl hover:scale-105 transition-transform text-sm sm:text-base">
              See All Movies
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Home;
