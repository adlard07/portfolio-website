import React, { useEffect, useState } from "react";
import { Loader2, ImageOff, RefreshCw, Heart, Share2 } from "lucide-react";

const fetchMemes = async (setMemes, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);
    const response = await fetch("https://meme-api.com/gimme/20");
    const data = await response.json();
    setMemes(data.memes || []);
  } catch (error) {
    console.error("Oops! The meme gods have abandoned us:", error);
    setError("Meme API went on a coffee break. Try again later.");
  } finally {
    setLoading(false);
  }
};

const MemeTiles = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchMemes(setMemes, setLoading, setError);
  }, []);

  const handleRefresh = () => {
    fetchMemes(setMemes, setLoading, setError);
  };

  const toggleLike = (index) => {
    setLikes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShare = async (meme) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this meme!',
          url: meme.url
        });
      } catch (error) {
        console.error("Sharing failed. Blame it on the browser:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 animate-fade-in">
            The Only Thing Keeping Me Sane: Memes
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Just like my sleep schedule, these memes are fresh... I think.
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 shadow-sm group"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            <span>Summon More Memes</span>
          </button>
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center bg-white rounded-xl shadow-lg">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            <p className="text-gray-500 mt-3">Fetching memes... or debugging my life.</p>
          </div>
        ) : error ? (
          <div className="h-96 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg">
            <ImageOff className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {memes.map((meme, index) => (
              <div
                key={index}
                className="break-inside-avoid rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 mb-4"
              >
                <div className="relative group">
                  <img
                    src={meme.url}
                    alt={`Meme ${index + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </div>
                <div className="p-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Posted by u/{meme.author || "anonymous (like my dating life)"}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <button 
                      onClick={() => toggleLike(index)} 
                      className="text-gray-500 hover:text-red-500 transition-colors flex items-center"
                    >
                      <Heart className={`w-5 h-5 mr-1 ${likes[index] ? "fill-red-500 text-red-500" : ""}`} />
                      {likes[index] ? "Liked" : "Like"}
                    </button>
                    <button 
                      onClick={() => handleShare(meme)} 
                      className="text-gray-500 hover:text-blue-500 transition-colors flex items-center"
                    >
                      <Share2 className="w-5 h-5 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeTiles;
