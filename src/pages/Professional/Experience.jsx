import React from "react";
import { Briefcase, Building2, Calendar, ExternalLink } from "lucide-react";
import experienceData from "./experience.json";

export default function Experience({ isDarkMode }) {
  const bgDecor = isDarkMode
    ? "bg-gradient-to-br from-gray-900/30 to-blue-900/30"
    : "bg-gradient-to-br from-gray-100/30 to-blue-100/30";

  const iconDecor = isDarkMode
    ? "bg-gradient-to-br from-gray-900/20 to-blue-900/20"
    : "bg-gradient-to-br from-gray-100/20 to-blue-100/20";

  const iconColor = isDarkMode ? "text-white" : "text-gray-700";
  const headerGradient = isDarkMode
    ? "bg-gradient-to-r from-white to-neutral-400"
    : "bg-gradient-to-r from-gray-800 to-gray-600";

  const cardBg = isDarkMode ? "bg-black/60" : "bg-white/95";
  const cardBorder = isDarkMode ? "border-neutral-700" : "border-gray-200/50";
  const cardHoverBorder = isDarkMode ? "hover:border-white" : "hover:border-gray-400";

  const dotBg = isDarkMode ? "bg-neutral-900" : "bg-white";
  const dotBorder = isDarkMode ? "border-neutral-700" : "border-gray-200/50";

  const sectionBg = isDarkMode
    ? "from-neutral-800/80 to-neutral-900/80"
    : "from-gray-50/80 to-gray-100/80";

  const textPrimary = isDarkMode ? "text-white" : "text-gray-800";
  const textSecondary = isDarkMode ? "text-neutral-400" : "text-gray-600";
  const textMuted = isDarkMode ? "text-neutral-500" : "text-gray-500";

  const techHover = isDarkMode
    ? "group-hover:bg-gray-900/50 group-hover:text-gray-300"
    : "group-hover:bg-gray-50/50 group-hover:text-gray-700";

  return (
    <section className="mb-20 relative transition-all duration-500">
      {/* Decorative background with gradient */}
      <div
        className={`absolute top-20 left-0 w-32 h-32 ${bgDecor} rounded-full opacity-40 blur-3xl -z-10 animate-pulse-slow`}
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="relative">
          <div
            className={`absolute inset-0 ${iconDecor} rounded-lg blur-md group-hover:blur-lg transition-all duration-500`}
          />
          <Briefcase
            className={`size-10 relative ${iconColor} group-hover:scale-110 transition-transform duration-300`}
          />
        </div>
        <h2
          className={`font-display text-4xl tracking-wide ${headerGradient} bg-clip-text text-transparent drop-shadow-md animate-fade-in`}
        >
          EXPERIENCE
        </h2>
      </div>

      {/* Experience Cards */}
      <div className="space-y-12">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className={`relative border-l-4 ${cardBorder} ${cardHoverBorder} pl-8 py-8 ${cardBg} backdrop-blur-sm rounded-r-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
          >
            {/* Timeline dot */}
            <div
              className={`absolute -left-[11px] top-10 w-[18px] h-[18px] ${dotBg} border-4 ${dotBorder} rounded-full group-hover:border-gray-500 transition-colors duration-300`}
            />

            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <h3
                  className={`font-display text-2xl ${textPrimary} group-hover:text-gray-400 transition-colors duration-300`}
                >
                  {exp.title}
                </h3>

                <div className="mt-4 space-y-2">
                  <div className={`flex items-center gap-4 ${textSecondary}`}>
                    <div className="flex items-center gap-2">
                      <Building2 className="size-5" />
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif hover:text-cyan-400 transition-colors duration-200 underline decoration-dotted decoration-cyan-200/50"
                      >
                        {exp.company}
                      </a>
                    </div>
                    <span className={textMuted}>•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-5" />
                      <span className="font-serif">{exp.years}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div
                className={`bg-gradient-to-br ${sectionBg} rounded-xl p-6 space-y-4 group-hover:from-cyan-900/20 group-hover:to-blue-900/20 transition-colors duration-300 shadow-inner`}
              >
                <ul className={`font-serif ${textSecondary} space-y-3`}>
                  {exp.responsibilities.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-current rounded-full" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="pt-4 border-t border-gray-200/20">
                  <p className={`font-serif font-medium ${textPrimary} mb-2`}>
                    Technologies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-white/10 rounded-full text-sm font-serif ${textSecondary} shadow-sm ${techHover} transition-all duration-300`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievement */}
                {exp.achievements && (
                  <div className="pt-4 border-t border-gray-200/20">
                    <p className={`font-serif font-medium ${textPrimary} mb-2`}>
                      Key Achievement:
                    </p>
                    <p className={`font-serif ${textSecondary}`}>
                      {exp.achievements}
                    </p>
                  </div>
                )}
              </div>

              {/* View more button */}
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm ${textMuted} hover:text-cyan-400 transition-colors duration-300 underline decoration-dotted decoration-cyan-200/50`}
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
