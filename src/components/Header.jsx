import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faReddit,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const isProfessionalPage = location.pathname === "/professional";

  const socialLinks = [
    { icon: faGithub, href: "https://github.com/adlard07", label: "GitHub" },
    {
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/adelard-dcunha-6186b0216/",
      label: "LinkedIn",
      color: "text-[#0A66C2]",
    },
    {
      icon: faTwitter,
      href: "https://x.com/BotlordWithB",
      label: "Twitter",
      color: "text-[#1DA1F2]",
    },
    {
      icon: faReddit,
      href: "https://www.reddit.com/user/Vast_Excitement_945/",
      label: "Reddit",
      color: "text-[#FF4500]",
    },
    {
      icon: faStackOverflow,
      href: "https://stackoverflow.com/users/23564658/adlard",
      label: "Stack Overflow",
      color: "text-[#F48024]",
    },
  ];

  const openConnectModal = () => {
    setConnectModalOpen(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeConnectModal = () => {
    setAnimateModal(false);
    setTimeout(() => setConnectModalOpen(false), 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        closeConnectModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="font-mono">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isDarkMode
            ? "bg-black/40 text-white"
            : "bg-white/40 text-black backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 leading-relaxed">
          <nav className="flex items-center justify-between h-16 text-2xl">
            <Link to="/" className="text-5xl tracking-wider font-bold">
              adelard
            </Link>

            <div className="hidden md:flex items-center gap-10 tracking-widest">
              <Link
                to="/"
                className="text-md uppercase hover:opacity-70 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/professional"
                className="text-md uppercase hover:opacity-70 transition-colors"
              >
                Professional
              </Link>

              <Link
                to="/projects"
                className="text-md uppercase hover:opacity-70 transition-colors tracking-wider"
              >
                Projects
              </Link>

              <button
                onClick={openConnectModal}
                className="text-md uppercase hover:opacity-70 transition-colors"
              >
                Connect
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transform transition-all duration-400 hover:scale-110 shadow-lg ${
                  isDarkMode ? "bg-white text-black" : "bg-black text-white"
                }`}
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transform transition-all duration-300 hover:scale-110 shadow-lg ${
                  isDarkMode ? "bg-white text-black" : "bg-black text-white"
                }`}
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="hover:opacity-70 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar for Mobile Navigation */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-64 h-full p-6 shadow-md transition-transform duration-500 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="transition-colors hover:opacity-70"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-sm uppercase">
            <Link
              to="/"
              className="text-md uppercase hover:opacity-70 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/professional"
              className="text-md uppercase hover:opacity-70 transition-colors"
            >
              Professional
            </Link>
            <Link
              to="/projects"
              className="text-md uppercase hover:opacity-70 transition-colors"
            >
              Projects
            </Link>

            <button
              onClick={() => {
                setSidebarOpen(false);
                openConnectModal();
              }}
              className="text-left hover:opacity-70 transition-colors"
            >
              Connect
            </button>
          </nav>
        </div>
      </div>

      {/* Connect Modal */}
      {connectModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDarkMode ? "bg-black/50" : "bg-black/30"
          } backdrop-blur-sm transition-opacity duration-300 ${
            animateModal ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeConnectModal}
        >
          <div
            className={`${
              isDarkMode
                ? "bg-black border border-white text-white"
                : "bg-white border border-black text-black"
            } p-8 rounded-xl shadow-lg transform transition-transform duration-300 ${
              animateModal ? "scale-100" : "scale-95"
            } w-full max-w-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h3 className="text-3xl font-bold">Connect with me</h3>
              <button
                onClick={closeConnectModal}
                className="hover:opacity-70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 py-4 px-6 rounded-lg border ${
                    isDarkMode ? "border-white" : "border-black"
                  } group hover:bg-black hover:text-white transition-all duration-200`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                      isDarkMode ? "border-white" : "border-black"
                    } ${link.color || ""} group-hover:text-white`}
                  >
                    <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-lg font-medium">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ))}
            </div>

            {/* Footer */}
            <div
              className={`mt-8 pt-4 border-t text-center text-sm ${
                isDarkMode
                  ? "border-white text-neutral-400"
                  : "border-black text-gray-600"
              }`}
            >
              Feel free to reach out on any platform above!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
