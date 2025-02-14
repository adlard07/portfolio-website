import React, { useEffect, useState } from "react";
import { Loader2, ImageOff } from "lucide-react";

const Memes = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("https://meme-api.com/gimme/20");
                if (!response.ok) {
                    throw new Error("Failed to fetch memes");
                }
                const data = await response.json();
                setMemes(data.memes || []);
            } catch (error) {
                console.error("Error fetching memes:", error);
                setError(error.message);
                // Fallback memes
                setMemes([
                    { url: "https://i.redd.it/some-meme1.jpg" },
                    { url: "https://i.redd.it/some-meme2.jpg" },
                    { url: "https://i.redd.it/some-meme3.jpg" },
                    { url: "https://i.redd.it/some-meme4.jpg" },
                    { url: "https://i.redd.it/some-meme5.jpg" },
                    { url: "https://i.redd.it/some-meme6.jpg" },
                    { url: "https://i.redd.it/some-meme7.jpg" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchMemes();
    }, []);

    const MemeCard = ({ meme, index }) => {
        const [imageLoaded, setImageLoaded] = useState(false);
        const [imageError, setImageError] = useState(false);

        return (
            <div className="break-inside-avoid mb-4">
                <div className="relative group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20">
                    {/* Loading state */}
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                        </div>
                    )}
                    
                    {/* Error state */}
                    {imageError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-4">
                            <ImageOff className="w-8 h-8 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-500 text-center">Failed to load image</p>
                        </div>
                    )}
                    
                    {/* Image */}
                    <img
                        src={meme.url}
                        alt={`Meme ${index + 1}`}
                        className={`w-full h-auto object-cover transition-opacity duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-sm text-gray-300">Meme #{index + 1}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="py-16 bg-gray-950 w-full">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-8 h-1 bg-emerald-500 rounded-full" />
                        <h2 className="text-3xl font-bold text-white">Meme Gallery</h2>
                        <div className="w-8 h-1 bg-emerald-500 rounded-full" />
                    </div>
                    <p className="text-gray-400">A collection of my favorite memes</p>
                </div>

                {/* Gallery Container */}
                <div className="relative">
                    {loading ? (
                        <div className="h-[600px] flex items-center justify-center bg-gray-900 rounded-xl border border-gray-800">
                            <div className="flex flex-col items-center space-y-4">
                                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                                <p className="text-gray-400">Loading memes...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="h-[600px] flex items-center justify-center bg-gray-900 rounded-xl border border-gray-800">
                            <div className="text-center text-gray-400">
                                <p>Failed to load memes</p>
                                <p className="text-sm text-gray-500 mt-2">{error}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[600px] overflow-y-auto rounded-xl border border-gray-800 bg-gray-900 shadow-xl">
                            <div className="p-6">
                                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                                    {memes.map((meme, index) => (
                                        <MemeCard key={index} meme={meme} index={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Memes;