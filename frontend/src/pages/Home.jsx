import React from 'react';
import Header from "../components/Header";
import Connect from '../components/Connect';

import AboutSection from '../components/Home/About';
import HeroSection from '../components/Home/HeroSection';
import LifeGraph from '../components/Home/LifeGraph';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <LifeGraph />
      <Connect />
    </main>
  );
};

export default HomePage;
