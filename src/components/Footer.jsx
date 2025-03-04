import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`p-4 text-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} border-t-2 p-6`}>
      <p>
        Built with excessive amounts of caffeine, Spotify, Discord and questionable life choices
      </p>
      <p className="mt-2 text-sm">
        © {new Date().getFullYear()} - Code that somehow works
      </p>
    </footer>
  );
};

export default Footer;