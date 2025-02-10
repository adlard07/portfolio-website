import React from 'react';
import SelfImage from '../assets/self-cllg.png';

const About = () => {
    return (
        <section className="flex min-h-screen items-center justify-center p-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-800">
            <div className="relative max-w-5xl w-full bg-black/90 backdrop-blur-md border border-zinc-700 rounded-3xl shadow-white shadow-2xl p-8">
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white to-transparent opacity-20 blur-xl"></div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Text Section */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-extrabold text-orange-500 tracking-wide uppercase">
                            About Me
                        </h2>

                        <p className="text-lg text-zinc-300 leading-relaxed text-justify">
                            In 2023, I embraced a "mad scientist" approach, coding AI models during the day and experimenting with hardware at night, which led to an unexpected online following. I realized that innovation requires diversity, contrary to my previous belief that success in tech meant focusing on a single niche. My diverse interests in VFX, fitness, and electronics have taught me that combining different disciplines can spark new ideas and solutions.
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed text-justify">
                            Currently, I integrate various fields like a DJ, creating data-driven tools for startups, developing unique IoT gadgets, and pursuing innovative projects. I leverage my passions to fuel my work, whether it's scaling micro-startups or delving into integrated circuits. While I am deeply interested in math, I sometimes question my abilities, comparing myself to Schrödinger's cat—both competent and incompetent until my work is reviewed.
                        </p>
                    </div>

                    {/* Image Section with Cool Hover Effect */}
                    <div className="flex items-center justify-center">
                        <div className="relative group">
                            {/* Subtle Animated Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-white to-transparent rounded-2xl blur opacity-20"></div>

                            <img
                                className="relative w-full max-w-[280px] rounded-2xl"
                                src={SelfImage}
                                alt="Self portrait"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
