import React from "react";
import Navbar from "../components/Header";
import BookTiles from "../components/Books/BookTile";

const Memes = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen py-24 bg-gray-100">
                <BookTiles />
            </div>
        </div>
    );
};

export default Memes;