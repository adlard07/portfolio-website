import React from "react";
import { GraduationCap, ExternalLink } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor In Artificial Intelligence & Data Science",
    university: "Fr. Conceicao Rodrigez College Of Engineering, Bandra",
    years: "2021 - 2024",
  },
  {
    degree: "Diploma In Electronics & Telecommunication",
    university: "Fr. Conceicao Rodrigez College Of Engineering, Bandra",
    years: "2018 - 2021",
  },
];

export default function Education() {
  return (
    <section className="mb-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 rounded-full opacity-40 blur-2xl -z-10" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="relative">
          <div className="absolute inset-0 bg-neutral-100 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
          <GraduationCap className="size-8 relative text-neutral-700 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="font-display text-4xl tracking-wide bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
          EDUCATION
        </h2>
      </div>

      {/* Education Cards */}
      <div className="space-y-12">
        {educationData.map((edu, index) => (
          <div
            key={index}
            className="relative border-l-4 border-neutral-200 pl-8 py-6 group hover:border-neutral-400 transition-colors duration-300"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[11px] top-8 w-[18px] h-[18px] bg-white border-4 border-neutral-200 rounded-full group-hover:border-neutral-400 transition-colors duration-300" />

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-2xl text-neutral-800 group-hover:text-neutral-900 transition-colors duration-300">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <p className="font-serif text-neutral-600">
                    {edu.university}
                  </p>
                </div>
                <p className="font-serif text-neutral-500 tracking-wide">
                  {edu.years}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}