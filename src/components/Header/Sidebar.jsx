import React, { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Files,
  FileEdit,
  HelpCircle,
  MessageSquare,
  Info,
  Phone,
  Calendar,
  Bookmark,
} from "lucide-react";
import Logo from "../Logo";

const navItems = [
  { name: "All Posts", slug: "/all-posts", icon: Files },
  { name: "Add Post", slug: "/add-post", icon: FileEdit },
  { name: "FAQ", slug: "/faq", icon: HelpCircle },
  { name: "Feedback", slug: "/feedback", icon: MessageSquare },
  { name: "About Us", slug: "/about-us", icon: Info },
  { name: "Events", slug: "/events", icon: Calendar },
  { name: "Contact Us", slug: "/contact-us", icon: Phone },
];

function Sidebar({ isOpen, setIsOpen }) {
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  // ⛳ Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";

    };
  }, [isOpen, setIsOpen]);

  if (!authStatus) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300">
          
          <div
            ref={sidebarRef}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-11/12 sm:w-64 md:w-72 lg:w-80 max-h-[85vh] overflow-y-auto 
                       bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl 
                       p-6 z-50 animate-slide-in"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <Logo width={50} />
              </Link>
            </div>

            {/* Navigation */}
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-xl font-medium 
                      transition-all duration-200 ${
                        isActive
                          ? "bg-orange-100 dark:bg-gray-700 shadow-md"
                          : "hover:bg-orange-50 dark:hover:bg-gray-800"
                      } text-orange-600 dark:text-orange-300`
                    }
                  >
                    <item.icon size={18} />
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/saved-blogs"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl font-medium 
                             hover:bg-orange-50 dark:hover:bg-gray-800 
                             text-orange-600 dark:text-orange-300 transition-all"
                >
                  <Bookmark size={18} />
                  Saved Blogs
                </Link>
              </li>
            </ul>

            {/* Theme Toggle
            <div className="mt-6">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 
                           rounded-full font-semibold transition-all 
                           bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 
                           dark:hover:bg-gray-600 text-orange-600 dark:text-orange-300"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                Toggle Theme
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
