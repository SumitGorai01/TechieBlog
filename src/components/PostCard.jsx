import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Loading from './loaders/Loading';
import { Link } from "react-router-dom";
import { User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import authService from "../appwrite/auth"; // Import the function

function PostCard({ $id, title, featuredImage, $createdAt, userId }) {
  const [authorName, setAuthorName] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        if (userId) {
          console.log("Fetching author name for user ID:", userId);
          
          const name = await authService.getUserNameById(userId);
          setAuthorName(name);
        }
      } catch (error) {
        console.log("Error fetching author:", error);
        setAuthorName("Unknown User");
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchAuthor();
  }, [userId]);

  return (
    <Link to={`/post/${$id}`} className="block transform transition-all duration-300 hover:scale-[1.02] hover:z-10 w-full">
      <div className="w-[340px] h-[400px] mx-auto relative group">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full 
          shadow-md dark:shadow-lg hover:shadow-lg transition-all duration-300 m-2">
          
          {/* Image Section */}
          <div className="h-[240px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-700 
                group-hover:scale-110 group-hover:rotate-1"
            />
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col justify-between h-[160px]">
            <h2 className="text-lg font-bold line-clamp-3 text-gray-800 dark:text-gray-100
              group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
              {title}
            </h2>

            {/* Author & Timestamp */}
            <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="truncate max-w-[120px]">{authorName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="truncate max-w-[100px]">
                  {formatDistanceToNow(new Date($createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 
          transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
      </div>
    </Link>
  );
}

export default PostCard;
