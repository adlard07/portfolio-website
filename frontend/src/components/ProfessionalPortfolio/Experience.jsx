import React from "react";
import { Briefcase, Building2, Calendar, ExternalLink } from "lucide-react";
import experienceData from "./experience.json";

export default function Experience() {
  return (
    <section className="mb-20 relative">
      {/* Decorative background with gradient */}
      <div className="absolute top-20 left-0 w-32 h-32 bg-gradient-to-br from-cyan-100/30 to-blue-100/30 rounded-full opacity-40 blur-3xl -z-10 animate-pulse-slow" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 to-blue-100/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-500" />
          <Briefcase className="size-10 relative text-gray-700 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="font-display text-4xl tracking-wide bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-md animate-fade-in">
          EXPERIENCE
        </h2>
      </div>

      {/* Experience Cards */}
      <div className="space-y-12">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className="relative border-l-4 border-gray-200/50 pl-8 py-8 bg-white/95 backdrop-blur-sm rounded-r-2xl shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Timeline dot with gradient */}
            <div className="absolute -left-[11px] top-10 w-[18px] h-[18px] bg-white border-4 border-gray-200/50 rounded-full group-hover:border-gray-400 transition-colors duration-300" />

            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <h3 className="font-display text-2xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  {exp.title}
                </h3>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-5 text-gray-500" />
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif hover:text-cyan-600 transition-colors duration-200 underline decoration-dotted decoration-cyan-200/50"
                      >
                        {exp.company}
                      </a>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-5 text-gray-500" />
                      <span className="font-serif">{exp.years}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/80 rounded-xl p-6 space-y-4 group-hover:bg-gradient-to-br group-hover:from-cyan-50/20 group-hover:to-blue-50/20 transition-colors duration-300 shadow-inner">
                <ul className="font-serif text-gray-700 space-y-3">
                  {exp.responsibilities.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="pt-4 border-t border-gray-200/50">
                  <p className="font-serif font-medium text-gray-800 mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white rounded-full text-sm font-serif text-gray-700 shadow-sm group-hover:bg-cyan-50/50 group-hover:text-cyan-700 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievement */}
                {exp.achievements && (
                  <div className="pt-4 border-t border-gray-200/50">
                    <p className="font-serif font-medium text-gray-800 mb-2">Key Achievement:</p>
                    <p className="font-serif text-gray-700">{exp.achievements}</p>
                  </div>
                )}
              </div>

              {/* View more button */}
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600 transition-colors duration-300 underline decoration-dotted decoration-cyan-200/50"
              >
                <span>View Project Details</span>
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}