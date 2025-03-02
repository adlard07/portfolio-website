import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ children }) => {
  const location = useLocation();
  const isProfessionalPage = location.pathname === "/professional";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-inter font-bebas font-playfair">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 leading-relaxed">
          <nav className="flex items-center justify-between h-16 text-2xl">
            <Link to="/" className="text-4xl tracking-wider word-spacing">
              ADLARD
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-14 tracking-widest">
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
            {/* Mobile Navigation: Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="hover:text-neutral-500 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Overlay & Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-white p-4 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <X className="w-8 h-8" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col space-y-4 text-xl">
            <Link
              to={isProfessionalPage ? "/" : "/professional"}
              className="hover:text-neutral-500 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              {isProfessionalPage ? "Just Another Portfolio" : "PROFESSIONAL"}
            </Link>
            <Link
              to="/projects"
              className="hover:text-neutral-500 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              PET PROJECTS
            </Link>
            <Link
              to="/memes"
              className="hover:text-neutral-500 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              MEMES
            </Link>
            <Link
              to="/books"
              className="hover:text-neutral-500 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              BOOKS
            </Link>
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Navbar;
