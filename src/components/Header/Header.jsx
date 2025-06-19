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
    <>
      <header
        id="sticky-header"
        className="py-2 px-6 shadow-md bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 
        dark:bg-gradient-to-r dark:from-gray-600 dark:via-gray-600 dark:to-gray-600 
        transition duration-300 animate-slide-down border lg:rounded-full md:mx-2 md:my-3"
      >
        <Container>
<nav className="flex items-center justify-between w-full">
  {/* Left: Logo */}
  <Link to="/">
    <div className="animate-fade-in">
      <Logo width={50} />
    </div>
  </Link>

  {/* Center: Nav links */}
  <ul className="hidden lg:flex items-center space-x-4">
    {navItems.map(
      (item) =>
        item.active && (
          <li key={item.name} className="animate-fade-in-delayed">
            <NavLink
              className={({ isActive }) =>
                `${isActive && "bg-yellow-100 dark:bg-gray-600 shadow-md"} relative group overflow-hidden inline-flex items-center gap-2 px-4 py-2 text-orange-600 font-semibold hover:bg-orange-200 rounded-full transition-transform duration-300 hover:scale-105 dark:text-orange-400 dark:hover:bg-gray-700`
              }
              to={item.slug}
              onClick={handleNavigation}
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          </li>
        )
    )}
  </ul>

  {/* Right: Theme, Search, Sidebar, Mobile Menu */}
  <div className="flex items-center space-x-2">
    {authStatus && <Searchbar />}
    <button
      onClick={() => dispatch(toggleTheme())}
      className="hidden lg:inline-flex p-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
    >
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </button>

    {authStatus && <BasicMenu />}
    {authStatus && <Sidebar isOpen={isSidebarOpen} />}
    {authStatus && (
      <button
        className="text-orange-600 bg-yellow-100 dark:bg-gray-500 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-gray-700 p-2 rounded-full transition"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    )}

    {/* Mobile Menu */}
    {!authStatus && (
      <button
        className="lg:hidden p-1 rounded-lg transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"

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
          `${isActive ? "bg-transparent border-orange-600" : "border-transparent"} 
          w-full inline-flex items-center gap-2 px-6 py-2 text-orange-400
          font-semibold border hover:border-orange-500 rounded-lg transition-colors`
        }
        to={item.slug}
        onClick={() => handleNavigation()}

      >
        <MenuIcon fontSize="large" className="text-orange-600" />
      </button>
    )}
  </div>
</nav>


          {/* Mobile Menu (only visible on md and down) */}
          {isMenuOpen && (
            <div className="block lg:hidden w-full px-4">
              <div className="mt-4 py-2 w-full">
                <ul className=" text-lg flex flex-col items-center">
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <li key={item.name}>
                          <NavLink
                            className={({ isActive }) =>
                              `${isActive ? "bg-orange-300" : ""} w-full inline-flex items-center gap-2 px-6 py-2 text-orange-800 font-semibold hover:bg-orange-200  transition-colors`
                            }
                            to={item.slug}
                            onClick={handleNavigation}
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
                      className="inline-block px-2 mr-3 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 shadow-md transition-transform duration-300 hover:scale-105"
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
          <div className="w-full border-t border-gray-400 dark:border-gray-400"></div>
        </div>
      </div>
    </>
  );
}

export default Header;
