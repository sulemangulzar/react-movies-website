import React from "react";
import "tailwindcss";

function Footer() {
    return (
        <footer className="bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 py-0.5 px-0.5">
  <div className="bg-gray-950 text-gray-300 py-6 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between rounded-t-xl text-center sm:text-left">
    <h2 className="text-lg sm:text-xl font-semibold bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text">
      🎬 CineScope
    </h2>
    <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-0">
      © {new Date().getFullYear()} CineScope. All rights reserved.
    </p>
    <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-0">
      <a href="#" className="hover:text-yellow-400">YouTube</a>
      <a href="#" className="hover:text-orange-400">Instagram</a>
      <a href="#" className="hover:text-red-500">Twitter</a>
    </div>
  </div>
</footer>

    );
}

export default Footer;
