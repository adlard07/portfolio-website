import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function AboutMe({ isDarkMode }) {
  const containerBg = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
  const gradientText = isDarkMode
    ? 'bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent';
  const borderColor = isDarkMode ? 'border-gray-900' : 'border-gray-100';
  const textColor = isDarkMode ? 'text-neutral-300' : 'text-neutral-600';
  const hoverText = isDarkMode ? 'hover:text-white' : 'hover:text-neutral-900';

  return (
    <section className={`relative mb-20 px-4 py-12 transition-all duration-500 ${containerBg}`}>
      {/* Decorative background elements */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-50 blur-3xl -z-10 ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`} />
      <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-50 blur-2xl -z-10 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`font-display text-6xl mt-6 mb-8 ${gradientText}`}
          >
            Hi, I'm Adelard.
          </motion.h1>
        </div>

        {/* Content Section */}
        <div className={`font-serif text-lg space-y-8 ${textColor}`}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`leading-relaxed border-l-4 pl-6 ${borderColor}`}
          >
            A passionately curious System Engineer with expertise in building machine learning and deep learning
            applications. Specializing in Machine/Deep Learning, Transformer models,
            with a strong foundation in full stack development in Python, React & Node.js, Tailwind.CSS.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="leading-relaxed"
          >
            Committed to writing clean, maintainable code and creating exceptional user experiences.
            Always eager to learn new technologies and tackle challenging problems.
          </motion.p>
        </div>

        {/* Call to Action */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12"
          />
          <a href='https://github.com/adlard07' className={`group flex items-center gap-2 font-display text-sm tracking-wider ${textColor} ${hoverText} transition-colors`}>
            <FontAwesomeIcon icon={faGithub} className="w-6 h-8" />
            VIEW MY WORK
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
