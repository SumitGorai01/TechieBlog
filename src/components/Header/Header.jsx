import { useState } from "react";
import { Container } from "../index";
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
  Mail,
  Phone,
  Calendar,
  Bookmark,
} from "lucide-react";
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import BasicMenu from "./Menu.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "../../store/themeSlice";
import Sidebar from "./Sidebar.jsx";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus, icon: LogIn },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: UserPlus },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: Files },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: FileEdit },
    { name: "Saved Blogs", slug: "/saved-blogs", active: authStatus, icon: Bookmark },
    { name: "FAQ", slug: "/faq", active: true, icon: HelpCircle },
    { name: "Feedback", slug: "/feedback", active: true, icon: MessageSquare },
    { name: "About Us", slug: "/about-us", active: true, icon: Info },
    { name: "Events", slug: "/events", active: true, icon: Calendar },
    { name: "Contact Us", slug: "/contact-us", active: true, icon: Phone },
  ];

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      id="glassy-navbar"
      className="w-full fixed top-0 left-0 z-[1000] py-3 px-4 backdrop-blur-xl bg-white/20 dark:bg-[#1f1f1f]/30 border-b border-white/30 dark:border-gray-700 shadow-lg transition-all duration-300"
      style={{
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        borderBottom: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <Container>
        <nav className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo width={50} />
            </Link>
          </div>

          {/* Center nav - only if not logged in */}
          {!authStatus && (
            <ul className="hidden md:flex flex-grow justify-center items-center gap-6">
              {navItems
                .filter((item) => item.active && item.name !== "Login" && item.name !== "Signup")
                .map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      onClick={handleNavigation}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-colors duration-300
                        ${isActive ? "bg-white/30 dark:bg-gray-700 shadow-md border border-white/30 dark:border-gray-700" : ""}
                        text-orange-600 dark:text-orange-300 hover:bg-white/40 dark:hover:bg-gray-600 hover:text-orange-500 dark:hover:text-orange-400`
                      }
                    >
                      {item.name === "FAQ"
                        ? <item.icon size={18} className="text-orange-500" />
                        : <item.icon size={18} />}
                      {item.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}

          {/* Searchbar - only when logged in */}
         {authStatus && <Searchbar />}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 border border-white/30 dark:border-gray-700 rounded-full bg-white/20 dark:bg-gray-800 hover:bg-white/30 dark:hover:bg-gray-700 shadow-md transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? <LightModeIcon className="text-orange-500" /> : <DarkModeIcon />}
            </button>

            {/* Login / Signup */}
            {!authStatus &&
              navItems
                .filter((item) => item.name === "Login" || item.name === "Signup")
                .map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      `hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-colors duration-300
                      ${isActive ? "bg-white/30 dark:bg-gray-700 shadow-md border border-white/30 dark:border-gray-700" : ""}
                      text-orange-600 dark:text-orange-300 hover:bg-white/40 dark:hover:bg-gray-600 hover:text-orange-500 dark:hover:text-orange-400`
                    }
                  >
                    {item.name}
                    <item.icon size={18} />
                  </NavLink>
                ))}

            {/* Authenticated menu */}
            {authStatus && (
              <>
                <BasicMenu setIsMenuOpen={setIsMenuOpen} />
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-full text-orange-600 dark:text-orange-300 bg-white/20 dark:bg-gray-800 border border-white/30 dark:border-gray-700 shadow-md hover:bg-white/30 dark:hover:bg-gray-700 transition"
                  aria-label="Toggle Sidebar"
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}

            {/* Mobile menu button */}
            {!authStatus && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 ml-2 text-orange-600 bg-white/20 border border-white/30 rounded-full shadow-md hover:bg-white/30 transition"
                aria-label="Toggle Menu"
              >
                <MenuIcon fontSize="large" />
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {!authStatus && isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col items-center gap-4 text-lg">
              {navItems
                .filter((item) => item.active)
                .map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      onClick={handleNavigation}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-colors duration-300
                        ${isActive ? "bg-white/30 dark:bg-gray-700 shadow-md border border-white/30 dark:border-gray-700" : ""}
                        text-orange-600 dark:text-orange-300 hover:bg-white/40 dark:hover:bg-gray-600 hover:text-orange-500 dark:hover:text-orange-400`
                      }
                    >
                      <item.icon size={20} />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              <li>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="p-2 rounded-full bg-white/20 dark:bg-gray-800 border border-white/30 dark:border-gray-700 text-orange-600 dark:text-orange-300 shadow-md hover:bg-white/30 dark:hover:bg-gray-700 transition"
                  style={{ color: !darkMode ? '#f59e42' : undefined }}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
