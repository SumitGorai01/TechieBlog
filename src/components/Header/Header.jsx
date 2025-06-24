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
} from "lucide-react";
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import BasicMenu from "./Menu.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "../../store/themeSlice";
import Sidebar from "./Sidebar.jsx";
import { Menu, X } from "lucide-react"; // Import Menu (☰) and X (✖) icons

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar is open by default

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: LogIn,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: UserPlus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: Files,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: FileEdit,
    },
    {
      name: "FAQ",
      slug: "/faq",
      active: true,
      icon: HelpCircle,
    },
    {
      name: "Feedback",
      slug: "/feedback",
      active: true,
      icon: MessageSquare,
    },
    {
      name: "About Us",
      slug: "/about-us",
      active: true,
      icon: Info,
    },
    {
      name: "Events",
      slug: "/events",
      active: true,
      icon: Calendar,
    },
    {
      name: "Contact Us",
      slug: "/contact-us",
      active: true,
      icon: Phone,
    },
  ];

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        id="sticky-header"
        className="py-2 px-6 shadow-md bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 
  dark:bg-gradient-to-r dark:from-gray-600 dark:via-gray-600 dark:to-gray-600 
  transition duration-300 animate-slide-down border md:rounded-full md:mx-10 md:my-3  "
      >

        <Container>
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <div className="animate-fade-in">
                  <Logo width={50} />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex justify-center items-center w-full space-x-4">
              {authStatus && <Searchbar />}
              {!authStatus &&
                navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name} className="animate-fade-in-delayed">
                        <NavLink
                          className={({ isActive }) =>
                            `${isActive &&
                            "bg-yellow-100 dark:bg-gray-600 shadow-md "
                            } relative group overflow-hidden inline-flex items-center gap-2 px-5 py-2 text-orange-600 font-semibold hover:bg-orange-200 rounded-full transition-transform duration-300 hover:scale-105 dark:text-orange-400 dark:hover:bg-gray-700`
                          }
                          to={item.slug}
                          onClick={() => handleNavigation()}
                        >
                          <span className="absolute block rotate-45 bg-slate-100 h-32 w-3 left-0 bg-opacity-0 group-hover:bg-opacity-35 group-hover:animate-waving-hand"></span>
                          <item.icon size={18} />
                          {item.name}
                        </NavLink>
                      </li>
                    )
                )}

            </ul>

            <ul className="flex justify-end items-center space-x-5">
              {" "}
              <li className="animate-fade-in-delayed ">
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="hidden sm:inline-block px-2 justify-end ml-16 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
              </li>
              {authStatus && <BasicMenu setIsMenuOpen={setIsMenuOpen}/>}
              {/* Sidebar (Only if user is logged in) */}
              {authStatus && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
              {/* Header */}
              {authStatus && (
                <button
                  className="text-orange-600 bg-yellow-100 dark:bg-gray-500 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-gray-700 p-2 rounded-full transition"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              )}
            </ul>

            {/* Mobile Menu Button */}
            {!authStatus && (
              <button
                className="md:hidden p-1 ml-2 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <MenuIcon fontSize="large" className="text-orange-600" />
              </button>
            )}
          </nav>

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
                            `${isActive ? "bg-orange-300" : ""} 
          w-full inline-flex items-center gap-2 px-6 py-2 text-orange-800 
          font-semibold hover:bg-orange-200 rounded-lg transition-colors`
                          }
                          to={item.slug}
                          onClick={() => handleNavigation()}
                        >
                          <item.icon size={20} />
                          {item.name}
                        </NavLink>
                      </li>
                    )
                  )}

                  <li className="animate-fade-in-delayed">
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className="inline-block px-2 mr-3 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
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
          <div className="w-full border-t border-gray-400  dark:border-gray-400"></div>
        </div>
      </div>
    </>
  );
}

export default Header;
