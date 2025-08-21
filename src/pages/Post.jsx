// src/pages/Post.js
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { format, formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  Bookmark,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Edit3,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container } from "../components";
import Loading from "../components/loaders/Loading";
import MarkdownDisplay from "../components/MarkdownDisplay";
import Comments from "./Comments";

function getWordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

function getReadTime(wordCount) {
  const wordsPerMinute = 200;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

export default function Post() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isSavedLocal, setIsSavedLocal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const contentRef = useRef(null);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData?.$id === post?.userId;

  // --- Fetch Post ---
  useEffect(() => {
    async function fetchPost() {
      try {
        if (!slug) {
          navigate("/");
          return;
        }
        const fetchedPost = await appwriteService.getPost(slug);
        if (!fetchedPost) throw new Error("Post not found");
        setPost(fetchedPost);

        const user = await authService.getUserNameById(fetchedPost.userId);
        setAuthor(user || "Unknown Author");
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    }
    fetchPost();
  }, [slug, navigate]);

  // --- Likes ---
 const handleLike = async () => { if (!userData) { Swal.fire("Error", "You need to be logged in to like a post", "error"); return; } try { setIsLiking(true); const updatedPost = await appwriteService.addLikes( post.$id, userData.$id ); if (updatedPost) { setPost(updatedPost); setLikes(updatedPost.likedBy.length); setIsLiked(updatedPost.likedBy.includes(userData.$id)); } } catch { Swal.fire("Error", "Failed to like the post", "error"); } finally { setIsLiking(false); } };
  // --- Save Local ---
  useEffect(() => {
    if (post && post.$id) {
      const saved = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
      setIsSavedLocal(saved.includes(post.$id));
    }
  }, [post]);

  const handleSaveLocal = (e) => {
    e.preventDefault();
    if (!post?.$id) return;
    let saved = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    if (saved.includes(post.$id)) {
      saved = saved.filter((id) => id !== post.$id);
      setIsSavedLocal(false);
    } else {
      saved.push(post.$id);
      setIsSavedLocal(true);
    }
    localStorage.setItem("savedBlogs", JSON.stringify(saved));
  };

  // --- Save to Cloud ---
  const saveForLater = async () => {
    if (!userData) return;
    try {
      const updated = await appwriteService.toggleSave(post.$id, userData.$id);
      setPost(updated);
      setIsSaved(updated.savedBy?.includes(userData.$id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- Delete Post ---
  const deletePost = async () => {
    const confirm = await Swal.fire({
      title: "Delete Post?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (confirm.isConfirmed) {
      try {
        await appwriteService.deletePost(post.$id);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- Share ---
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire("Link copied!", "", "success");
    }
  };

  // --- Extract TOC ---
  useEffect(() => {
    if (!contentRef.current) return;
    const nodes = contentRef.current.querySelectorAll("h1, h2, h3");
    const newHeadings = Array.from(nodes).map((el) => {
      if (!el.id) el.id = el.innerText.toLowerCase().replace(/\s+/g, "-");
      return {
        level: Number(el.tagName.replace("H", "")),
        text: el.innerText,
        id: el.id,
      };
    });
    setHeadings(newHeadings);
  }, [post?.content]);

  // --- Scroll Spy ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!post) return <Loading />;

  const wordCount = getWordCount(post.content);
  const readTime = getReadTime(wordCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        <div className="py-8 max-w-7xl mx-auto grid grid-cols-12 gap-8">
          {/* Sidebar TOC */}
          <aside className="col-span-3 hidden lg:block sticky top-24 self-start bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md h-fit max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-orange-600">
              Contents
            </h2>
            <ul className="space-y-2 text-sm">
              {headings.map((h, i) => (
                <li
                  key={i}
                  onClick={() => scrollToHeading(h.id)}
                  className={`cursor-pointer ml-${(h.level - 1) * 4} ${
                    activeId === h.id
                      ? "text-orange-600 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-orange-500"
                  }`}
                >
                  {h.text}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Post */}
          <div className="col-span-12 lg:col-span-9">
            <motion.article
              className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100/50 dark:border-gray-700/50 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Hero Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={appwriteService.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Save Local */}
                <motion.button
                  onClick={handleSaveLocal}
                  aria-label={
                    isSavedLocal ? "Remove from Saved" : "Save for Later"
                  }
                  className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-xl transform transition-all duration-200 ${
                    isSavedLocal
                      ? "bg-orange-500/90 text-white shadow-orange-500/25"
                      : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark
                    className={`w-5 h-5 transition-all ${
                      isSavedLocal
                        ? "fill-white"
                        : "fill-none hover:fill-orange-500/20"
                    }`}
                  />
                </motion.button>
              </div>

              {/* Post Content */}
              <div className="p-8 lg:p-12">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <motion.div
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200/50 dark:border-orange-800/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      {author}
                    </span>
                  </motion.div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {format(new Date(post.$createdAt), "MMMM d, yyyy")}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Updated{" "}
                    {formatDistanceToNow(new Date(post.$updatedAt), {
                      addSuffix: true,
                    })}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Eye className="w-4 h-4 text-orange-500" />
                      {readTime} min read
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {wordCount} words
                    </span>
                  </div>
                </div>

                {/* Title */}
                <motion.h1 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-orange-800 dark:from-white dark:via-gray-200 dark:to-orange-300 bg-clip-text text-transparent leading-tight">
                  {post.title}
                </motion.h1>

                {/* Markdown Body */}
                <motion.div
                  ref={contentRef}
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  <MarkdownDisplay content={post.content} />
                </motion.div>
              </div>

              {/* Bottom Action Bar */}
              <motion.div
                className="px-8 lg:px-12 py-6 bg-gradient-to-r from-orange-50/50 via-white/50 to-orange-50/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50 border-t border-orange-100 dark:border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Share */}
                    <motion.button
                      onClick={sharePost}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Share</span>
                    </motion.button>

                    {/* Like */}
                    {userData && (
                      <motion.button
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                          isLiked
                            ? "bg-red-500 text-white shadow-red-500/25"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {" "}
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isLiked ? "fill-white" : "fill-none"
                          }`}
                        />{" "}
                        <span className="text-sm font-medium">{likes}</span>{" "}
                      </motion.button>
                    )}

                    {/* Comments Count */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Comments</span>
                    </div>
                  </div>

                  {/* Author Controls */}
                  {isAuthor && (
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/edit-post/${post.$id}`}
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm hover:shadow-md hover:shadow-green-500/25 transition-all duration-200 transform hover:scale-105"
                      >
                        <Edit3 className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        <span className="text-sm font-medium">Edit</span>
                      </Link>

                      <motion.button
                        onClick={deletePost}
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md hover:shadow-red-500/25 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        <span className="text-sm font-medium">Delete</span>
                      </motion.button>

                      <motion.button
                        onClick={saveForLater}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                          isSaved
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/25"
                            : "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/25"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isSaved ? "fill-white" : "fill-none"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {isSaved ? "Remove from Saved" : "Save for Later"}
                        </span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.article>

            {/* Comments Section */}
            <motion.div className="mt-12">
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-xl border border-orange-100/50 dark:border-gray-700/50 overflow-hidden">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-orange-500" />
                    Comments & Discussion
                  </h2>
                  <Comments post={post} userData={userData} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
