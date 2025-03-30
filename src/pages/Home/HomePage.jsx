import React, { useState } from "react";
import Header from "../../components/Header";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import ProjectTiles from "./ProjectTiles";
import Footer from "../../components/Footer";

const HomePage = () => {
  // Lift the theme state to HomePage so that all children use the same state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the theme between dark and light
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <AboutSection isDarkMode={isDarkMode} />
        <ProjectTiles isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default HomePage;
