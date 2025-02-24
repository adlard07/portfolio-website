import React, { useState, useEffect } from "react";
import { X, Star, Code, Eye, ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";

const API_URL = "http://127.0.0.1:8000/personal/repo_info/";
const OVERVIEW_URL = "http://127.0.0.1:8000/overview/personal/";

const ProjectTiles = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchProjects();
  }, []);

  const formatText = (text) => {
    if (!text) return "";
    return DOMPurify.sanitize(
      text
        .replace(/^#{1,6}\s(.*)/gm, "<h2 class='text-xl font-bold text-gray-900'>$1</h2>")
        .replace(/\*\*(.*?)\*\*/g, "<b class='font-semibold'>$1</b>")
        .replace(/_(.*?)_/g, "<i class='italic'>$1</i>")
        .replace(/- (.*)/g, "<li class='list-disc ml-6'>$1</li>")
        .replace(/\n/g, "<br />")
    );
  };

  const fetchOverview = async (repoName) => {
    setLoading(true);
    try {
      const response = await fetch(`${OVERVIEW_URL}${repoName}`);
      if (!response.ok) throw new Error("Failed to fetch overview");
      const data = await response.json();
      setSelectedProject((prev) => ({ ...prev, overview: formatText(data.overview) }));
    } catch (err) {
      setSelectedProject((prev) => ({ ...prev, overview: "Failed to load overview" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          My GitHub Projects
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          A collection of my GitHub repositories showcasing my work.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
                fetchOverview(project.name);
              }}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {project.name}
                </h2>
                <p className="text-gray-600 mb-2 line-clamp-3">
                  {project.description || "No description available."}
                </p>
                <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" /> {project.stargazers_count}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" /> {project.watchers_count}
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" /> {project.language || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 flex justify-center items-center p-4 z-50 backdrop-blur-sm bg-black/50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative animate-in fade-in slide-in-from-bottom-4 overflow-y-auto max-h-[80vh]">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 text-center">
                  {selectedProject.name}
                </h3>

                <p className="text-gray-600 mb-2 text-lg italic text-center">
                  {selectedProject.description || "No description available."}
                </p>
                <div className="flex items-center text-gray-500 mb-4">
                  <Star className="w-5 h-5 mr-2" /> {selectedProject.stargazers_count} stars
                </div>

                {loading ? (
                  <p className="text-gray-700 italic text-lg">Fetching AI Overview...</p>
                ) : (
                  <div
                    className="text-gray-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    dangerouslySetInnerHTML={{ __html: selectedProject.overview || "No overview available." }}
                  />
                )}

                <a
                  href={selectedProject.html_url || `https://github.com/adlard07/${selectedProject.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 gap-2 shadow-md hover:shadow-lg"
                >
                  View on GitHub <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTiles;