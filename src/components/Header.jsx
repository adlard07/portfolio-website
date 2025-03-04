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

const Navbar = ({ children, isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const isProfessionalPage = location.pathname === "/professional";

  const socialLinks = [
    {
      icon: faGithub,
      href: "https://github.com/adlard07",
      label: "GitHub",
    },
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
      if (e.key === "Escape" && connectModalOpen) {
        closeConnectModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [connectModalOpen]);

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

            <div className="hidden md:flex items-center gap-10 tracking-wider">
              <Link
                to={isProfessionalPage ? "/" : "/professional"}
                className="text-md uppercase hover:text-gray-500 transition-colors"
              >
                {isProfessionalPage ? "Home" : "Professional"}
              </Link>

              <button
                onClick={openConnectModal}
                className="text-md uppercase hover:text-gray-500 transition-colors"
              >
                Connect
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transform transition-all duration-400 hover:scale-110 ${
                  isDarkMode ? "bg-white text-black" : "bg-black text-white"
                } shadow-lg`}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transform transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "bg-white text-black" : "bg-black text-white"
                } shadow-lg`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="hover:text-gray-500 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {connectModalOpen && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
            animateModal ? "opacity-100" : "opacity-0"
          } ${isDarkMode ? "bg-black/70" : "bg-black/50"}`}
          onClick={closeConnectModal}
        >
          <div
            className={`w-full max-w-md rounded-2xl shadow-2xl p-10 relative transition-all duration-300 transform ${
              animateModal ? "scale-100 opacity-100" : "scale-90 opacity-0"
            } ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeConnectModal}
              className="absolute top-4 right-4 transition-colors duration-200 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
              <p className="mb-8 italic text-sm">
                "Debugging life, one connection at a time"
              </p>

              <a
                href="mailto:adelarddcunha07@gmail.com"
                className="group inline-flex items-center justify-center w-full mb-8 transition-colors"
              >
                <span className="mr-2 text-lg">adelarddcunha07@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex gap-8 justify-center items-center border-t pt-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl transition-colors ${
                      link.color || ""
                    } ${isDarkMode ? "text-white" : "text-black"}`}
                    aria-label={link.label}
                  >
                    <FontAwesomeIcon icon={link.icon} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default Navbar;
