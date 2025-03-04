import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faReddit, faStackOverflow } from "@fortawesome/free-brands-svg-icons";

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
      color: "hover:text-black"
    },
    { 
      icon: faLinkedin, 
      href: "https://www.linkedin.com/in/adelard-dcunha-6186b0216/",
      label: "LinkedIn",
      color: "hover:text-[#0A66C2]"
    },
    { 
      icon: faTwitter, 
      href: "https://x.com/BotlordWithB",
      label: "Twitter",
      color: "hover:text-[#1DA1F2]"
    },
    { 
      icon: faReddit, 
      href: "https://www.reddit.com/user/Vast_Excitement_945/",
      label: "Reddit",
      color: "hover:text-[#FF4500]"
    },
    { 
      icon: faStackOverflow, 
      href: "https://stackoverflow.com/users/23564658/adlard",
      label: "Stack Overflow",
      color: "hover:text-[#F48024]"
    }
  ];

  const openConnectModal = () => {
    setConnectModalOpen(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeConnectModal = () => {
    setAnimateModal(false);
    setTimeout(() => setConnectModalOpen(false), 300);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && connectModalOpen) {
        closeConnectModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [connectModalOpen]);

  return (
    <div className="font-mono">
      <header className="fixed top-0 left-0 right-0 bg-transparent/40 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 leading-relaxed">
          <nav className="flex items-center justify-between h-16 text-2xl">
            <Link to="/" className="text-5xl tracking-wider font-bold">
              adelard
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10 tracking-wider">
              <Link
                to={isProfessionalPage ? "/" : "/professional"}
                className="text-md uppercase hover:text-neutral-500 transition-colors"
              >
                {isProfessionalPage ? "Home" : "Professional"}
              </Link>
              {/* <Link to="/about-me" className="text-md uppercase hover:text-neutral-500 transition-colors">
                About Me
              </Link> */}
              
              {/* Connect Button */}
              <button 
                onClick={openConnectModal}
                className="text-md uppercase hover:text-neutral-500 transition-colors"
              >
                <span className="relative z-10">Connect</span>
              </button>
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transform transition-all duration-400 hover:scale-110 ${
                  isDarkMode ? "bg-white text-black" : "bg-black text-white"
                } shadow-lg`}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              
            </div>
            
            {/* Mobile Navigation */}
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
                className="hover:text-neutral-500 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Connect Modal */}
      {connectModalOpen && (
        <div 
          className={`fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 
            transition-opacity duration-300 ${animateModal ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeConnectModal}
        >
          <div 
            className={`bg-white w-full max-w-md rounded-2xl shadow-2xl p-10 relative 
              transform transition-all duration-300 
              ${animateModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeConnectModal}
              className="absolute top-4 right-4 text-neutral-500 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Let's Connect</h2>
              <p className="text-neutral-600 mb-8 italic text-sm">
                "Debugging life, one connection at a time"
              </p>

              <a
                href="mailto:adelarddcunha07@gmail.com"
                className="group inline-flex items-center justify-center w-full mb-8 text-neutral-700 hover:text-black transition-colors"
              >
                <span className="mr-2 text-lg">adelarddcunha07@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="flex gap-8 justify-center items-center border-t pt-8 border-neutral-200">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-neutral-500 ${link.color} transition-colors text-2xl`}
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

      {/* Existing Mobile Sidebar (simplified) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-white p-6 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-sm uppercase">
            {[
              { to: isProfessionalPage ? "/" : "/professional", label: isProfessionalPage ? "Home" : "Professional" },
              // { to: "/about-me", label: "About Me" },
              { to: "", label: "Connect", onClick: openConnectModal }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => {
                  setSidebarOpen(false);
                  link.onClick && link.onClick();
                }}
                className="hover:text-neutral-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Navbar;