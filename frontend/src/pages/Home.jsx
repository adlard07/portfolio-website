import React, { useEffect, useState } from 'react';
import SelfImage from '../assets/self/sheesh.jpg';
import AltImage from '../assets/self/zenitsu-who.jpg';
import About from '../components/About';
import ProjectCards from '../components/ProjectCards';
import Connect from '../components/Connect';
import Memes from '../components/Memes';
import Skills from '../components/Skills';
import LifeAnalyser from '../components/LifeGraph';
import { ChevronDown, SwitchCamera, Database, Brain, Share2, Sparkles, Menu } from 'lucide-react';
import Navbar from '../components/Navbar';


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
    const [isFirstImage, setIsFirstImage] = useState(true);

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

    const toggleImage = () => {
        setIsFirstImage(!isFirstImage);
    };

    return (
        <div className="min-h-screen bg-orange-100">
            {/* Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-[#4A5D46] z-50 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />


            {/* Main Container with blurred background */}
            <div className="relative min-h-screen flex flex-col items-center justify-center pt-16">
                <div className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 w-full max-w-7xl gap-8 lg:gap-16">
                    {/* Hero Section */}
                    <div className="w-full lg:max-w-2xl space-y-6 text-center lg:text-left">

                        {/* Navbar */}
                        <Navbar />
                        
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bebas font-bold tracking-tight text-gray-700 whitespace-nowrap">
                            Hi, I'm Adlard 👋
                        </h1>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700">
                            I <TypewriterEffect texts={[
                                "find patterns in chaos",
                                "transform data into insights",
                                "build intelligent solutions",
                            ]} />
                        </h2>
                        <p className="text-xl sm:text-2xl font-normal text-gray-600">
                            Turning data into actionable insights through machine learning,
                            statistical analysis, and creative problem-solving.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="relative w-full sm:w-[24rem] md:w-[28rem] lg:w-[30.8rem] h-[28rem] sm:h-[32rem] md:h-[34rem] lg:h-[37.4rem] flex-shrink-0 group">
                        <img
                            src={isFirstImage ? SelfImage : AltImage}
                            alt="Your Picture"
                            className="absolute inset-0 object-cover w-full h-full rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:-rotate-2"
                        />
                        <button
                            onClick={toggleImage}
                            className="absolute bottom-4 right-4 bg-gray-800/70 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
                            aria-label="Switch Image"
                        >
                            <SwitchCamera className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Scroll Button */}
                <button
                    onClick={scrollToContent}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 animate-bounce group focus:outline-none"
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

    );
};

export default HomePage;