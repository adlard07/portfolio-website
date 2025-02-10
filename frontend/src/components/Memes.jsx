import React, { useEffect, useState } from "react";

const Memes = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await fetch("https://meme-api.com/gimme/20");
                const data = await response.json();
                setMemes(data.memes || []);
            } catch (error) {
                console.error("Error fetching memes:", error);
                setMemes([
                    { url: "https://i.redd.it/some-meme1.jpg" },
                    { url: "https://i.redd.it/some-meme2.jpg" },
                    { url: "https://i.redd.it/some-meme3.jpg" },
                    { url: "https://i.redd.it/some-meme4.jpg" },
                    { url: "https://i.redd.it/some-meme5.jpg" }
                ]);
            }
        };
        fetchMemes();
    }, []);

    return (
        <section className="py-16 bg-black w-full p-6">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                    Memes
                </h2>

                {/* Scrollable fixed-height container */}
                <div className="w-full h-[600px] overflow-y-auto scrollbar-hide p-6 border border-black rounded-lg shadow-lg bg-black">
                    {/* Masonry grid layout */}
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {memes.map((meme, index) => (
                            <div key={index} className="break-inside-avoid overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={meme.url}
                                    alt={`Meme ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Memes;
