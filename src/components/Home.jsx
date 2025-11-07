import React, { useState, useMemo } from "react";
import { movies } from "../movies";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredMovies([]);
    } else {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(results);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 pt-44 sm:pt-56 text-white font-poppins overflow-hidden px-4">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-4 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
        🎬 Welcome to CineScope
      </h1>
      <p className="text-center text-gray-300 mb-10 text-sm sm:text-base px-2">
        Discover trending movies, spy thrillers, and cinematic masterpieces.
      </p>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full sm:w-[600px] md:w-[800px] max-w-[90vw]">
          <input
            type="search"
            placeholder="Enter Movie Name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-14 sm:h-16 outline-none bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-black rounded-3xl px-5 text-base sm:text-lg font-medium placeholder-black"
          />

          {/* 🔽 Animated Dropdown */}
        </div>

        {/* 🧭 Social Buttons (only when not searching) */}
        {!searchTerm && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {["YouTube", "X", "Instagram", "TikTok", "Discord"].map(
              (platform) => (
                <button
                  key={platform}
                  className="px-4 sm:px-6 py-2 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-black rounded-xl text-sm sm:text-base font-medium hover:scale-105 transition-transform"
                >
                  {platform}
                </button>
              )
            )}
          </div>
        )}
      </div>

{/* 🎞 Horizontal Movie Cards */}
{filteredMovies.length > 0 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1 }}
    className="mt-10 overflow-x-auto whitespace-nowrap px-2 no-scrollbar"
  >
    <div className="flex gap-5 pb-4">
      {filteredMovies.map((movie) => (
        <motion.div
          key={movie.id}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 rounded-2xl shadow-lg min-w-[180px] sm:min-w-[220px] p-3"
        >
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-48 object-cover rounded-xl mb-2"
          />
          <h3 className="font-semibold text-sm sm:text-base truncate">{movie.title}</h3>
          <p className="text-gray-400 text-xs mt-1">{movie.genre || "Unknown Genre"}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
      )}

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
