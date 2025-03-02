import React from "react";
import Navbar from "../components/Header";
import ProjectTiles from "../components/Projects/ProjectTiles";

const Projects = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen mt-15 bg-gray-100">
                <ProjectTiles />
            </div>
        </div>
    );
};

export default Projects;