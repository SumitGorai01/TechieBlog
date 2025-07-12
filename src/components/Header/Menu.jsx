import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Settings, User } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import Avatar from "@mui/material/Avatar";

export default function BasicMenu() {
  const user = useSelector((state) => state.auth.userData);
  const username = user?.name || "User";
  const userId = user?.$id || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu if click occurs outside of the menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative ml-3 md:ml-0 animate-fade-in">
      <button onClick={toggleMenu} className="p-0 min-w-auto">
        <Avatar
          sx={{
            bgcolor: "#ea580c",
            width: 44,
            height: 44,
            fontSize: 18,
            border: "2px solid white",
    boxShadow: "0 0 0 2px #facc15",
    transition: "transform 0.3s ease-in-out",
    '&:hover'
      transform: 'scale(1.1)',

      .techie-blog {
  padding: 40px;
  text-align: center;
}

.techie-blog h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.techie-blog p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.blog-posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.blog-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.blog-card:hover {
  transform: scale(1.05);
}

.blog-card img {
  max-width: 100%;
  border-radius: 8px;
}

.blog-card h3 {
  font-size: 1.5em;
  margin: 10px 0;
}

.blog-card p {
  font-size: 1em;
  color: #555;
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.read-more:hover {
  background-color: #0056b3;
}

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
            {/* Future theme toggle section can go here */}
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
          <div className="absolute right-0 mt-2 w-56 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-orange-200 dark:border-gray-700 rounded-xl menu-dropdown animate-slide-down z-50">
          <div>
            <div
              className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-800 transition duration-300 cursor-pointer"
              onClick={toggleMenu}
            >
              <LogoutBtn />
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
