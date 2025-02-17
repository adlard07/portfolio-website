import { React, useState} from "react";
import { Menu } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/90 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold text-white">woltex</a>

                {/* Mobile menu button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Navigation items */}
                <div className={`${isOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto bg-black/90 md:bg-transparent flex-col md:flex-row items-center gap-6 p-4 md:p-0`}>
                    <a href="#" className="text-white hover:text-[#4A5D46] transition-colors">My account</a>
                    <a href="#" className="text-white hover:text-[#4A5D46] transition-colors">My cart [0]</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;