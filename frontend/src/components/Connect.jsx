import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { AiFillInstagram } from 'react-icons/ai';

const Connect = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/adlard07', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/adelard-dcunha-6186b0216/', name: 'LinkedIn' },
    { icon: <FaStackOverflow />, url: 'https://stackoverflow.com/users/23564658/adlard', name: 'Stack Overflow' },
    { icon: <FaTwitter />, url: 'https://x.com/BotlordWithB', name: 'Twitter' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@AdlardDcunha', name: 'YouTube' },
    { icon: <AiFillInstagram />, url: 'https://www.instagram.com/___adelard___d__/', name: 'Instagram' },
    { icon: <SiGmail />, url: 'mailto:adelarddcunha07@gmail.com', name: 'Email' }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Let's Connect
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                aria-label={link.name}
              >
                <span className="text-2xl text-gray-600 dark:text-gray-300 hover:text-[#ff7b00] dark:hover:text-[#ffaa00] transition-colors duration-300">
                  {React.cloneElement(link.icon, { className: 'w-8 h-8' })}
                </span>
              </a>
            ))}
          </div>

          <p className="mt-8 text-white dark:text-gray-400">
            Reach out or follow my journey through code and creativity
          </p>
        </div>
      </div>
    </section>
  );
};

export default Connect;