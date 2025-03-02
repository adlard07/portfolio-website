// AboutSection.jsx
import React from 'react';
import SelfImage from '../../assets/self/sheesh.jpg';

const AboutSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Animated subtitle */}
              <div className="h-8 mb-4 sm:mb-6">
                <span className="font-display text-xs sm:text-sm tracking-widest text-neutral-600 bg-neutral-200 px-3 sm:px-4 py-2 rounded-full">
                  THE PROTAGONIST
                </span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                THE PLOT TWIST YOU DIDN'T SEE COMING
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-neutral-600">
              <p className="font-serif">
                Imagine this: You, bright-eyed and full of hope, step into the world of AI, expecting to build
                sentient machines that understand the universe. Instead, you spend your days arguing with an
                overfitting model that behaves like a toddler—memorizing everything but understanding nothing.
                Your laptop sounds like a jet engine, your GPU budget rivals your rent, and despite all your efforts,
                your neural network still thinks a chihuahua is a muffin.
              </p>
              <p className="font-serif">
                You tell yourself, "This is the future!" as you watch your model train for six hours, only to
                realize you forgot to normalize the data. Again. You experiment with every optimizer known to humankind,
                and when nothing works, you do what every AI researcher does: increase the epochs, pray, and hope the
                reviewer doesn't ask too many questions. Meanwhile, your non-tech friends keep asking if you "built
                ChatGPT" while your family assumes you're hacking the stock market.
              </p>
              <blockquote className="text-xl sm:text-2xl font-display border-l-4 border-neutral-800 pl-4 sm:pl-6 my-8 sm:my-12">
                "THEY SAID AI WOULD AUTOMATE JOBS. THEY DIDN'T SAY MY JOB WOULD BE STARING AT LOSS FUNCTIONS FOR HOURS."
              </blockquote>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-4 sm:pt-6">
              <div className="space-y-1 sm:space-y-2">
                <span className="text-3xl sm:text-4xl font-display">42%</span>
                <p className="text-xs sm:text-sm text-neutral-500">Caffeine by volume</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <span className="text-3xl sm:text-4xl font-display">∞</span>
                <p className="text-xs sm:text-sm text-neutral-500">Stack Overflow visits</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <span className="text-3xl sm:text-4xl font-display">404</span>
                <p className="text-xs sm:text-sm text-neutral-500">Bugs not found</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative group mt-8 md:mt-0">
            <div className="aspect-[3/4] w-full max-w-md mx-auto md:max-w-none overflow-hidden bg-neutral-100 rounded-lg shadow-xl">
              <img
                src={SelfImage}
                alt="Your resident ML wizard"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 sm:p-6 transform translate-y-0 transition-transform duration-300">
                <p className="font-mono text-center text-sm sm:text-md text-neutral-300">
                  Me explaining why my model needs "just one more epoch".
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-neutral-200 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
