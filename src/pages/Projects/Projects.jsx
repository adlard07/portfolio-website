import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectTiles from "./ProjectTiles";

const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
        <ProjectTiles isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Projects;
