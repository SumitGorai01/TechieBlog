import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Settings, User } from 'lucide-react';
import LogoutBtn from './LogoutBtn';
import Avatar from '@mui/material/Avatar';

export default function BasicMenu() {
  const username = useSelector((state) => state.auth.userData.name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative ml-3 md:ml-0">
      <button
        onClick={toggleMenu}
        className="px-5 min-w-auto"
      >
        <Avatar
          sx={{
            bgcolor: '#ea580c',
            width: 40,
            height: 40,
            fontSize: 18,
          }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white bg-opacity-90 backdrop-blur-xl border border-opacity-30 rounded-xl shadow-lg z-50">
          <div className="py-2">
            <p className="font-semibold text-gray-800 mb-0">{username}</p>
            <p className="text-sm text-gray-500 mb-0">Welcome back!</p>
          </div>
          <div className="border-t border-gray-200"></div>
          <div>
            <Link to="/profile">
              <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={toggleMenu}>
                <User size={18} className="mr-3" />
                Profile
              </div>
            </Link>
            <Link to="/settings">
              <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={toggleMenu}>
                <Settings size={18} className="mr-3" />
                Settings
              </div>
            </Link>
          </div>
          <div className="border-t border-gray-200"></div>
          <div>
            <div
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
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
