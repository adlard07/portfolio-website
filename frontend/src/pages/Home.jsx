import React, { useEffect, useState } from 'react';
import BgImage from '../assets/grassfields.gif';
import About from '../components/About';
import ProjectCards from '../components/ProjectCards';
import Connect from '../components/Connect';
import Memes from '../components/Memes';
import Skills from '../components/Skills';
import LifeAnalyser from '../components/LifeGraph';
import { ChevronDown, Code, Database, Brain, Share2, Sparkles } from 'lucide-react';

const Section = ({ children, className = '' }) => (
    <div className={`bg-black bg-opacity-80 py-24 px-6 md:px-12 ${className}`}>
        {children}
    </div>
);

const SectionTitle = ({ children, icon: Icon }) => (
    <div className="text-center mb-16">
        {Icon && <Icon className="w-12 h-12 mx-auto mb-4 text-[#4A5D46]" />}
        <h2 className="text-4xl font-bold relative inline-block">
            <span className="relative inline-block">
                {children}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#4A5D46]"></div>
            </span>
        </h2>
    </div>
);

const TypewriterEffect = ({ texts }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const text = texts[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < text.length) {
                    setCurrentText(text.slice(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (currentText.length === 0) {
                    setIsDeleting(false);
                    setCurrentIndex((currentIndex + 1) % texts.length);
                } else {
                    setCurrentText(text.slice(0, currentText.length - 1));
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, currentIndex, isDeleting, texts]);

    return <span className="text-[#c26400]">{currentText}</span>;
};

const HomePage = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress((currentScroll / totalScroll) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContent = () => {
        document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-white">
            {/* Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-[#4A5D46] z-50 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Main Container with blurred background */}
            <div className="relative min-h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed backdrop-custom-[4px]"
                    style={{ backgroundImage: `url(${BgImage})` }}
                ></div>

                {/* Hero Section */}
                <div className="relative h-screen flex flex-col items-start justify-center px-8 md:px-16">
                    {/* Overlay only for the hero section */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-20"></div>

                    <div className="max-w-2xl relative z-30">
                        <div className="text-white font-bebas font-bold space-y-4">
                            <h1 className="text-6xl md:text-9xl tracking-tight">
                                Data Scientist
                            </h1>
                            <h2 className="text-4xl md:text-6xl text-gray-300">
                                I <TypewriterEffect texts={[
                                    "find patterns in chaos",
                                    "transform data into insights",
                                    "build intelligent solutions",
                                ]} />
                            </h2>
                            <p className="text-4xl font-normal text-white mt-6">
                                Turning data into actionable insights through machine learning,
                                statistical analysis, and creative problem-solving
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={scrollToContent}
                        className="absolute bottom-12 left-1/2 translate-x-1/2 z-50 animate-bounce group focus:outline-none"
                        aria-label="Scroll to content"
                    >
                        <ChevronDown className="w-10 h-10 text-white/80 group-hover:text-[#4A5D46] transition-colors duration-300" />
                    </button>

                </div>

                {/* Main Content */}
                <main id="content" className="relative">
                    <div className="bg-black border-b border-gray-800 pt-20 pb-20">
                        <About />
                    </div>

                    <div className="bg-black border-b border-gray-800 pt-20 pb-20">
                        <ProjectCards />
                    </div>

                    <Section className="border-b border-gray-800">
                        <SectionTitle icon={Database}>Skills</SectionTitle>
                        <Skills />
                    </Section>

                    <Section className="border-b border-gray-800">
                        <SectionTitle icon={Sparkles}>Life Analysis</SectionTitle>
                        <LifeAnalyser />
                    </Section>

                    <Section className="border-b border-gray-800">
                        <SectionTitle icon={Brain}>Memes</SectionTitle>
                        <Memes />
                    </Section>

                    <Section>
                        <SectionTitle icon={Share2}>Let's Connect</SectionTitle>
                        <Connect />
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default HomePage;