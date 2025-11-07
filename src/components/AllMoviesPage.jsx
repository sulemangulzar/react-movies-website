import React, { useState } from "react";
import { movies } from "../movies";
import "tailwindcss";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";

function AllMoviesPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // --- derive genres/years dynamically ---
  const genres = ["All", ...new Set(movies.map((m) => m.genre))];
  const years = ["All", ...new Set(movies.map((m) => m.year))];
  const ratings = ["All", "9+", "8+", "7+", "6+"];

  // --- filtering logic ---
  const filteredMovies = movies.filter((movie) => {
    const byGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    const byYear = selectedYear === "All" || movie.year === Number(selectedYear);
    const byRating =
      selectedRating === "All" ||
      (selectedRating === "9+" && Number(movie.rating) >= 9) ||
      (selectedRating === "8+" && Number(movie.rating) >= 8) ||
      (selectedRating === "7+" && Number(movie.rating) >= 7) ||
      (selectedRating === "6+" && Number(movie.rating) >= 6);

    return byGenre && byYear && byRating;
  });

  return (
    <>
      <section className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 text-white py-24 px-4 sm:px-8 font-poppins">
        {/* --- Top Bar --- */}
        <div className="w-full h-16 bg-linear-to-b from-gray-950 to-gray-900 text-white px-6 sm:px-16 py-4 flex items-center justify-between fixed top-0 z-50 shadow-md">
          <h1 className="text-2xl sm:text-3xl font-semibold">🎬 CineScope</h1>
          <Link to="/">
            <button className="gradient-btn bg-linear-to-r from-orange-500 to-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              Home
            </button>
          </Link>
        </div>

        {/* --- Header --- */}
        <h1 className="text-4xl font-bold text-center mt-6 mb-10 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
          All Movies
        </h1>

        {/* --- Filter Button (Mobile) --- */}
        <div className="flex justify-center mb-6 sm:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-linear-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:scale-105 transition-all"
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* --- Filter Bar --- */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-10 transition-all duration-300 ${
            showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 sm:opacity-100 sm:max-h-full"
          } overflow-hidden sm:overflow-visible`}
        >
          {[ 
            { label: "Genre", value: selectedGenre, setter: setSelectedGenre, options: genres },
            { label: "Year", value: selectedYear, setter: setSelectedYear, options: years },
            { label: "Rating", value: selectedRating, setter: setSelectedRating, options: ratings },
          ].map(({ label, value, setter, options }) => (
            <div key={label} className="flex flex-col items-center">
              <label className="text-sm text-gray-400 mb-1">{label}</label>
              <select
                className="no-scrollbar bg-gray-900 border-2 border-transparent rounded-xl px-4 py-2 text-sm cursor-pointer focus:outline-none focus:border-orange-400 hover:border-orange-400 transition-all duration-300 shadow-md"
                value={value}
                onChange={(e) => setter(e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* --- Movies Grid --- */}
        {filteredMovies.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800/80 border border-gray-700 rounded-xl shadow-lg hover:scale-105 hover:border-orange-400 transition-transform duration-300 overflow-hidden"
              >
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-yellow-400 font-semibold text-sm truncate">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    ⭐ {movie.rating} • {movie.year}
                  </p>
                  <p className="text-gray-500 text-xs italic">{movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-12 text-lg">
            No movies match your filters 😢
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}

export default AllMoviesPage;
