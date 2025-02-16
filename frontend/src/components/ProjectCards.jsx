import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, Github, Star, GitFork, Calendar, ArrowUpRight } from "lucide-react";

const ProjectCard = ({ repo }) => {
  return (
    <Link
      to={`/overview/${encodeURIComponent(repo.name)}`}
      className="group relative p-6 rounded-xl bg-gray-950 border border-gray-800 
                hover:border-emerald-500/30 transition-all duration-300 
                hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Accent line with animation */}
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 rounded-l-xl 
                    group-hover:h-full group-hover:bg-emerald-500/30 transition-all duration-300" />
      
      <div className="space-y-4 relative">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 
                       transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-400 
                                transition-colors transform group-hover:translate-x-1 
                                group-hover:-translate-y-1 duration-300" />
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px]">
          {repo.description || "No description available"}
        </p>

        <div className="flex flex-wrap gap-2">
          {repo.topics?.slice(0, 3).map((topic) => (
            <span key={topic} 
                  className="px-2 py-1 text-xs rounded-full bg-emerald-900/30 text-emerald-400 
                           border border-emerald-500/20">
              {topic}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-gray-400">
              <Star className="w-4 h-4" />
              <span className="text-sm">{repo.stars || 0}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <GitFork className="w-4 h-4" />
              <span className="text-sm">{repo.forks || 0}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(repo.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProjectCards = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("updated");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/repo_info");
        if (!response.ok) throw new Error(`Failed to fetch repositories (Status: ${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response format from API");
        setRepos(data);
        setFilteredRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    filterAndSortRepos(query, sortBy);
  };

  const handleSort = (type) => {
    setSortBy(type);
    filterAndSortRepos(search, type);
  };

  const filterAndSortRepos = (query, sortType) => {
    let filtered = repos.filter((repo) => 
      repo.name.toLowerCase().includes(query) ||
      (repo.description || "").toLowerCase().includes(query) ||
      (repo.topics || []).some(topic => topic.toLowerCase().includes(query))
    );

    filtered.sort((a, b) => {
      switch (sortType) {
        case "stars":
          return (b.stars || 0) - (a.stars || 0);
        case "forks":
          return (b.forks || 0) - (a.forks || 0);
        case "updated":
        default:
          return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });

    setFilteredRepos(filtered);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-emerald-400 animate-pulse">Loading projects...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen text-red-400 space-x-2">
      <span className="text-xl">Error:</span>
      <span className="bg-red-950/50 px-3 py-1 rounded-lg">{error}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-950 w-full">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-800 bg-gray-900 text-white 
                       placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 
                       focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Sort by:</span>
            {["updated", "stars", "forks"].map((type) => (
              <button
                key={type}
                onClick={() => handleSort(type)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all
                          ${sortBy === type 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-emerald-500/30"}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Repository Grid */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                <p className="text-lg">No matching projects found</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;