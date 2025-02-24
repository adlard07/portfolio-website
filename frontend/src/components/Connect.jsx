import React from 'react';
import { ArrowRight } from "lucide-react";

const Connect = () => {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto max-w-6xl text-center">
        <span className="font-display text-sm tracking-widest text-neutral-400">THE SOCIAL EXPERIMENT</span>
        <h2 className="font-display text-6xl mt-2 mb-8">LET'S CONNECT</h2>
        <p className="text-xl text-neutral-400 mb-12 font-serif italic">
          "Because my social skills are slightly better than my first React app"
        </p>
        <div className="flex flex-col items-center gap-6">
          <a
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-2 text-xl hover:text-neutral-400 transition-colors"
          >
            adelarddcunha07@gmail.com
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-8 text-lg">
            <a href="https://github.com/adlard07" className="hover:text-neutral-400 transition-colors">
              GITHUB
            </a>
            <a href="https://www.linkedin.com/in/adelard-dcunha-6186b0216/" className="hover:text-neutral-400 transition-colors">
              LINKEDIN
            </a>
            <a href="https://x.com/BotlordWithB" className="hover:text-neutral-400 transition-colors">
              TWITTER
            </a>
            <a href="https://www.reddit.com/user/Vast_Excitement_945/" className="hover:text-neutral-400 transition-colors">
              Reddit
            </a>
            <a href="https://stackoverflow.com/users/23564658/adlard" className="hover:text-neutral-400 transition-colors">
              Stack Overflow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
