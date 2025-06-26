/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Settings, User, Moon } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import Avatar from "@mui/material/Avatar";
import { toggleTheme } from "../../store/themeSlice";

// const ThemeToggle = () => {
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector((state) => state.theme.darkMode);

//   return (
//     <button
//       onClick={() => dispatch(toggleTheme())}
//       className={`
//         relative inline-flex items-center justify-center
//         w-12 h-6 rounded-full transition-colors duration-200 ease-in-out
//         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
//         ${isDarkMode ? "bg-orange-700" : "bg-orange-200"}
//       `}
//       aria-label="Toggle theme"
//     >
//       <span
//         className={`
//           absolute left-1 transform transition-transform duration-200
//           ${isDarkMode ? "translate-x-6" : "translate-x-0"}
//         `}
//       ></span>
//       <span
//         className={`
//           absolute w-4 h-4 rounded-full transition-colors duration-200
//           ${isDarkMode ? "bg-gray-900 left-7" : "bg-white left-1"}
//         `}
//       />
//     </button>
//   );
// };

export default function BasicMenu() {
  const user = useSelector((state) => state.auth.userData);
  const username = user?.name || "User";
  const userId = user?.$id || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative ml-3 md:ml-0 animate-fade-in">
      <button onClick={toggleMenu} className="p-0 min-w-auto">
        <Avatar
          sx={{
            bgcolor: "#ea580c",
            width: 40,
            height: 40,
            fontSize: 18,
          }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black border border-orange-200 dark:border-gray-700 rounded-xl shadow-lg transition duration-300 animate-slide-down z-50">
          <div className="py-2">
            <p className="font-semibold text-gray-800 dark:text-gray-100 mb-0 px-4 transition duration-300">
              {username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-0 px-4 transition duration-300">
              Welcome back!
            </p>
          </div>
          <div className="border-t border-orange-200 dark:border-gray-700 transition duration-300"></div>
          <div>
            <Link to={`/profile/${userId}`}>
              <div
                className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-200/50 dark:hover:bg-gray-800 transition duration-300 cursor-pointer"
                onClick={toggleMenu}
              >
                <User size={18} className="mr-3" />
                Profile
              </div>
            </Link>
            {/* Theme Toggle Section */}
            {/* <div className="flex items-center justify-between px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-200/50 dark:hover:bg-gray-800 transition duration-300">
              <div className="flex items-center">
                { Using Moon icon as a static indicator }
                <Moon size={18} className="mr-3" />
                Dark mode
              </div>
              <ThemeToggle />
            </div> */}
            <Link to="/settings">
              <div
                className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-orange-200/50 dark:hover:bg-gray-800 transition duration-300 cursor-pointer"
                onClick={toggleMenu}
              >
                <Settings size={18} className="mr-3" />
                Settings
              </div>
            </Link>
          </div>
          <div className="border-t border-orange-200 dark:border-gray-700 transition duration-300"></div>
          <div>
            <div
              className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-800 transition duration-300 cursor-pointer"
              onClick={toggleMenu}
            >
              <LogoutBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
