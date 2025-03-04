import React, { useState } from "react"; 
import Navbar from "../components/Header";
import MemeTiles from "../components/AboutMe/MemeTiles";
import AboutMe from "../components/AboutMe/About";
import BookTiles from "../components/AboutMe/BookTile";

const About = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
            <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <div className="py-24">
                <AboutMe isDarkMode={isDarkMode} />
                <MemeTiles isDarkMode={isDarkMode} />
                <BookTiles isDarkMode={isDarkMode} />
            </div>
        </div>
    );
};

export default About;
