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
      } catch {
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group cursor-pointer h-[400px]" // Fixed height for all cards
    >
      <Link
        to={`/post/${$id}`}
        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col h-full"
      >
        {/* Image Section */}
        <div className="relative h-[180px] overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage, 400, 240)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Read Time & Word Count */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {readTime} min read
            </span>
            <span>· {wordCount} words</span>
          </div>

          {/* Author & Date */}
          <div className="flex items-center justify-between text-sm mt-auto">
            <Link
              to={`/profile/${userId}`}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{authorName}</span>
            </Link>
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {formatDistanceToNow(new Date($createdAt), { addSuffix: true })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleSave}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isSaved
                  ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500"
                  : "hover:bg-orange-100 dark:hover:bg-orange-900/20 text-slate-500 hover:text-orange-500"
              }`}
            >
              <BookmarkPlus className="w-4 h-4" />
              {isSaved ? "Saved" : "Save"}
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors text-slate-500 hover:text-orange-500 text-sm"
              onClick={(e) => {
                e.preventDefault();
                navigator.share?.({
                  title,
                  text: title,
                  url: window.location.origin + `/post/${$id}`,
                });
              }}
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
