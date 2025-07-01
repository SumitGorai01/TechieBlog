import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import Logo from "../Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    const navLinks = [
        { name: "About Us", slug: "/about-us" },
        { name: "Events", slug: "/events" },
        { name: "Feedback", slug: "/feedback" }, // Added Feedback link
        { name: "FAQ", slug: "/faq" },           // Added FAQ link
        { name: "Contact Us", slug: "/contact-us" },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            className="py-3 px-4 sm:px-6 shadow-md
            bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100
            dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-800 dark:to-gray-800
            transition-colors duration-300 w-full z-10 relative"
        >
            <nav className="flex items-center justify-between w-full max-w-7xl mx-auto">
                {/* Left: Logo */}
                <div className="flex items-center flex-shrink-0 mr-4 sm:mr-8">
                    <Link to="/" onClick={closeMenu}>
                        <Logo width={50} />
                    </Link>
                </div>

                {/* Center: Navigation Links (Desktop) */}
                <ul className="hidden md:flex items-center justify-center space-x-6 lg:space-x-10 flex-grow">
                    {navLinks.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.slug}
                                className={({ isActive }) =>
                                    `${isActive ? "text-orange-600 font-bold" : "text-gray-800 dark:text-gray-200"}
                                    hover:text-orange-500 transition-colors font-medium text-base lg:text-lg`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right: Auth + Dark Mode + Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                    {/* Desktop Auth Links */}
                    {!authStatus && (
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink
                                to="/login"
                                className="text-gray-800 dark:text-gray-100 hover:text-orange-600 font-medium"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="bg-orange-600 text-white px-4 py-1.5 rounded-md hover:bg-orange-700 transition" // Changed to orange-600
                            >
                                Sign up
                            </NavLink>
                        </div>
                    )}

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="p-2 text-orange-600 dark:text-orange-400 bg-yellow-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 rounded-full transition-transform duration-300 hover:scale-105" // Adjusted colors
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </button>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-1 rounded-lg transition-colors z-50"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <CloseIcon fontSize="large" className="text-gray-800 dark:text-gray-200" />
                        ) : (
                            <MenuIcon fontSize="large" className="text-orange-600" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <div
                className={`fixed inset-0 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out md:hidden z-20
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col items-start pt-20 px-8 space-y-6">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.slug}
                            onClick={closeMenu}
                            className="text-gray-800 dark:text-gray-200 hover:text-orange-500 text-2xl font-semibold w-full py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    {!authStatus && (
                        <>
                            <NavLink
                                to="/login"
                                onClick={closeMenu}
                                className="text-gray-800 dark:text-gray-200 hover:text-orange-600 font-semibold text-2xl w-full py-2 border-b border-gray-200 dark:border-gray-700"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                onClick={closeMenu}
                                className="bg-orange-600 text-white text-center px-6 py-3 rounded-lg hover:bg-orange-700 transition w-full text-2xl font-bold mt-4" // Changed to orange-600
                            >
                                Sign up
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;