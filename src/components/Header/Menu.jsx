import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BasicMenu from "./Menu"; // Your dropdown avatar menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600">
            TechieBlog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-orange-500">Home</Link>
            <Link to="/about-us" className="text-gray-800 dark:text-gray-200 hover:text-orange-500">About</Link>
            <Link to="/events" className="text-gray-800 dark:text-gray-200 hover:text-orange-500">Events</Link>
            <Link to="/contact-us" className="text-gray-800 dark:text-gray-200 hover:text-orange-500">Contact</Link>
            <BasicMenu />
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-orange-600 focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md px-4 pt-2 pb-4 space-y-2 animate-slide-down">
          <Link to="/" onClick={closeMenu} className="block text-gray-800 dark:text-gray-200 hover:text-orange-500">Home</Link>
          <Link to="/about-us" onClick={closeMenu} className="block text-gray-800 dark:text-gray-200 hover:text-orange-500">About</Link>
          <Link to="/events" onClick={closeMenu} className="block text-gray-800 dark:text-gray-200 hover:text-orange-500">Events</Link>
          <Link to="/contact-us" onClick={closeMenu} className="block text-gray-800 dark:text-gray-200 hover:text-orange-500">Contact</Link>
          <div className="pt-2">
            <BasicMenu />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
