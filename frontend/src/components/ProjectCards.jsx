import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';

const ProjectCards = () => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/repo_info');
                if (!response.ok) throw new Error('Failed to fetch repositories');

                const data = await response.json();
                if (!Array.isArray(data) || data.length === 0) throw new Error('No repositories found');

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
        setFilteredRepos(
            repos.filter(repo => repo.name.toLowerCase().includes(query))
        );
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
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
            {/* Search Box Container */}
            <div className="relative w-full max-w-lg mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search repositories..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-800 bg-gray-900 text-white 
                             placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 
                             focus:border-emerald-500/50 transition-all"
                />
            </div>

            {/* Projects Container */}
            <div className="w-full max-w-6xl h-[600px] overflow-y-auto rounded-xl p-8 bg-gray-900 
                          shadow-xl border border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRepos.length > 0 ? (
                        filteredRepos.map((repo) => (
                            <Link
                                key={repo.id}
                                to={`/overview/${repo.name}`}
                                className="group relative p-6 rounded-xl bg-gray-950 border border-gray-800 
                                         hover:border-emerald-500/30 transition-all duration-300 
                                         hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 rounded-l-xl 
                                              group-hover:h-full group-hover:bg-emerald-500/30 transition-all duration-300" />
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 
                                                 transition-colors">{repo.name}</h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">Owner:</span>
                                        <span className="text-sm text-gray-400">{repo.owner?.login || "Unknown"}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                            <p className="text-lg">No matching repositories found</p>
                            <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCards;