import React from 'react';
import SelfImage from '../assets/self/sheesh.jpg'

const AboutCard = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 max-w-5xl mx-auto rounded-2xl bg-white border border-gray-100 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex-1 space-y-6 p-4">
        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 w-2 h-24 bg-emerald-600 rounded-tl-2xl" />
        
        <p className="text-lg text-gray-800 leading-relaxed">
          In 2024, I embraced a "mad scientist" approach, coding AI models during the day and experimenting 
          with hardware at night, which led to an unexpected online following. I realized that innovation 
          requires diversity, contrary to my previous belief that success in tech meant focusing on a single niche. 
          My diverse interests in VFX, fitness, and electronics have taught me that combining different disciplines 
          can spark new ideas and solutions.
        </p>
        
        <div className="w-16 h-1 bg-emerald-600 my-6" />
        
        <p className="text-lg text-gray-800 leading-relaxed">
          Currently, I integrate various fields like creating data-driven tools for startups, developing 
          unique IoT gadgets, and pursuing innovative projects. I leverage my passions to fuel my work, whether 
          it's scaling micro-startups or delving into integrated circuits. While I am deeply interested in math, 
          I sometimes question my abilities, comparing myself to Schrödinger's cat—both competent and incompetent 
          until my work is reviewed.
        </p>
      </div>

      <div className="w-full md:w-[30rem] h-[30rem] flex-shrink-0 relative group">
        <div className="absolute inset-0 bg-emerald-600/10 rounded-2xl transition-all group-hover:bg-emerald-600/0" />
        <img 
          src={SelfImage} 
          alt="Your Picture"
          className="object-cover w-full h-full rounded-2xl shadow-lg transition-transform group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}

export default AboutCard;