import { useState } from "react";
import { Container } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, UserPlus, Files, FileEdit, HelpCircle, MessageSquare, Info, Mail, Phone,Calendar} from "lucide-react"; 
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import BasicMenu from "./Menu.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from '../../store/themeSlice'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

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
    <header className="py-3 shadow  transition duration-300 animate-slide-down"   style={{ background: "#17192c" }}>
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <div className="animate-fade-in">
                <Logo width={50} />
              </div>
            </Link>

            {authStatus && <Searchbar />}
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex ml-auto space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="animate-fade-in-delayed">
                    <NavLink
                      className={({ isActive }) =>
                        `${
                          isActive &&
                          "bg-yellow-100 dark:bg-gray-800 shadow-md "
                        } inline-flex items-center gap-2 px-6 py-2 text-orange-600 font-semibold hover:bg-orange-200 rounded-full transition-transform duration-300 hover:scale-105 dark:text-orange-400 dark:hover:bg-gray-700`
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
            {!authStatus && (
              <li className="animate-fade-in-delayed">
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="inline-block px-6 mr-3 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
              </li>
            )}
          </ul>

          {authStatus && <BasicMenu />}

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
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive && "bg-orange-300"
                            } w-full inline-flex items-center gap-2 px-6 py-2 text-orange-800 font-semibold hover:bg-orange-200 rounded-lg transition-colors`
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
                    className="inline-block px-6 mr-3 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
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
  );
}

export default Header;