import React from 'react';
import BgImage from '../assets/bg-image.jpg';
import About from '../components/About';
import ProjectCards from '../components/ProjectCards';
import Connect from '../components/Connect';
import Memes from '../components/Memes';
import GithubActivity from '../components/GithubActivity';
import Skills from '../components/Skills';
import LifeAnalyser from '../components/LifeGraph';
import { ChevronDown } from 'lucide-react';

const Section = ({ children, className = '' }) => (
    <div className={`py-24 px-6 lg:px-20 bg-black ${className}`}>
        {children}
    </div>
);

const SectionTitle = ({ children }) => (
    <h2 className="text-4xl font-bold text-center mb-16 relative">
        <span className="relative inline-block">
            {children}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#4A5D46]"></div>
        </span>
    </h2>
);

const HomePage = () => {
    const scrollToContent = () => {
        const contentSection = document.getElementById('content');
        contentSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <div
                className="relative h-screen flex items-center justify-center text-center"
                style={{
                    backgroundImage: `url(${BgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl px-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white drop-shadow-lg">
                            Digital Nomad
                        </span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        Transforming Data into Intelligent Solutions
                    </p>
                    
                    {/* Scroll Indicator */}
                    <button 
                        onClick={scrollToContent}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
                        aria-label="Scroll to content"
                    >
                        <ChevronDown className="w-8 h-8 text-white/80 hover:text-[#4A5D46] transition-colors" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main id="content" className="relative">
                {/* About Section */}
                <Section className="border-b border-gray-800">
                    <SectionTitle>About Me</SectionTitle>
                    <About />
                </Section>

                {/* Projects Section */}
                <Section className="border-b border-gray-800">
                    <SectionTitle>Projects</SectionTitle>
                    <ProjectCards />
                </Section>

                {/* GitHub Activity Section */}
                <Section className="border-b border-gray-800">
                    <SectionTitle>GitHub Activity</SectionTitle>
                    <div className="flex justify-center items-center">
                        <GithubActivity username="adlard07" />
                    </div>
                </Section>

                {/* Skills Section */}
                <Section className="border-b border-gray-800">
                    <SectionTitle>Skills</SectionTitle>
                    <Skills />
                </Section>

                {/* Life Analyser Section */}
                <Section className="border-b border-gray-800">
                    <SectionTitle>Life Analysis</SectionTitle>
                    <LifeAnalyser />
                </Section>

                {/* Memes Section */}
                <Section className="border-b border-gray-800">
                    <SectionTitle>Memes</SectionTitle>
                    <Memes />
                </Section>

                {/* Connect Section */}
                <Section>
                    <SectionTitle>Connect</SectionTitle>
                    <Connect />
                </Section>
            </main>
        </div>
    );
};

export default HomePage;