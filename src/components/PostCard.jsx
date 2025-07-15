import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { User, Clock, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import authService from "../appwrite/auth"; // Import the function

function getWordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

function getReadTime(wordCount) {
  const wordsPerMinute = 200;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

function PostCard({ $id, title, featuredImage, $createdAt, userId, content }) {
  const [authorName, setAuthorName] = useState("Loading...");
  const [isSaved, setIsSaved] = useState(false);

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
    };

    fetchAuthor();

    // Check if this post is saved in localStorage
    const saved = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    setIsSaved(saved.includes($id));
  }, [userId, $id]);

  const handleSave = (e) => {
    e.preventDefault();
    let saved = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    if (saved.includes($id)) {
      saved = saved.filter((id) => id !== $id);
      setIsSaved(false);
    } else {
      saved.push($id);
      setIsSaved(true);
    }
    localStorage.setItem("savedBlogs", JSON.stringify(saved));
  };

  const wordCount = getWordCount(content);
  const readTime = getReadTime(wordCount);

  return (
    <Link to={`/post/${$id}`} className="block transform transition-all duration-300 hover:scale-[1.02] hover:z-10 w-full group">
      <div className="w-[320px] h-[420px] mx-auto relative">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full shadow-md dark:shadow-lg hover:shadow-lg transition-all duration-300 m-2">
          {/* Image Section */}
          <div className="h-[240px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            {/* Save/Bookmark Icon */}
            <button
              onClick={handleSave}
              aria-label={isSaved ? "Remove from Saved" : "Save for Later"}
              className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors ${isSaved ? "text-orange-500" : "text-gray-400"}`}
            >
              <Bookmark className={`w-6 h-6 ${isSaved ? "fill-orange-500" : "fill-none"}`} />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col justify-between h-[180px]">
            <h2 className="text-lg font-bold line-clamp-3 text-gray-800 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
              {title}
            </h2>
            {/* Read Time & Word Count */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {readTime} min read</span>
              <span className="flex items-center gap-1">· ✍️ {wordCount} words</span>
            </div>
            {/* Author & Timestamp */}
            <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 text-sm mt-2">
              <div className="flex items-center gap-1">
                <Link to={`/profile/${userId}`}
                  className="flex items-center gap-1 truncate max-w-[140px] text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate">{authorName}</span>
                </Link>
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
        <div className="absolute bottom-0 rounded-lg left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-90 transition-transform duration-500"/>
      </div>
    </Link>
  );
}

export default PostCard;
