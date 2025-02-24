import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ children }) => {
  const location = useLocation();
  const isProfessionalPage = location.pathname === "/professional";

  return (
    <div className="font-inter font-bebas font-playfair">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 leading-relaxed">
          <nav className="flex items-center justify-between h-16 text-2xl">
            <Link to="/" className="text-4xl">
              ADLARD
            </Link>
            <div className="flex items-center gap-14 tracking-widest">
              <Link
                to={isProfessionalPage ? "/" : "/professional"}
                className="hover:text-neutral-500 transition-colors"
              >
                {isProfessionalPage ? "Just Another Portfolio" : "PROFESSIONAL"}
              </Link>
              <Link to="/projects" className="hover:text-neutral-500 transition-colors">
                PET PROJECTS
              </Link>
              <Link to="/memes" className="hover:text-neutral-500 transition-colors">
                MEMES
              </Link>
              <Link to="/books" className="hover:text-neutral-500 transition-colors">
                BOOKS
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
