import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
                if (!response.ok) {
                    throw new Error('Failed to fetch repository details');
                }
                const data = await response.json();
                const repoData = data.find(repo => repo.name === repoName);
                if (!repoData) {
                    throw new Error('Repository not found');
                }
                setRepo(repoData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchRepoOverview = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/overview/${repoName}`); // Fixed to GET

                if (!response.ok) {
                    throw new Error('Failed to fetch repository overview');
                }

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

    if (loading) return <div className="text-center text-white">Loading repository details...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-white text-center mb-6">{repo?.name || 'Repository'}</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
                {repo ? (
                    <>
                        <p><strong>Owner:</strong> {repo.owner?.login || 'Unknown'}</p>
                        <p><strong>Description:</strong> {repo.description || 'No description available'}</p>
                        <p><strong>Stars:</strong> ⭐ {repo.stargazers_count}</p>
                        <p><strong>Forks:</strong> 🍴 {repo.forks_count}</p>
                        <p><strong>Language:</strong> {repo.language || 'Unknown'}</p>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline mt-4 block">
                            View on GitHub
                        </a>
                        <h3 className="text-2xl font-semibold mt-6">📖 README Overview</h3>
                        {loadingOverview ? (
                            <p className="text-gray-300 mt-2">Loading README overview...</p>
                        ) : (
                            <p className="text-gray-300 mt-2">{overview}</p>
                        )}
                    </>
                ) : (
                    <p className="text-red-400">Repository details not found.</p>
                )}
                <Link to="/" className="mt-4 block text-gray-400 underline">⬅ Back to Projects</Link>
            </div>
        </div>
    );
};

export default RepoOverview;
