import React from 'react';
import SelfImage from '../../assets/self/sheesh.jpg';

// Accept a prop to determine the theme; true = dark (black bg, white text), false = light (white bg, black text)
const AboutSection = ({ isDarkMode }) => {
  // Container classes based on theme
  const containerClasses = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
  // Border color based on theme (only black or white)
  const borderColor = isDarkMode ? 'border-white' : 'border-black';
  // Overlay background for image (match the theme)
  const overlayBg = isDarkMode ? 'bg-black' : 'bg-white';
  // Decorative border classes for the image container
  const decoBorder = isDarkMode ? 'border-white' : 'border-black';
  // Terminal prefix and code comments will use the same dynamic color
  const dynamicText = isDarkMode ? 'text-white' : 'text-black';

  return (
    <section className={`py-24 px-4 ${containerClasses}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8 order-2 md:order-1">
            {/* Section label with terminal-style prefix */}
            <div className="flex items-center space-x-2 mb-6">
              <span className={`${dynamicText} font-mono text-xl`}>$</span>
              <span className={`font-mono text-sm tracking-widest ${dynamicText} ${borderColor} border px-4 py-2 rounded-sm`}>
                cat protagonist.md
              </span>
            </div>
            
            <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl leading-tight">
              THE PLOT TWIST YOU DIDN'T SEE COMING
            </h2>

            <div className="space-y-6 text-lg">
              <p className="font-mono leading-relaxed">
                Imagine this: You, bright-eyed and full of hope, step into the world of AI, expecting to build
                sentient machines that understand the universe. Instead, you spend your days arguing with an
                overfitting model that behaves like a toddler—memorizing everything but understanding nothing.
                Your laptop sounds like a jet engine, your GPU budget rivals your rent, and despite all your efforts,
                your neural network still thinks a chihuahua is a muffin.
              </p>
              <p className="font-mono leading-relaxed">
                You tell yourself, "This is the future!" as you watch your model train for six hours, only to
                realize you forgot to normalize the data. Again. You experiment with every optimizer known to humankind,
                and when nothing works, you do what every AI researcher does: increase the epochs, pray, and hope the
                reviewer doesn't ask too many questions.
              </p>
              
              <div className={`h-px w-full ${borderColor} my-8`}></div>
              
              <blockquote className={`text-2xl font-mono border-l-4 ${borderColor} pl-6 py-2`}>
                "THEY SAID AI WOULD AUTOMATE JOBS. THEY DIDN'T SAY MY JOB WOULD BE STARING AT LOSS FUNCTIONS FOR HOURS."
              </blockquote>
              
              <div className={`h-px w-full ${borderColor} my-8`}></div>
            </div>
            
            <div className={`grid grid-cols-3 gap-6 pt-6 border-t ${borderColor}`}>
              <div className="space-y-2">
                <span className="text-4xl font-mono">42%</span>
                <p className="text-sm">Caffeine by volume</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-mono">∞</span>
                <p className="text-sm">Stack Overflow visits</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-mono">404</span>
                <p className="text-sm">Bugs not found</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative group order-1 md:order-2">
            <div className={`aspect-[3/4] w-full max-w-md mx-auto overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'} rounded ${borderColor} shadow-2xl`}>
              <img
                src={SelfImage}
                alt="Your resident ML wizard"
                className="w-full h-full object-cover object-center"
              />
              <div className={`absolute bottom-0 left-0 right-0 ${overlayBg} p-4 transform translate-y-0 transition-transform duration-300`}>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${dynamicText}`}></div>
                  <p className="font-mono text-sm">
                    Me explaining why my model needs "just one more epoch"
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal-style decorative elements */}
            <div className={`absolute -top-4 -right-4 w-full h-full border rounded -z-10 ${decoBorder}`} />
            <div className={`absolute -bottom-4 -left-4 w-full h-full border rounded -z-20 ${decoBorder}`} />
            
            {/* Code comment decorations */}
            <div className={`absolute -top-6 left-10 font-mono text-xs ${dynamicText} opacity-30`}>
              /* Actual talent not pictured */
            </div>
            <div className={`absolute -bottom-6 right-10 font-mono text-xs ${dynamicText} opacity-30`}>
              /* Filter: wishful_thinking.css */
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
