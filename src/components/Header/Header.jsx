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
  Newspaper,
  Search,
  Bell,
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
    { name: "News", slug: "/news", active: true, icon: Newspaper }
  ];

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/95 via-white/95 to-orange-50/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl border-b border-orange-200/30 dark:border-orange-800/20"></div>
      
      <Container>
        <nav className="relative flex items-center justify-between gap-6 py-4 px-6">
          <div className="flex-shrink-0">
            <Link to="/" className="group transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/20 rounded-xl">
              <div className="relative">
                <Logo width={50} />
                <div className="absolute inset-0 bg-orange-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {authStatus && (
            <>
              <div className="hidden lg:flex items-center gap-2">
                {navItems
                  .filter((item) => item.active && ["All Posts", "Add Post", "Saved Blogs"].includes(item.name))
                  .map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.slug}
                      onClick={handleNavigation}
                      className={({ isActive }) => `
                        group relative inline-flex items-center gap-3 px-5 py-3 rounded-2xl 
                        font-medium text-sm transition-all duration-300 hover:scale-[1.02]
                        ${isActive 
                          ? "bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 text-orange-700 dark:text-orange-300 shadow-lg shadow-orange-500/10" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-orange-50/60 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-300"
                        }
                      `}
                    >
                      <item.icon 
                        size={18} 
                        className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                      />
                      <span className="relative">
                        {item.name}
                        <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-300 ${
                          ({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}></div>
                      </span>
                    </NavLink>
                  ))}
              </div>

              <div className="flex-1 max-w-2xl mx-6">
                <div className="relative group">
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                  {/* <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-orange-200/50 dark:border-orange-800/30 rounded-2xl overflow-hidden"> */}
                    <Searchbar />
                  {/* </div> */}
                </div>
              </div>
            </>
          )}

          {!authStatus && (
            <ul className="hidden md:flex flex-grow justify-center items-center gap-2">
              {navItems
                .filter((item) => item.active && item.name !== "Login" && item.name !== "Signup")
                .map((item) => (
                  <li key={item.name}>
                    <NavLink to={item.slug} onClick={handleNavigation}>
                      {({ isActive }) => (
                        <div className={`
                          group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl 
                          font-medium text-sm transition-all duration-200 hover:scale-105
                          ${isActive
                            ? "bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 text-orange-700 dark:text-orange-300 shadow-sm"
                            : "text-orange-600 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:shadow-md"
                          }
                        `}>
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

          <div className="flex items-center gap-3">

            <button
              onClick={() => dispatch(toggleTheme())}
              className="relative group flex items-center justify-center p-3 rounded-2xl 
                       bg-gradient-to-br from-orange-100/60 to-orange-50/60 dark:from-orange-900/20 dark:to-orange-800/20 
                       border border-orange-200/40 dark:border-orange-800/30 
                       text-orange-600 dark:text-orange-300 
                       shadow-lg hover:shadow-xl hover:shadow-orange-500/10
                       transition-all duration-300 hover:scale-110 
                       hover:from-orange-200/60 hover:to-orange-100/60 
                       dark:hover:from-orange-800/30 dark:hover:to-orange-700/30
                       focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              aria-label="Toggle Theme"
            >
              <div className="relative w-5 h-5">
                {darkMode ? (
                  <LightModeIcon 
                    className="absolute inset-0 text-yellow-400 transition-all duration-500 ease-in-out transform rotate-0 scale-100 opacity-100 group-hover:rotate-12"
                    style={{ fontSize: '20px' }}
                  />
                ) : (
                  <DarkModeIcon 
                    className="absolute inset-0 text-slate-600 transition-all duration-300 opacity-100 rotate-0 scale-100 group-hover:-rotate-12" 
                    style={{ fontSize: '20px' }}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {!authStatus &&
              navItems
                .filter((item) => item.name === "Login" || item.name === "Signup")
                .map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) => `
                      group hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
                      font-semibold text-sm transition-all duration-300 hover:scale-105 
                      focus:outline-none focus:ring-2 focus:ring-orange-500/20
                      ${item.name === "Signup"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700"
                        : `${isActive ? "bg-orange-100 dark:bg-gray-700" : ""} text-orange-600 dark:text-orange-300 hover:bg-orange-100/60 dark:hover:bg-gray-700/60 border border-orange-200/60 dark:border-orange-800/60 shadow-md hover:shadow-lg`
                      }
                    `}
                  >
                    <span>{item.name}</span>
                    <item.icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  </NavLink>
                ))}

            {authStatus && (
              <>
                <div className="relative">
                  <BasicMenu setIsMenuOpen={setIsMenuOpen} />
                </div>
                
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="relative group p-3 rounded-2xl 
                           bg-gradient-to-br from-orange-100/60 to-orange-50/60 dark:from-orange-900/20 dark:to-orange-800/20 
                           text-orange-600 dark:text-orange-300 
                           hover:from-orange-200/60 hover:to-orange-100/60 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 
                           transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl
                           focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  aria-label="Toggle Sidebar"
                >
                  <div className="relative w-5 h-5">
                    {isSidebarOpen ? (
                      <X 
                        size={20} 
                        className="absolute inset-0 transition-all duration-300 opacity-100 rotate-0 scale-100 group-hover:rotate-90" 
                      />
                    ) : (
                      <Menu 
                        size={20} 
                        className="absolute inset-0 transition-all duration-300 opacity-100 rotate-0 scale-100 group-hover:scale-110" 
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </>
            )}

            {!authStatus && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-2xl 
                         bg-gradient-to-br from-orange-100/60 to-orange-50/60 dark:from-gray-800/60 dark:to-gray-700/60 
                         text-orange-600 dark:text-orange-300 
                         hover:from-orange-200/60 hover:to-orange-100/60 dark:hover:from-gray-700/60 dark:hover:to-gray-600/60 
                         transition-all duration-200 hover:scale-105 shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-orange-500/20"
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
          <div className="md:hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-md rounded-3xl border border-orange-200/30 dark:border-orange-800/20"></div>
            <div className="relative p-6 mt-4 mb-6">
              <ul className="flex flex-col gap-4">
                {navItems
                  .filter((item) => item.active)
                  .map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={handleNavigation}
                        className={({ isActive }) => `
                          group inline-flex items-center gap-3 px-6 py-4 rounded-2xl w-full
                          font-medium text-lg transition-all duration-300 hover:scale-[1.02]
                          ${isActive 
                            ? "bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 shadow-lg" 
                            : "text-orange-600 dark:text-orange-300 hover:bg-orange-50/60 dark:hover:bg-orange-900/20"
                          }
                        `}
                      >
                        <item.icon 
                          size={22} 
                          className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                        />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;