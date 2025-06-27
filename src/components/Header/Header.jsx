

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import Logo from "../Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const navLinks = [
    { name: "About Us", slug: "/about-us" },
    { name: "Events", slug: "/events" },
    { name: "Contact Us", slug: "/contact-us" },
  ];

  return (
       <header
      className="py-3 px-6 shadow-md 
      bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 
      dark:bg-gradient-to-r dark:from-gray-600 dark:via-gray-600 dark:to-gray-600 
      transition duration-300 w-full"
    >
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 mr-8">
          <Link to="/">
            <Logo width={50} />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex items-center justify-center space-x-10 flex-grow">
          {navLinks.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.slug}
                className={({ isActive }) =>
                  `${isActive ? "text-orange-600 font-bold" : "text-gray-800 dark:text-gray-200"} 
                  hover:text-orange-500 transition-colors font-medium`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Auth + Dark Mode */}
        <div className="flex items-center space-x-4">
          {!authStatus && (
            <>
              <NavLink
                to="/login"
                className="text-gray-800 dark:text-gray-100 hover:text-orange-600 font-medium"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
              >
                Sign up
              </NavLink>
            </>
          )}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 text-orange-600 dark:text-orange-400 bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full transition-transform duration-300 hover:scale-105"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>

          {/* Mobile menu button (optional) */}
          <button
            className="md:hidden p-1 ml-2 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon fontSize="large" className="text-orange-600" />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden mt-3">
          <ul className="space-y-4 flex flex-col items-start px-4">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-800 dark:text-gray-200 hover:text-orange-500 text-lg font-medium"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {!authStatus && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-600 font-medium"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 text-orange-600 dark:text-orange-400 bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full transition-transform duration-300 hover:scale-105"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;