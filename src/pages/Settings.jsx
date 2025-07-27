import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, User, Lock } from "lucide-react";
import { useSelector } from "react-redux";

function Settings() {
    const user = useSelector((state) => state.auth.userData);
  const userId = user?.$id || "";
  const settingsItems = [
    {
      title: "Account Information",
      icon: <User size={20} />,
      path: `/profile/${userId}`,
    },
    {
      title: "Change Password",
      icon: <Lock size={20} />,
      path: "/change-password",
    },
  ];
  
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-500">
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {settingsItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 dark:text-gray-300">
                {item.icon}
              </span>
              <span className="text-gray-800 dark:text-gray-100">
                {item.title}
              </span>
            </div>
            <ArrowRight
              size={20}
              className="text-gray-400 dark:text-gray-500"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Settings;
