import React, { useState } from "react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close menu after click
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-linear-to-b from-gray-950 to-gray-900 text-white px-4 py-4 flex items-center justify-between z-50">
      <h1 className="text-2xl sm:text-3xl font-semibold">CineScope</h1>

      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-linear-to-b from-gray-950 to-gray-900 md:bg-transparent flex flex-col md:flex-row items-center gap-6 md:gap-12 font-normal transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto h-[300px] pt-12"
            : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
        }`}
      >
        <li className="cursor-pointer colorful-btn" onClick={() => scrollToSection("home")}>Home</li>
        <li className="cursor-pointer colorful-btn" onClick={() => scrollToSection("about")}>About</li>
        <li className="cursor-pointer colorful-btn" onClick={() => scrollToSection("movies")}>Movies</li>
        <li className="cursor-pointer colorful-btn" onClick={() => scrollToSection("contact")}>Contact</li>
      </ul>
    </nav>
  );
}

export default NavBar;
