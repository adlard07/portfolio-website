import React, { useEffect, useState } from "react";
import { Loader2, ImageOff, RefreshCw, Heart, Share2 } from "lucide-react";

const fetchMemes = async (setMemes, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch("https://meme-api.com/gimme/20");
    const data = await response.json();

    // Add a delay of 300ms before setting the memes
    setTimeout(() => {
      setMemes(data.memes || []);
      setLoading(false);
    }, 300);

  } catch (error) {
    console.error("Oops! The meme gods have abandoned us:", error);
    setError("Meme API went on a coffee break. Try again later.");
    setLoading(false);
  }
};

const MemeTiles = ({ isDarkMode }) => {
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
    setLikes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleShare = async (meme) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this meme!",
          url: meme.url,
        });
      } catch (error) {
        console.error("Sharing failed. Blame it on the browser:", error);
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2
            className={`text-4xl font-bold mb-3 animate-fade-in ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            The Only Thing Keeping Me Sane Are These Memes
          </h2>
          <p
            className={`text-lg mb-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Just like my sleep schedule, these memes are fresh... I think.
          </p>
          <button
            onClick={handleRefresh}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-black text-white border-white"
                : "bg-white text-black border-black"
            } border hover:bg-opacity-80 transition-colors duration-200 shadow-sm group`}
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            <span>Summon More Memes</span>
          </button>
        </div>

        {loading ? (
          <div
            className={`h-30 flex items-center justify-center rounded-xl shadow-lg ${
              isDarkMode ? "bg-black" : "bg-white"
            }`}
          >
            <Loader2
              className={`w-8 h-8 animate-spin ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
            <p className={`${isDarkMode ? "text-white" : "text-black"} mt-3`}>
              Fetching memes... or debugging my life.
            </p>
          </div>
        ) : error ? (
          <div
            className={`h-30 flex flex-col items-center justify-center rounded-xl shadow-lg ${
              isDarkMode ? "bg-black" : "bg-white"
            }`}
          >
            <ImageOff
              className={`w-12 h-12 mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
            <p className={`${isDarkMode ? "text-white" : "text-black"}`}>
              {error}
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
            {memes.map((meme, index) => (
              <div
                key={index}
                className={`break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 mb-4 ${
                  isDarkMode ? "bg-black border-white" : "bg-white border-black"
                }`}
              >
                <div className="relative group">
                  <img
                    src={meme.url}
                    alt={`Meme ${index + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 border-t">
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Posted by u/
                    {meme.author || "anonymous (like my dating life)"}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={() => toggleLike(index)}
                      className="flex items-center transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 mr-1 ${
                          likes[index]
                            ? "fill-white text-white"
                            : isDarkMode
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                      {likes[index] ? "Liked" : "Like"}
                    </button>
                    <button
                      onClick={() => handleShare(meme)}
                      className="flex items-center transition-colors"
                    >
                      <Share2
                        className={`w-5 h-5 mr-1 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      />
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
