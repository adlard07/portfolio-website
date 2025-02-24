import React, { useState, useEffect } from "react";
import { Code2, ExternalLink, Github, X } from "lucide-react";
import { marked } from "marked";

const API_URL = "http://127.0.0.1:8000/professional/repo_info/";
const OVERVIEW_URL = "http://127.0.0.1:8000/overview/professional/";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const fetchOverview = async (repoName) => {
    setLoading(true);
    try {
      const response = await fetch(`${OVERVIEW_URL}${repoName}`);
      if (!response.ok) throw new Error("Failed to fetch overview");
      const data = await response.json();
      setSelectedProject(prev => ({ ...prev, overview: marked(data.overview || "No overview available.") }));
    } catch (err) {
      setSelectedProject(prev => ({ ...prev, overview: marked("Failed to load overview") }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="relative">
          <div className="absolute inset-0 bg-neutral-100 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
          <Code2 className="size-8 relative text-neutral-700 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="font-display text-4xl tracking-wide bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
          PROJECTS
        </h2>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-8">{error}</div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white border border-neutral-200 rounded-xl p-6 "
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-neutral-800 group-hover:text-neutral-900">
                {project.name}
              </h3>
              <p className="font-serif text-neutral-600 line-clamp-2">
                {project.description || "No description available."}
              </p>
              <div className="flex justify-between items-center text-neutral-500 text-sm">
                {/* Left Side: Language */}
                <div className="flex items-center gap-1.5">
                  <Github className="size-4" />
                  <span>{project.language || "N/A"}</span>
                </div>

                {/* Right Side: Button */}
                <button
                  className="p-3 border border-black rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    fetchOverview(project.name);
                  }}
                >
                  View AI Explanation
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-200">
              <div className="flex justify-between items-start">
                <h3 className="font-display text-2xl text-neutral-800">
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>
              <p className="font-serif text-neutral-600 mt-2">
                {selectedProject.description}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {loading ? (
                <div className="text-center text-neutral-600">
                  Loading project details...
                </div>
              ) : (
                <div
                  className="font-serif text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedProject.overview }}
                />
              )}

              {/* Project Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href={selectedProject.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 transition-colors"
                >
                  <Github className="size-4" />
                  <span>View Repository</span>
                </a>
                {selectedProject.homepage && (
                  <a
                    href={selectedProject.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
