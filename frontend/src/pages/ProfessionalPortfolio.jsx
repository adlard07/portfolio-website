import React from "react";
import AboutMe from "../components/ProfessionalPortfolio/AboutMe";
import Education from "../components/ProfessionalPortfolio/Education";
import Experience from "../components/ProfessionalPortfolio/Experience";
import Skills from "../components/ProfessionalPortfolio/Skills";
import Projects from "../components/ProfessionalPortfolio/Projects";

import Header from "../components/Header";
import Connect from '../components/Connect';

export default function ProfessionalPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
        <Header/>
      <div className="container mx-auto max-w-6xl">
        <AboutMe />
        <Education />
        <Experience />
        <Skills />
        <Projects />
      </div>
        <Connect/>
    </main>
  );
}
