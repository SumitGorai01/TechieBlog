import { useState, useEffect } from "react";
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

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false); // Close menu when screen width is lg or larger
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-800 dark:to-black shadow-lg rounded-full px-4 sm:px-6 py-2 flex items-center justify-between w-[95%] md:w-[90%] transition duration-300">
      <Link to="/">
        <Logo width={40} />
      </Link>

      {/* Navigation - Hidden on md, shown on lg */}
      <nav className="hidden lg:flex flex-wrap justify-center items-center gap-3 lg:gap-4">
        {navItems.map(
          (item) =>
            item.active && (
              <NavLink
                key={item.name}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-transform duration-200 ${
                    isActive ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`
                }
                to={item.slug}
              >
                <item.icon size={18} />
                <span className="hidden lg:inline-block">{item.name}</span>
              </NavLink>
            )
        )}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {authStatus && <div className="hidden lg:block"><Searchbar /></div>}
        
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform"
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        {/* Hamburger button - Hidden on lg, shown on md */}
        <button
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform md:flex lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile & md Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-2xl mt-2 w-64 p-4">
          <ul className="flex flex-col space-y-2 text-center">
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
