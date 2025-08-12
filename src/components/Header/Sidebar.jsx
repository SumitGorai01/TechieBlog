import React, { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Files,
  FileEdit,
  HelpCircle,
  MessageSquare,
  Info,
  Phone,
  Calendar,
  Bookmark,
  X,
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

  // Close on outside click
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
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-300">
          <div
            ref={sidebarRef}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] 
                       bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
                       border-l border-orange-100/50 dark:border-orange-900/20
                       shadow-2xl z-50 transform translate-x-0 transition-transform duration-300"
          >
            <div className="flex items-center justify-between p-6 border-b border-orange-100/30 dark:border-orange-900/20">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <Logo width={40} />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-orange-50/50 dark:hover:bg-orange-900/20 
                           transition-colors duration-200"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 text-orange-700 dark:text-orange-300 border border-orange-200/50 dark:border-orange-700/30"
                          : "text-gray-700 dark:text-gray-300 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-400"
                      }`
                    }
                  >
                    <item.icon 
                      size={18} 
                      className="transition-colors duration-200" 
                    />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
                
                <Link
                  to="/saved-blogs"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl 
                           text-gray-700 dark:text-gray-300 hover:bg-orange-50/30 
                           dark:hover:bg-orange-900/10 hover:text-orange-600 
                           dark:hover:text-orange-400 transition-all duration-200"
                >
                  <Bookmark size={18} className="transition-colors duration-200" />
                  <span className="font-medium">Saved Blogs</span>
                </Link>
              </nav>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;