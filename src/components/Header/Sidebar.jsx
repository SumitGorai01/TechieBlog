import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
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

function Sidebar({ isOpen, setIsOpen }) {
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const navItems = [
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: Files },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: FileEdit },
    { name: "FAQ", slug: "/faq", active: true, icon: HelpCircle },
    { name: "Feedback", slug: "/feedback", active: true, icon: MessageSquare },
    { name: "About Us", slug: "/about-us", active: true, icon: Info },
    { name: "Events", slug: "/events", active: true, icon: Calendar },
    { name: "Contact Us", slug: "/contact-us", active: true, icon: Phone },
  ];

  if (!authStatus) return null;

  return (
    <aside
      className={`fixed 
      top-[58%] sm:top-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 
      w-11/12 sm:w-60 lg:w-80 md:w-60 h-auto max-h-[85vh] overflow-y-auto 
      bg-gradient-to-t from-yellow-100 via-orange-100 to-red-100 
      dark:bg-gradient-to-t dark:from-gray-800 dark:via-gray-800 dark:to-black 
      p-4 shadow-lg transition-transform duration-300 
      ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} 
      z-50 rounded-xl`}
    >
      {/* Logo */}
      <h2 className="flex justify-center mb-4">
        <Logo width={50} />
      </h2>

      {/* Nav Items */}
      <ul className="space-y-4">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name} className="animate-fade-in-delayed">
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-yellow-100 dark:bg-gray-600 shadow-md" : ""
                    } flex items-center justify-center md:justify-start gap-4 px-4 py-2 
                    rounded-full text-orange-600 dark:text-orange-400 
                    hover:bg-orange-200 dark:hover:bg-gray-700 
                    transition-transform duration-300 hover:scale-105`
                  }
                  to={item.slug}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="hidden md:inline">{item.name}</span>
                </NavLink>
              </li>
            )
        )}
      </ul>

      {/* Dark Mode Toggle */}
      <div className="mt-8 md:hidden">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-full px-2 py-2 text-orange-600 dark:text-orange-400 font-semibold 
          bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 
          rounded-full shadow-md transition-transform duration-300 hover:scale-105 
          flex items-center justify-center"
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
