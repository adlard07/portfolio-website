import React from 'react';
import { FaPython, FaDatabase, FaAws, FaDocker, FaGit, FaBrain } from 'react-icons/fa';
import { SiNeo4J, SiMongodb, SiKubernetes, SiLangchain } from 'react-icons/si';

// Group skills by category
const skillCategories = [
    {
        title: "AI & Machine Learning",
        icon: <FaBrain className="w-5 h-5" />,
        skills: ["Machine Learning", "Deep Learning", "Self-Attention", "LLM", "LangChain"]
    },
    {
        title: "Languages & Databases",
        icon: <FaDatabase className="w-5 h-5" />,
        skills: ["Python", "SQL", "Neo4j", "Mongo DB", "Chroma DB"]
    },
    {
        title: "Cloud & DevOps",
        icon: <FaAws className="w-5 h-5" />,
        skills: ["AWS (Sagemaker, EC2, S3)", "Docker", "Kubernetes", "Git", "Elastic Beanstalk"]
    }
];

const Skills = () => {
    return (
        <div className="p-8 bg-gray-950 rounded-xl border border-gray-800 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center space-x-2">
                <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                <span>Technical Skills</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, idx) => (
                    <div 
                        key={idx}
                        className="group relative p-6 bg-gray-900 rounded-xl border border-gray-800 
                                 hover:border-emerald-500/30 transition-all duration-300"
                    >
                        {/* Accent line */}
                        <div className="absolute top-0 left-0 w-1 h-12 bg-emerald-500/20 rounded-tl-xl 
                                      group-hover:h-full transition-all duration-500" />
                        
                        {/* Category Header */}
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 rounded-lg bg-gray-800 text-emerald-400 
                                          group-hover:bg-emerald-500/10 transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-medium text-white">{category.title}</h3>
                        </div>

                        {/* Skills Grid */}
                        <div className="space-y-2">
                            {category.skills.map((skill, skillIdx) => (
                                <div 
                                    key={skillIdx}
                                    className="flex items-center space-x-2 p-2 rounded-lg 
                                             bg-gray-950/50 hover:bg-emerald-500/5 
                                             transition-colors duration-200"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                                    <span className="text-gray-300 text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;