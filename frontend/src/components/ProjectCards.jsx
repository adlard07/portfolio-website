import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectCards = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/repo_info');
                if (!response.ok) throw new Error('Failed to fetch repositories');

                const data = await response.json();
                if (!Array.isArray(data) || data.length === 0) throw new Error('No repositories found');

                setRepos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen text-white text-xl">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500 text-xl">Error: {error}</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-10 p-6 bg-gradient-to-t from-black via-zinc-900 to-zinc-800">
            <h2 className="text-5xl font-extrabold text-orange-500 tracking-wide uppercase">Projects</h2>
            {/* Added margin-top to push cards lower */}
            <div className="max-w-6xl w-full mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {repos.map((repo) => (
                        <Link
                            key={repo.id}
                            to={`/overview/${repo.name}`}  
                            className="glassmorphism p-6 rounded-xl transition transform hover:scale-105 hover:shadow-2xl bg-zinc-900/50 border border-zinc-700 backdrop-blur-lg">
                            <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
                            <p className="text-sm text-gray-400 mt-2">Owner: {repo.owner?.login || "Unknown"}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCards;
