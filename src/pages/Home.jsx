// HomePage.jsx
import React, { useState } from 'react';
import Header from "../components/Header";
import Connect from '../components/Connect';
import AboutSection from '../components/Home/About';
import HeroSection from '../components/Home/HeroSection';
import ProjectTiles from '../components/Home/ProjectTiles';

const HomePage = () => {
  // Lift the theme state to HomePage so that all children use the same state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the theme between dark and light
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {/* Pass the theme state and toggle function to the HeroSection */}
      <HeroSection isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {/* Pass the theme state to AboutSection (and any other components as needed) */}
      <AboutSection isDarkMode={isDarkMode} />
      <ProjectTiles isDarkMode={isDarkMode} />
      <Connect isDarkMode={isDarkMode} />
    </main>
  );
};

export default HomePage;
