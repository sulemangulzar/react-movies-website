import React from "react";
import "tailwindcss";

function Contact() {
    return (
        <section className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-950 pt-28 sm:pt-32 text-center text-gray-300 px-4">
  <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg">
    📬 Contact Us
  </h1>
  <p className="max-w-md mx-auto mt-6 text-base sm:text-lg leading-relaxed">
    Have a suggestion or collaboration idea? We'd love to hear from you!
  </p>

  <form className="max-w-lg mx-auto mt-10 space-y-4 sm:space-y-6">
    <input
      type="text"
      placeholder="Your Name"
      className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
    />
    <input
      type="email"
      placeholder="Your Email"
      className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
    />
    <textarea
      rows="5"
      placeholder="Your Message..."
      className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
    ></textarea>
    <button
      type="submit"
      className="w-full py-3 font-semibold text-black bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 rounded-xl hover:scale-105 transition-transform"
    >
      Send Message
    </button>
  </form>

  <div className="mt-10 text-sm sm:text-base">
    <p className="text-gray-500">📧 support@cinescope.com</p>
    <p className="text-gray-500">🌍 Pakistan</p>
  </div>
</section>

    );
}

export default Contact;
