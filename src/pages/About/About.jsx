import React from 'react';

const AboutMe = ({ isDarkMode }) => {
  return (
    <div className={`flex items-center justify-center py-16 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Image Placeholder */}
          <div className={`w-64 h-64 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your Image Here
            </span>
          </div>

          {/* About Me Text */}
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">
              About Me
            </h2>
            <p className="leading-relaxed">
              Hey there! I'm a passionate developer who loves turning complex problems into elegant solutions. 
              My journey in tech is driven by curiosity, creativity, and a never-ending desire to learn. 
              Whether it's crafting responsive web applications, exploring new technologies, or diving deep into 
              algorithmic challenges, I'm always excited to push the boundaries of what's possible.

              When I'm not coding, you'll find me exploring new coffee shops, playing strategy games, 
              or diving into the latest tech podcasts and books. I believe in continuous learning, 
              collaborative problem-solving, and creating technology that makes a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
