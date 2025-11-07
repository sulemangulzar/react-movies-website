import React, { useState, useEffect } from "react";
import { getTrendingMovies, searchMovies } from "../services/api";
import { Link } from "react-router-dom";
import { Filter, Search, X } from "lucide-react";
import Footer from "./Footer";

function AllMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesToShow, setMoviesToShow] = useState(16);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch trending movies initially
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getTrendingMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery.trim() === "") {
      const fetchTrending = async () => {
        setIsSearching(true);
        const data = await getTrendingMovies();
        setMovies(data);
        setIsSearching(false);
      };
      fetchTrending();
      return;
    }

    const delaySearch = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setIsSearching(false);
      setMoviesToShow(16); // reset pagination on new search
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Map genre IDs to names
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  // Extract unique genres from movies
  const genreNames = ["All", ...new Set(movies.flatMap(m =>
    (m.genre_ids || []).map(id => genreMap[id]).filter(Boolean)
  ))].sort();

  // Extract unique years from movies
  const years = [
    "All",
    ...new Set(
      movies
        .map((m) => new Date(m.release_date).getFullYear())
        .filter((year) => !isNaN(year))
    ),
  ].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : b - a));

  const ratings = ["All", "9+", "8+", "7+", "6+", "5+"];

  // Filter movies
  const filteredMovies = movies.filter((movie) => {
    const movieGenres = (movie.genre_ids || []).map(id => genreMap[id]);
    const byGenre = selectedGenre === "All" || movieGenres.includes(selectedGenre);

    const movieYear = new Date(movie.release_date).getFullYear();
    const byYear = selectedYear === "All" || movieYear === Number(selectedYear);

    const byRating = selectedRating === "All" ||
      Number(movie.vote_average) >= Number(selectedRating.replace("+", ""));

    return byGenre && byYear && byRating;
  });

  // Display movies with pagination
  const displayedMovies = filteredMovies.slice(0, moviesToShow);
  const hasMoreMovies = displayedMovies.length < filteredMovies.length;

  // Reset pagination when filters change (exclude searchQuery)
  useEffect(() => {
    setMoviesToShow(16);
  }, [selectedGenre, selectedYear, selectedRating]);

  // Load more movies
  const handleLoadMore = () => {
    setMoviesToShow(prev => Math.min(prev + 16, filteredMovies.length));
  };

  // Clear filters & search
  const clearFilters = () => {
    setSelectedGenre("All");
    setSelectedYear("All");
    setSelectedRating("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedGenre !== "All" ||
    selectedYear !== "All" ||
    selectedRating !== "All" ||
    searchQuery !== "";

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-24 px-4 sm:px-8">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 sm:px-16 py-4 flex items-center justify-between z-50 shadow-md">
          <h1 className="text-2xl sm:text-3xl font-semibold">🎬 CineScope</h1>
          <Link to="/">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              Home
            </button>
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mt-8 mb-10 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
          All Movies
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex justify-center mb-6 sm:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:scale-105 transition-all"
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-4 mb-6 transition-all duration-300 ${showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 sm:opacity-100 sm:max-h-full"} overflow-hidden sm:overflow-visible`}>
          {[
            { label: "Genre", value: selectedGenre, setter: setSelectedGenre, options: genreNames },
            { label: "Year", value: selectedYear, setter: setSelectedYear, options: years },
            { label: "Rating", value: selectedRating, setter: setSelectedRating, options: ratings }
          ].map(({ label, value, setter, options }) => (
            <div key={label} className="flex flex-col items-center">
              <label className="text-sm text-gray-400 mb-1">{label}</label>
              <select
                className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-sm cursor-pointer focus:outline-none focus:border-orange-400 hover:border-orange-400 transition-all duration-300 shadow-md"
                value={value}
                onChange={(e) => setter(e.target.value)}
              >
                {options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-center mb-6">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
            >
              <X size={16} />
              Clear All Filters
            </button>
          </div>
        )}

        {/* Results Count */}
        {!loading && !isSearching && (
          <p className="text-center text-gray-400 mb-6">
            Showing {displayedMovies.length} of {filteredMovies.length} movies
          </p>
        )}

        {/* Loading State */}
        {(loading || isSearching) && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !isSearching && displayedMovies.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 max-w-7xl mx-auto">
              {displayedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800/80 border border-gray-700 rounded-xl shadow-lg hover:scale-105 hover:border-orange-400 transition-transform duration-300 overflow-hidden cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=No+Image"; }}
                  />
                  <div className="p-3">
                    <h3 className="text-yellow-400 font-semibold text-sm truncate">
                      {movie.title || movie.original_title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      ⭐ {movie.vote_average?.toFixed(1)} • {new Date(movie.release_date).getFullYear()}
                    </p>
                    <p className="text-gray-500 text-xs italic">
                      {(movie.genre_ids || [])[0] ? genreMap[(movie.genre_ids || [])[0]] : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            {hasMoreMovies && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  See More Movies
                </button>
              </div>
            )}
          </>
        ) : !loading && !isSearching ? (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg mb-4">No movies match your filters 😢</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : null}
      </section>

      <Footer />
    </>
  );
}

export default AllMoviesPage;
