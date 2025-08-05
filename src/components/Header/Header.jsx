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
    <header id="sticky-header" className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#fffef9]/90 dark:bg-[#1f1f1f]/90 border-b border-orange-100/50 dark:border-gray-800/50 transition-all duration-300 shadow-sm">
      <Container>
       <nav className="flex items-center justify-between gap-6 py-3 px-4">
          <div className="flex-shrink-0">
            <Link to="/"
             className="group transition-transform duration-200 hover:scale-105"
            >
              
              <Logo width={50} />
            </Link>
          </div>

          {!authStatus && (
            <ul className="hidden md:flex flex-grow justify-center items-center gap-2">
              {navItems
                .filter((item) => item.active && item.name !== "Login" && item.name !== "Signup")
                .map((item) => (
                  <li key={item.name}>
                    <NavLink to={item.slug} onClick={handleNavigation}>
                      {({ isActive }) => (
                        <div
                          className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 ${
                            isActive
                              ? "bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 text-orange-700 dark:text-orange-300 shadow-sm"
                              : "text-orange-600 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:shadow-md"
                          }`}
                        >
                          <item.icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                          <span>{item.name}</span>
                          {isActive && (
                            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
                          )}
                        </div>
                      )}
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}

        {authStatus && (
            <div className="flex-1 max-w-md mx-4">
              <Searchbar />
            </div>
          )}

          <div className="flex items-center gap-3">
             <button
              onClick={() => dispatch(toggleTheme())}
  className="relative flex items-center justify-center p-2.5 rounded-full 
             bg-white/70 dark:bg-gray-800/70 backdrop-blur-md 
             border border-orange-200/30 dark:border-orange-800/30 
             text-orange-600 dark:text-orange-300 
             shadow-sm hover:shadow-lg 
             transition-all duration-300 hover:scale-110 hover:bg-orange-50/60 dark:hover:bg-gray-700/60"
  aria-label="Toggle Theme"        
            >
              <div className="relative w-5 h-5">
                {darkMode ? (
                  <LightModeIcon 
                   className="absolute inset-0 text-yellow-400 transition-all duration-500 ease-in-out transform rotate-0 scale-100 opacity-100"
                    style={{ fontSize: '20px' }}
                  />
                ) : (
                  <DarkModeIcon 
                    className="absolute inset-0 text-gray-400 transition-all duration-300 opacity-100 rotate-0 scale-100" 
                    style={{ fontSize: '20px' }}
                  />
                )}
              </div>
            </button>

            {!authStatus &&
              navItems
                .filter((item) => item.name === "Login" || item.name === "Signup")
                .map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      `group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 ${
                        item.name === "Signup"
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900/50 hover:from-orange-600 hover:to-orange-700"
                          : `${isActive ? "bg-orange-100 dark:bg-gray-700" : ""} text-orange-600 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-gray-700 border border-orange-200 dark:border-orange-800 shadow-sm hover:shadow-md`
                      }`
                    }
                  >
                    <span>{item.name}</span>
                    <item.icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  </NavLink>
                ))}

            {authStatus && (
              <>
                <BasicMenu setIsMenuOpen={setIsMenuOpen} />
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-gray-600 dark:to-gray-700 text-orange-600 dark:text-orange-300 hover:from-orange-200 hover:to-orange-300 dark:hover:from-gray-500 dark:hover:to-gray-600 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                  aria-label="Toggle Sidebar"
                >
                  <div className="relative w-5 h-5">
                    {isSidebarOpen ? (
                      <X 
                        size={20} 
                        className="absolute inset-0 transition-all duration-300 opacity-100 rotate-0 scale-100" 
                      />
                    ) : (
                      <Menu 
                        size={20} 
                        className="absolute inset-0 transition-all duration-300 opacity-100 rotate-0 scale-100" 
                      />
                    )}
                  </div>
                </button>
              </>
            )}

            {!authStatus && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-gradient-to-br bg-white/40 dark:from-gray-800 dark:to-gray-700 text-orange-600 dark:text-orange-300 hover:from-orange-100 hover:to-orange-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="Toggle Menu"
              >
                <div className="relative w-5 h-5">
                  {isMenuOpen ? (
                    <X 
                      size={20} 
                      className="absolute inset-0 transition-all duration-300 opacity-100 rotate-0 scale-100" 
                    />
                  ) : (
                    <MenuIcon 
                      className="absolute inset-0 transition-all duration-300 opacity-100 rotate-0 scale-100" 
                      style={{ fontSize: '20px' }}
                    />
                  )}
                </div>
              </button>
            )}
          </div>
        </nav>

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
                        `${isActive ? "bg-orange-200" : ""} 
                         inline-flex items-center gap-2 px-5 py-2 rounded-xl 
                         text-orange-800 font-medium hover:bg-orange-100 transition`
                      }
                    >
                      <item.icon size={20} />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              <li>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
