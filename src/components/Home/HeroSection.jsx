import React, { useState, useEffect } from 'react';

const TypewriterText = () => {
  const phrases = [
    "PROBABLY THE BEST",
    "DEFINITELY AVERAGE",
    "SLIGHTLY ABOVE MEDIOCRE",
    "NOT THE WORST",
    "ACTUALLY QUITE DECENT"
  ];

  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isTyping) {
      if (text.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [text, isTyping, phraseIndex]);

  // Find the longest phrase to set a minimum width
  const longestPhrase = phrases.reduce((a, b) => a.length > b.length ? a : b);

  return (
    <span className="inline-block min-w-[12ch] sm:min-w-[18ch]" style={{ minWidth: `${longestPhrase.length * 0.7}ch`, '@media (min-width: 640px)': { minWidth: `${longestPhrase.length}ch` } }}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-40 items-start">
          {/* Content Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Main heading with typewriter effect */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                <span className="block mb-2 sm:mb-4 text-neutral-400 text-xl sm:text-2xl font-mono">
                  $ sudo
                </span>
                <div className="relative font-mono">
                  <div className="mb-3 sm:mb-4 flex items-center min-h-[1.5em]">
                    <TypewriterText />
                  </div>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-700">
                    AI & ML Engineer
                  </span>
                  <span className="block mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl text-neutral-500">
                    YOU'LL EVER MEET*
                  </span>
                </div>
                {/* Footnote */}
                <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-6 sm:mt-8">
                  * Results may vary. Self-proclaimed excellence not validated by peer review.
                  Past performance does not guarantee future mediocrity.
                </p>
              </h2>
            </div>
          </div>

          {/* Terminal column - Fixed position for md and up, static for mobile */}
          <div className="hidden md:block relative pt-8 md:pt-16 lg:pt-40">
            <div className="font-mono text-xs sm:text-sm bg-neutral-900 text-neutral-100 p-4 sm:p-5 rounded-lg md:sticky md:top-24">
              <p className="text-green-400">$ checking_ego_levels.py</p>
              <p className="text-yellow-400">WARNING: Ego levels exceeding recommended limits</p>
              <p className="text-neutral-400">... but the code still works ¯\_(ツ)_/¯</p>
            </div>
          </div>
          
          {/* Mobile-only terminal for smaller screens */}
          <div className="block md:hidden mt-8">
            <div className="font-mono text-xs bg-neutral-900 text-neutral-100 p-4 rounded-lg">
              <p className="text-green-400">$ checking_ego_levels.py</p>
              <p className="text-yellow-400">WARNING: Ego levels exceeding limits</p>
              <p className="text-neutral-400">... but the code still works ¯\_(ツ)_/¯</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
