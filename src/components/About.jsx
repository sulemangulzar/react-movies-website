import React from "react";
import "tailwindcss";

function About() {
    return (
        <section className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 pt-28 sm:pt-32 text-center text-gray-300 px-4">
  <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text">
    🎥 About CineScope
  </h1>
  <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-relaxed">
    Welcome to <span className="text-yellow-400 font-semibold">CineScope</span> — your gateway to cinema.
  </p>

  <div className="flex flex-col sm:flex-row justify-center mt-10 gap-6">
    {["🎬 Explore Genres", "⭐ Discover Trends", "🎞️ Watch Trailers"].map((text, i) => (
      <div
        key={i}
        className="w-full sm:w-64 h-36 sm:h-40 bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 rounded-2xl p-0.5"
      >
        <div className="w-full h-full bg-gray-950 rounded-2xl flex items-center justify-center text-lg font-semibold text-yellow-400">
          {text}
        </div>
      </div>
    ))}
  </div>
</section>

    );
}

export default About;
