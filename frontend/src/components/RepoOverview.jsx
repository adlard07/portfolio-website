import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, Star, GitFork, Book, ArrowLeft, Loader2 } from 'lucide-react';

const RepoOverview = () => {
    const { repoName } = useParams();
    const [repo, setRepo] = useState(null);
    const [overview, setOverview] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingOverview, setLoadingOverview] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/repo_info`);
                if (!response.ok) throw new Error('Failed to fetch repository details');
                const data = await response.json();
                const repoData = data.find(repo => repo.name === repoName);
                if (!repoData) throw new Error('Repository not found');
                setRepo(repoData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchRepoOverview = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/overview/${repoName}`);
                if (!response.ok) throw new Error('Failed to fetch repository overview');
                const data = await response.json();
                setOverview(data.message);
            } catch (err) {
                setOverview('README.md not found or not accessible.');
            } finally {
                setLoadingOverview(false);
            }
        };

        fetchRepoDetails();
        fetchRepoOverview();
    }, [repoName]);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
    );

    if (error) return (
        <div className="text-center p-6 text-red-500 bg-red-100 rounded-lg">
            <p className="font-semibold">Error: {error}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
            </Link>
            
            <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <Github className="w-8 h-8 text-white" />
                        <h1 className="text-3xl font-bold text-white">{repo?.name || 'Repository'}</h1>
                    </div>
                </div>
                
                <div className="p-6">
                    {repo ? (
                        <div className="space-y-6">
                            <div className="bg-gray-900 rounded-lg p-4">
                                <h3 className="text-gray-400 text-sm font-medium mb-2">Description</h3>
                                <p className="text-white">{repo.description || 'No description available'}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-[#4A5D46]" />
                                        <span className="text-white font-medium">{repo.stargazers_count}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">Stars</p>
                                </div>
                                
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <GitFork className="w-5 h-5 text-[#4A5D46]" />
                                        <span className="text-white font-medium">{repo.forks_count}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">Forks</p>
                                </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-lg p-4">
                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                    <div>
                                        <h3 className="text-gray-400 text-sm font-medium mb-1">Primary Language</h3>
                                        <p className="text-white">{repo.language || 'Unknown'}</p>
                                    </div>
                                    <a 
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-[#4A5D46] text-white rounded-md hover:bg-[#3A4D36] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <Github className="w-4 h-4" />
                                        View on GitHub
                                    </a>
                                </div>
                            </div>

                            <div className="bg-gray-900 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Book className="w-5 h-5 text-[#4A5D46]" />
                                    <h3 className="text-xl font-semibold text-white">README Overview</h3>
                                </div>
                                {loadingOverview ? (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Loading README overview...</span>
                                    </div>
                                ) : (
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-gray-300">{overview}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-400 p-4 bg-red-950 rounded-lg">
                            Repository details not found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RepoOverview;