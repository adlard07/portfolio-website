import React, { useState, useEffect } from "react";
import { X, Star, Code, Eye, ExternalLink, GitBranch, Calendar, Coffee, Terminal } from "lucide-react";
import DOMPurify from "dompurify";

const API_URL = "https://rzcfwvihftl75qdx3gkezvloae0vdzef.lambda-url.ap-south-1.on.aws/personal/repo_info/";
const OVERVIEW_URL = "https://rzcfwvihftl75qdx3gkezvloae0vdzef.lambda-url.ap-south-1.on.aws/overview/personal/";

const ProjectTiles = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects. Either my code broke or the universe is against me.");
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingAnimation(prev => (prev + 1) % 4);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const formatText = (text) => {
    if (!text) return "";
    return DOMPurify.sanitize(
      text
        .replace(/^#{1,6}\s(.*)/gm, "<h2 class='text-2xl font-bold mb-3'>$1</h2>")
        .replace(/\*\*(.*?)\*\*/g, "<b class='font-semibold'>$1</b>")
        .replace(/_(.*?)_/g, "<i class='italic'>$1</i>")
        .replace(/- (.*)/g, "<li class='list-disc ml-6 mb-2'>$1</li>")
        .replace(/`(.*?)`/g, "<code class='font-mono p-1 rounded'>$1</code>")
        .replace(/\n\n/g, "<br /><br />")
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
      setSelectedProject((prev) => ({
        ...prev,
        overview: "Failed to load overview. Apparently, even AI can't make sense of my coding style."
      }));
    } finally {
      setTimeout(() => setLoading(false), 800); // Add a slight delay for dramatic effect
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getRandomLoadingMessage = () => {
    const messages = [
      "Converting coffee into code...",
      "Searching for code that doesn't make me cringe...",
      "Convincing the server my projects are worth displaying...",
      "Finding bugs to pretend I put there intentionally...",
      "Questioning my life choices while fetching data..."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <main className="max-w-7xl mx-auto p-8">
        <div className={`relative mb-16 p-8 ${isDarkMode ? 'border-white' : 'border-black'} border-2 rounded-lg overflow-hidden flex flex-row items-center justify-between`}>
          <div id="projects">
            <h2 className={`text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Projects <span className="italic">Portfolio</span>
            </h2>

            <p className={`text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              A showcase of digital art I create while pretending to know what I'm doing.
            </p>

            <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'} italic`}>
              *Warning: Code quality may vary depending on caffeine levels and deadline proximity
            </div>
          </div>
          {/* <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transform transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} shadow-lg`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button> */}

          <div className="absolute -left-4 -top-4 w-16 h-16 border-2 border-black dark:border-white opacity-20"></div>
        </div>


        {error && (
          <div className={`p-6 rounded-lg mb-12 border-2 ${isDarkMode ? 'bg-black text-white border-white' : 'bg-white text-black border-black'
            }`}>
            <h3 className="text-xl font-bold mb-2">Houston, We Have a Problem</h3>
            <p>{error}</p>
            <p className="mt-2 italic">Try refreshing the page, or just accept that technology hates me.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 && !error ? (
            <div className={`col-span-full text-center py-20 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Coffee className="w-16 h-16 mx-auto absolute top-0 left-4 animate-pulse" />
                <div className="absolute top-12 left-0 w-24 h-12 border-b-2 border-dashed animate-pulse border-white dark:border-black"></div>
              </div>
              <p className="text-xl mb-2">Loading my digital masterpieces...</p>
              <p className="italic">Or perhaps I haven't built anything worth showing.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 overflow-hidden cursor-pointer border-2 h-full ${isDarkMode
                  ? 'bg-black border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-white border-black hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]'
                  }`}
                onClick={() => {
                  setSelectedProject(project);
                  fetchOverview(project.name);
                }}
              >
                <div className="p-6 h-full flex flex-col">
                  <h2 className={`text-xl font-bold mb-3 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {project.name}
                  </h2>
                  <p className={`mb-6 flex-grow ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {project.description || "No description. Probably coded this in a caffeine-fueled frenzy."}
                  </p>
                  <div className={`border-t ${isDarkMode ? 'border-white' : 'border-black'} pt-4`}>
                    <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" /> {project.stargazers_count || "0"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4" /> {project.language || "???"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {formatDate(project.created_at).split(',')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 flex justify-center items-center p-4 z-50 backdrop-blur-md bg-black/75"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            <div className={`rounded-lg max-w-3xl w-full relative animate-in fade-in overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'
              }`}>
              {/* Modal header with stripe design */}
              <div className={`h-2 w-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>

              <div className="p-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`absolute top-4 right-4 p-2 rounded-full border ${isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                    } transition-colors duration-300`}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-6">
                  <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {selectedProject.name}
                  </h3>

                  <p className={`text-lg italic ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {selectedProject.description || "No description. I was probably too tired to type more words."}
                  </p>

                  <div className="flex flex-wrap gap-6">
                    <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      <Star className="w-5 h-5 mr-2" /> {selectedProject.stargazers_count || "0"} stars
                    </div>
                    <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      <GitBranch className="w-5 h-5 mr-2" /> {selectedProject.forks_count || "0"} forks
                    </div>
                    <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      <Calendar className="w-5 h-5 mr-2" /> Created: {formatDate(selectedProject.created_at)}
                    </div>
                  </div>

                  <div className={`border-2 p-6 rounded-lg my-6 max-h-[50vh] overflow-y-auto ${isDarkMode ? 'border-white' : 'border-black'
                    }`}>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="relative h-16 w-16 mx-auto mb-6">
                          <div className={`absolute h-16 w-2 left-7 ${isDarkMode ? 'bg-white' : 'bg-black'} ${loadingAnimation === 0 ? 'opacity-100' : 'opacity-30'
                            }`}></div>
                          <div className={`absolute h-2 w-16 top-7 ${isDarkMode ? 'bg-white' : 'bg-black'} ${loadingAnimation === 1 ? 'opacity-100' : 'opacity-30'
                            }`}></div>
                          <div className={`absolute h-16 w-2 left-7 ${isDarkMode ? 'bg-white' : 'bg-black'} ${loadingAnimation === 2 ? 'opacity-100' : 'opacity-30'
                            }`}></div>
                          <div className={`absolute h-2 w-16 top-7 ${isDarkMode ? 'bg-white' : 'bg-black'} ${loadingAnimation === 3 ? 'opacity-100' : 'opacity-30'
                            }`}></div>
                        </div>
                        <p className={`italic text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          {getRandomLoadingMessage()}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`leading-relaxed ${isDarkMode ? 'text-white' : 'text-black'}`}
                        dangerouslySetInnerHTML={{
                          __html: selectedProject.overview || "No overview available. Just like my documentation skills."
                        }}
                      />
                    )}
                  </div>

                  <div className="flex justify-center pt-4">
                    <a
                      href={selectedProject.html_url || `https://github.com/adlard07/${selectedProject.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-8 py-3 rounded-none border-2 transition-all duration-300 ${isDarkMode
                        ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                        : 'bg-white text-black border-black hover:bg-black hover:text-white'
                        }`}
                    >
                      View on GitHub <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Modal footer with stripe design */}
              <div className={`h-2 w-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            </div>
          </div>
        )}
      </main>

      <footer className={`${isDarkMode ? 'border-white' : 'border-black'} border-t-2 p-6 mt-12`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
            Built with excessive amounts of caffeine, Spotify, Discord and questionable life choices
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            © {new Date().getFullYear()} - Code that somehow works
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectTiles;