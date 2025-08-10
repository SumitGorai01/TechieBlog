import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { User, Clock, BookmarkPlus, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import authService from "../appwrite/auth";

function getWordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

function getReadTime(wordCount) {
  const wordsPerMinute = 200;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

const PostCard = ({ $id, title, featuredImage, $createdAt, userId, content }) => {
  const [authorName, setAuthorName] = useState("Loading...");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        if (userId) {
          const name = await authService.getUserNameById(userId);
          setAuthorName(name);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthorName("Unknown User");
      }
    };

    fetchAuthor();

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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <Link
        to={`/post/${$id}`}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 h-full flex flex-col"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage, 400, 240)}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Read Time & Word Count */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {readTime} min read
            </span>
            <span>· {wordCount} words</span>
          </div>

          {/* Author & Date */}
          <div className="flex items-center justify-between mt-auto">
            <Link
              to={`/profile/${userId}`}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400"
            >
              <User className="w-4 h-4" />
              <span>{authorName}</span>
            </Link>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {formatDistanceToNow(new Date($createdAt), { addSuffix: true })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleSave}
              className={`p-2 rounded-lg transition-colors ${
                isSaved
                  ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500"
                  : "hover:bg-orange-100 dark:hover:bg-orange-900/20 text-slate-500 hover:text-orange-500"
              }`}
            >
              <BookmarkPlus className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors text-slate-500 hover:text-orange-500">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
