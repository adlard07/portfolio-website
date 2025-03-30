import React from "react";
import { BadgeCheck } from "lucide-react";

const skills = {
  "AI/ML": ["Supervised", "Unsupervised", "LLM", "Self-Attention Transformer", "Python", "AWS Sagemaker", "PySpark", "Langchain"],
  "backend": ["Python", "Node.js", "SQL", "REST APIs", "Fast APIs"],
  "database": ["Chroma DB", "AWS Redshift", "Neo4j", "Mongo DB"],
  "frontend": ["React", "Tailwind CSS"],
  "devops": ["EC2", "S3", "AWS Lambda", "AWS RDS", "Elastic Beanstalk", "Docker", "Git", "Kubernetes"],
};

export default function Skills({ isDarkMode }) {
  const textPrimary = isDarkMode ? "text-white" : "text-neutral-800";
  const textSecondary = isDarkMode ? "text-neutral-400" : "text-neutral-600";
  const iconColor = isDarkMode ? "text-white" : "text-black";
  const badgeBg = isDarkMode ? "bg-neutral-800" : "bg-neutral-100";
  const headerGradient = isDarkMode
    ? "bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent";

  return (
    <section className="mb-20 transition-all duration-500">
      <div className="flex items-center gap-4 mb-8">
        <BadgeCheck className={`size-8 ${iconColor}`} />
        <h2 className={`font-display text-4xl ${headerGradient}`}>SKILLS</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, skillsArray]) => (
          <div key={category}>
            <h3 className={`font-display text-2xl mb-4 ${textPrimary}`}>
              {category.toUpperCase()}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded ${badgeBg} ${textSecondary} font-serif`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
