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
  Phone,
  Calendar,
  Menu,
  X,
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

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "About Us", slug: "/about-us", active: true, icon: Info },
    { name: "Events", slug: "/events", active: true, icon: Calendar },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: Files },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: FileEdit },
    { name: "FAQ", slug: "/faq", active: true, icon: HelpCircle },
    { name: "Feedback", slug: "/feedback", active: true, icon: MessageSquare },
    { name: "Contact Us", slug: "/contact-us", active: true, icon: Phone },
    { name: "Login", slug: "/login", active: !authStatus, icon: LogIn },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: UserPlus },
    { name: "Saved Blogs", slug: "/saved-blogs", active: authStatus, icon: Bookmark },
  ];

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <header
  id="sticky-header"
  className="w-full px-0 py-3 shadow-sm bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border-y border-gray-200 dark:border-white/10 transition duration-300 animate-slide-down"
>


        <Container>
          <nav className="flex justify-between gap-2 items-left">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <div className="animate-fade-in">
                  <Logo width={70} />
                </div>
              </Link>
            </div>

            <div className="flex flex-nowrap flex-grow items-baseline justify-center space-x-4 min-w-0">
              {authStatus && <Searchbar />}
              <ul className="flex flex-wrap items-baseline justify-center space-x-3 min-w-0">
                {!authStatus &&
                  navItems
                    .filter((item) => item.name !== "Login" && item.name !== "Signup")
                    .map(
                      (item) =>
                        item.active && (
                          <li key={item.name} className="animate-fade-in-delayed">
                            <NavLink
                              key={item.name}
                              to={item.slug}
                              onClick={handleNavigation}
                              className={({ isActive }) =>
                                `
                                relative inline-flex items-center gap-2 px-4 py-2 rounded-md
                                font-semibold text-orange-600 dark:text-gray-200
                                transition-all duration-300 ease-in-out
                                hover:scale-105 shimmer-hover
                                hover:bg-orange-50 dark:hover:bg-white/10
                                ${isActive ? "shimmer-hover-active bg-orange-50 dark:bg-white/10" : ""}
                              `
                              }
                            >
                              <item.icon size={18} />
                              {item.name}
                            </NavLink>
                          </li>
                        )
                    )}
                <li>
                  <NavLink
                    to="/saved-blogs"
                    className={({ isActive }) =>
                      `
                      relative inline-flex items-center gap-2 px-4 py-2 rounded-md
                      font-semibold text-orange-600 dark:text-gray-200
                      transition-all duration-300 ease-in-out
                      hover:scale-105 shimmer-hover
                      hover:bg-orange-50 dark:hover:bg-white/10
                      ${isActive ? "shimmer-hover-active bg-orange-50 dark:bg-white/10" : ""}
                    `
                    }
                  >
                    <Bookmark className="w-5 h-5" />
                    Saved Blogs
                  </NavLink>

                </li>
              </ul>
            </div>
            <div className="flex-1 flex items-center justify-end space-x-4">
             <button
  onClick={() => dispatch(toggleTheme())}
  className="hidden sm:inline-flex items-center justify-center w-10 h-10 text-orange-500 dark:text-white bg-white dark:bg-black/20 border dark:border-white/20 rounded-full hover:scale-105 hover:bg-orange-100 dark:hover:bg-white/10 transition"
  title="Toggle Dark Mode"
>
  {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
</button>


              {!authStatus &&
                navItems
                  .filter((item) => item.name === "Login" || item.name === "Signup")
                  .map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.slug}
                     className={({ isActive }) =>
  `inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition duration-200
   ${isActive ? "bg-orange-100 text-orange-600 dark:bg-orange-400/20 dark:text-orange-300" : "text-orange-600 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-white/10"}`
}

                    >
                      <item.icon size={18} />
                      {item.name}
                    </NavLink>
                  ))}

              {authStatus && (
                <button
                  className="text-orange-600 transition bg-yellow-100 rounded-full dark:bg-white/10 dark:text-white dark:backdrop-blur-md dark:border dark:border-white/20 hover:bg-orange-200 dark:hover:bg-white/20 dark:hover:border-white/30 dark:hover:text-orange-500"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden">
            <Link to="/">
              <Logo width={70} />
            </Link>

            {!authStatus && (
              <button
                className="p-1 ml-2 transition-colors rounded-lg dark:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <MenuIcon fontSize="large" className="text-orange-600 dark:text-white" />
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="mt-4 py-2">
                <ul className="mt-4 space-y-6 text-lg flex flex-col items-center">

                  {navItems.map((item, index) =>
                    item.active && (
                      <li
                        key={item.name}
                        className={`${index < 3 ? "md:hidden" : ""}`} // Hide the third item on small screens
                      >
                        <NavLink
                          className={({ isActive }) =>
  `inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
   ${isActive ? "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300" : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-white/10 hover:text-orange-600 dark:hover:text-orange-300"}`
                          }
                          to={item.slug}
                          onClick={() => handleNavigation()}
                        >
                          <item.icon size={20} className="" />
                          {item.name}
                        </NavLink>
                      </li>
                    )
                  )}

                  <li className="animate-fade-in-delayed">
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className="inline-block px-3 py-2 mr-3 font-semibold text-orange-600 transition-transform duration-300 bg-yellow-100 rounded-full shadow-md dark:text-white dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 hover:bg-orange-200 dark:hover:bg-white/20 dark:hover:border-white/30 dark:hover:text-orange-500 hover:scale-105"
                    >
                      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </Container>
      </header>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400 dark:border-white/10"></div>
        </div>
      </div>
    </>
  );
}

export default Header;
