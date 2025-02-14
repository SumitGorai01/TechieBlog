import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LogIn,
  UserPlus,
  Files,
  FileEdit,
  HelpCircle,
  MessageSquare,
  Info,
  Phone,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "../../store/themeSlice";
import Sidebar from "./Sidebar.jsx";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus, icon: LogIn },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: UserPlus },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: Files },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: FileEdit },
    { name: "FAQ", slug: "/faq", active: true, icon: HelpCircle },
    { name: "Feedback", slug: "/feedback", active: true, icon: MessageSquare },
    { name: "About Us", slug: "/about-us", active: true, icon: Info },
    { name: "Events", slug: "/events", active: true, icon: Calendar },
    { name: "Contact Us", slug: "/contact-us", active: true, icon: Phone },
  ];

  return (
    <header className="border border-black fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-800 dark:to-black shadow-lg rounded-full px-6 py-3 flex items-center justify-between w-[90%] transition duration-300 mb-16">
      <Link to="/">
        <Logo width={40} />
      </Link>

      {/* Desktop Navigation (Hidden on sm & md) */}
      <ul className="hidden lg:flex justify-center items-center space-x-4">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "bg-gray-200 dark:bg-gray-700" : ""} flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-transform duration-300 hover:scale-105`
                  }
                  to={item.slug}
                >
                  <item.icon size={18} />
                  {item.name}
                </NavLink>
              </li>
            )
        )}
      </ul>

      {/* Actions (Always Visible) */}
      <div className="flex items-center space-x-4">
        {/* Search Bar (md and larger screens) */}
        {authStatus && <div className="hidden md:block"><Searchbar /></div>}

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform"
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        {/* Hamburger Menu (Visible on sm & md, Hidden on lg) */}
        <button
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Toggle (Visible only when logged in, md & larger screens) */}
        {/* {authStatus && (
          <button
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform hidden md:block"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )} */}
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-2xl mt-2 w-64 p-4">
          <ul className="flex flex-col space-y-4 text-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      className={({ isActive }) =>
                        `${isActive ? "bg-gray-300 dark:bg-gray-700" : ""} flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition`
                      }
                      to={item.slug}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

    </header>
  );
}

export default Header;
