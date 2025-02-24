import React from "react";
import { BadgeCheck } from "lucide-react";

const skills = {
  "frontend" : ["React", "Tailwind CSS"],
  "backend" : ["Node.js", "Python", "SQL", "REST APIs", "Fast APIs"],
  "machine larning" : ["Supervised", "Unsupervised", "LLM", "Self-Attention Transformer", "Python", "AWS Sagemaker", "PySpark", "Langchain"],
  "database" : ["Chroma DB", "AWS Redshift", "Neo4j", "Mongo DB"],
  "devops" : ["AWS EC2", "AWS S3", "AWS Elastic Beanstalk", "Docker", "Git", "Kubernetes"],
};

export default function Skills() {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <BadgeCheck className="size-8" />
        <h2 className="font-display text-4xl">SKILLS</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, skillsArray]) => (
          <div key={category}>
            <h3 className="font-display text-2xl mb-4">{category.toUpperCase()}</h3>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-neutral-100 font-serif">
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
