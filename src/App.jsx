import React from "react";
import MovieCards from "./components/MovieCards";
import NavBar from "./components/NavBar";
import  Home  from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function App() {
  return (
    <div className=" text-black">
      <NavBar />
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="movies"><MovieCards /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}

export default App;
