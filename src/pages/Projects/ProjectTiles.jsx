import React, { useState, useEffect } from "react";
import { Star, Code, Calendar, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://rzcfwvihftl75qdx3gkezvloae0vdzef.lambda-url.ap-south-1.on.aws/personal/repo_info/";

const ProjectTiles = ({ isDarkMode }) => {
  const [projects, setProjects] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingAnimation, setLoadingAnimation] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(
          "Failed to load projects. Either my code broke or the universe is against me."
        );
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingAnimation((prev) => (prev + 1) % 4);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <main className="max-w-7xl mx-auto p-8 mt-15">
        <div
          className={`relative mb-16 overflow-hidden flex flex-row items-center justify-between`}
        >
          <div id="projects">
            <h2
              className={`text-5xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Projects Portfolio
            </h2>

            <p
              className={`text-xl mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              A showcase of digital art I create while pretending to know what
              I'm doing.
            </p>

            <div
              className={`text-sm italic ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              *Warning: Code quality may vary depending on caffeine levels and
              deadline proximity
            </div>
          </div>

          <div
            className={`max-w-sm p-6${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <h2 className="text-[18px] font-bold mb-2">
              Click the project tabs to generate roast
            </h2>
            <p className="text-md italic">
              *Roasts are AI-generated and may contain traces of truth
            </p>
          </div>
        </div>

        {error && (
          <div
            className={`p-6 rounded-lg mb-12 border-2 ${
              isDarkMode
                ? "bg-black text-white border-white"
                : "bg-white text-black border-black"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">
              Houston, We Have a Problem
            </h3>
            <p>{error}</p>
            <p className="mt-2 italic">
              Try refreshing the page, or just accept that technology hates me.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 && !error ? (
            <div
              className={`col-span-full text-center py-20 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Coffee className="w-16 h-16 mx-auto absolute top-0 left-4 animate-pulse" />
                <div className="absolute top-12 left-0 w-24 h-12 border-b-2 border-dashed animate-pulse border-white dark:border-black"></div>
              </div>
              <p className="text-xl mb-2">Loading my digital masterpieces...</p>
              <p className="italic">
                Or perhaps I haven't built anything worth showing.
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 overflow-hidden cursor-pointer border-2 h-full ${
                  isDarkMode
                    ? "bg-black border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-white border-black hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                }`}
                onClick={() => {
                  setSelectedProject(project);
                  navigate(`/projects/${project.name}`);
                }}
              >
                <div className="p-6 h-full flex flex-col">
                  <h2
                    className={`text-xl font-bold mb-3 line-clamp-2 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {project.name}
                  </h2>
                  <p
                    className={`mb-6 flex-grow ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {project.description ||
                      "No description. Probably coded this in a caffeine-fueled frenzy."}
                  </p>
                  <div
                    className={`border-t ${
                      isDarkMode ? "border-white" : "border-black"
                    } pt-4`}
                  >
                    <div
                      className={`flex items-center justify-between text-sm ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />{" "}
                        {project.stargazers_count || "0"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4" /> {project.language || "???"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />{" "}
                        {formatDate(project.created_at).split(",")[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectTiles;
