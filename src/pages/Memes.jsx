import React from "react";
import Navbar from "../components/Header";
import MemesTiles from "../components/Memes/MemeTiles";

const Memes = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen py-24 bg-gray-100">
                <MemesTiles />
            </div>
        </div>
    );
};

export default Memes;