import React, { useState, useEffect } from "react";

const TypewriterText = () => {
  const phrases = [
    "PROBABLY THE BEST",
    "DEFINITELY AVERAGE",
    "SLIGHTLY ABOVE MEDIOCRE",
    "NOT THE WORST",
    "ACTUALLY QUITE DECENT",
    "STACKOVERFLOW DEPENDENT"
  ];

  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (isTyping) {
      if (text.length < currentPhrase.length) {
        const timeout = setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), 80 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 1800);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [text, isTyping, phraseIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setCursorVisible((prev) => !prev), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b));
  return (
    <span className="inline-block font-mono" style={{ minWidth: `${longestPhrase.length * 0.7}ch` }}>
      {text}
      <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
};

const HeroSection = ({ isDarkMode, toggleTheme }) => {
  const containerClasses = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
  return (
    <section className={`min-h-screen flex items-center justify-center py-16 px-4 transition-all duration-500 ${containerClasses} overflow-hidden`}>
      <div className="container mx-auto max-w-6xl">
        {/* Removed theme toggle button from here as it's now in the header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-mono text-xl">$</span>
                <span className="ml-2 font-mono text-xl">sudo make_impression</span>
              </div>
              <div className="mt-6 relative font-mono">
                <div className="mb-4 flex items-center min-h-[1.5em] text-4xl md:text-5xl lg:text-6xl font-bold">
                  <TypewriterText />
                </div>
                <span className="block text-2xl md:text-3xl lg:text-4xl">
                  AI & ML Engineer
                </span>
                <span className="block mt-3 text-xl md:text-2xl">
                  YOU'LL EVER MEET*
                </span>
              </div>
              <p className="text-xs font-mono mt-8 border-t border-current pt-4 italic">
                * Results may vary. Self-proclaimed excellence not validated by peer review.
                Past performance does not guarantee future mediocrity. Coffee dependency not included.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="/#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#projects');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-6 py-3 border border-current hover:bg-current transition-all duration-300 font-mono text-sm tracking-wider"
              >
                VIEW MY BARELY FUNCTIONAL PROJECTS →
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="font-mono text-sm bg-neutral-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-neutral-800 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-neutral-400 text-xs">terminal – ego-check.sh</span>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-green-400">$ checking_credentials.py</p>
                  <p className="text-neutral-400 ml-2">Analyzing portfolio worthiness...</p>
                </div>
                <div>
                  <p className="text-yellow-400">$ WARNINGS:</p>
                  <p className="text-neutral-400 ml-2">- Ego levels exceeding recommended limits</p>
                  <p className="text-neutral-400 ml-2">- Coffee consumption: critical</p>
                  <p className="text-neutral-400 ml-2">- 73% of code is Stack Overflow inspired</p>
                </div>
                <div>
                  <p className="text-green-400">$ self_assessment.py</p>
                  <p className="text-white ml-2">... but hey, the code still works ¯\_(ツ)_/¯</p>
                </div>
                <div className="animate-pulse">
                  <span className="text-green-400">$</span>
                  <span className="ml-1 bg-white w-4 h-4 inline-block"></span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-white/5 rounded-lg -z-10"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-white/5 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
