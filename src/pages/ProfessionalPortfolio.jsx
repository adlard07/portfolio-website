import React, { useState } from "react";
import AboutMe from "../components/ProfessionalPortfolio/AboutMe";
import Education from "../components/ProfessionalPortfolio/Education";
import Experience from "../components/ProfessionalPortfolio/Experience";
import Skills from "../components/ProfessionalPortfolio/Skills";
import Projects from "../components/ProfessionalPortfolio/Projects";

import Header from "../components/Header";

export default function ProfessionalPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`min-h-screen pt-24 transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="container mx-auto max-w-6xl">
        <AboutMe isDarkMode={isDarkMode} />
        <Education isDarkMode={isDarkMode} />
        <Experience isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
      </div>
    </main>
  );
}
