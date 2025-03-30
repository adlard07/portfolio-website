import React, { useState, useEffect } from "react";
import { Code2, ExternalLink, Github, X } from "lucide-react";
import { marked } from "marked";

const API_URL =
  "https://rzcfwvihftl75qdx3gkezvloae0vdzef.lambda-url.ap-south-1.on.aws/professional/repo_info/";
const OVERVIEW_URL =
  "https://rzcfwvihftl75qdx3gkezvloae0vdzef.lambda-url.ap-south-1.on.aws/overview/professional/";

export default function Projects({ isDarkMode }) {
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
      setSelectedProject((prev) => ({
        ...prev,
        overview: marked(data.overview || "No overview available."),
      }));
    } catch (err) {
      setSelectedProject((prev) => ({
        ...prev,
        overview: marked("Failed to load overview"),
      }));
    } finally {
      setLoading(false);
    }
  };

  const bgCard = isDarkMode
    ? "bg-black/60 border-neutral-700"
    : "bg-white border-gray-300";
  const textPrimary = isDarkMode ? "text-white" : "text-neutral-800";
  const textSecondary = isDarkMode ? "text-neutral-400" : "text-neutral-600";
  const gradientTitle = isDarkMode
    ? "bg-gradient-to-r from-white to-neutral-400"
    : "bg-gradient-to-r from-neutral-800 to-neutral-600";

  const buttonHover = isDarkMode
    ? "hover:bg-neutral-800 hover:text-white"
    : "hover:bg-gray-50 hover:text-black";

  const modalBg = isDarkMode ? "bg-neutral-900" : "bg-white";
  const modalBorder = isDarkMode ? "border-neutral-700" : "border-neutral-200";

  return (
    <section className="mb-20 transition-all duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12 group">
        <div className="relative">
          <div
            className={`absolute inset-0 ${
              isDarkMode ? "bg-neutral-700" : "bg-neutral-100"
            } rounded-lg blur-sm group-hover:blur-md transition-all duration-300`}
          />
          <Code2
            className={`size-8 relative ${
              isDarkMode ? "text-white" : "text-neutral-700"
            } group-hover:scale-110 transition-transform duration-300`}
          />
        </div>
        <h2
          className={`font-display text-4xl tracking-wide ${gradientTitle} bg-clip-text text-transparent`}
        >
          PROJECTS
        </h2>
      </div>

      {error && <div className="text-red-500 text-center mb-8">{error}</div>}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group ${bgCard} border rounded-xl p-6 transition-all`}
          >
            <div className="space-y-4">
              <h3
                className={`font-display text-2xl ${textPrimary} group-hover:text-cyan-400`}
              >
                {project.name}
              </h3>
              <p className={`font-serif ${textSecondary} line-clamp-2`}>
                {project.description || "No description available."}
              </p>
              <div
                className={`flex justify-between items-center ${textSecondary} text-sm`}
              >
                <div className="flex items-center gap-1.5">
                  <Github
                    className={`size-5 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  />
                  <span
                    className={`text-lg ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {project.language || "N/A"}
                  </span>
                </div>

                <button
                  className={`p-3 border border-black rounded-lg ${buttonHover} transition-all duration-300 cursor-pointer`}
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
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedProject(null)
          }
        >
          <div
            className={`${modalBg} rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto`}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b ${modalBorder}`}>
              <div className="flex justify-between items-start">
                <h3 className={`font-display text-2xl ${textPrimary}`}>
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`${textSecondary} hover:text-neutral-300 transition-colors`}
                >
                  <X className="size-6" />
                </button>
              </div>
              <p className={`font-serif mt-2 ${textSecondary}`}>
                {selectedProject.description}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {loading ? (
                <div className="text-center text-neutral-500">
                  Loading project details...
                </div>
              ) : (
                <div
                  className={`font-serif leading-relaxed ${textSecondary}`}
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
