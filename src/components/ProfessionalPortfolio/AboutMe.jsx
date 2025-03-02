import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutMe() {
  return (
    <section className="relative mb-20 px-4 py-12">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 rounded-full opacity-50 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-neutral-100 rounded-full opacity-50 blur-2xl -z-10" />

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
            className="font-display text-6xl mt-6 mb-8 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent"
          >
            ABOUT ME
          </motion.h1>
        </div>

        {/* Content Section */}
        <div className="font-serif text-lg text-neutral-600 space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="leading-relaxed border-l-4 border-neutral-200 pl-6"
          >
            A passionately curious System Engineer with expertise in building building machine learning and deep learning
            applications. Specializing in full stack and development with Python, React, Tailwind.CSS,
            with a strong foundation in Machine/Deep Learning & Transformers.
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
          <button className="group flex items-center gap-2 font-display text-sm tracking-wider text-neutral-700 hover:text-neutral-900 transition-colors">
            VIEW MY WORK
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}