import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { format, formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  User,
  Heart,
  Bookmark,
  Edit3,
  Trash2,
  Eye,
  MessageCircle,
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
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [isSavedLocal, setIsSavedLocal] = useState(false);

  useEffect(() => {
    if (post && userData) {
      setIsLiked(post.likedBy?.includes(userData.$id));
      setLikes(post.likedBy?.length || 0);
    }
  }, [post, userData]);

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

  const saveForLater = async () => {
    try {
      setIsSaved((prev) => !prev);

      if (!userData?.$id || !post?.$id) {
        Swal.fire("Error", "Invalid user or post data", "error");
        return;
      }

      const result = await Swal.fire({
        title: "Save for Later?",
        text: isSaved
          ? "Remove from saved list?"
          : "You can access this post later from your saved list.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      const response = await appwriteService.saveForLater(
        userData.$id,
        post.$id
      );

      if (response) {
        Swal.fire(
          "Success",
          isSaved
            ? "Post removed from your saved list"
            : "Post added to your saved list!",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to save the post", "error");
      }
    } catch (error) {
      console.error("Error in handleSaveForLater:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    async function getsaveForLater(userId) {
      try {
        if (!post || !userId) return;
        const response = await appwriteService.getsaveForLater(userId);
        if (response?.documents?.some((doc) => doc.postId === post.$id)) {
          setIsSaved(true);
        }
      } catch (error) {
        console.error(`Error fetching saved posts for userId: ${userId}`, error);
      }
    }
    if (userData?.$id && post?.$id) {
      getsaveForLater(userData.$id);
    }
  }, [userData?.$id, post?.$id]);

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

  const deletePost = async () => {
    try {
      const result = await Swal.fire({
        title: "Delete Post?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await appwriteService.deletePost(post.$id);
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch {
      Swal.fire("Error", "Failed to delete the post", "error");
    }
  };

  const sharePost = async () => {
    const url = window.location.href;
    try {
      await navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url,
      });
    } catch {
      navigator.clipboard.writeText(url);
      Swal.fire({
        title: "Link Copied!",
        text: "Post URL copied to clipboard",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleLike = async () => {
    if (!userData) {
      Swal.fire("Error", "You need to be logged in to like a post", "error");
      return;
    }
    try {
      setIsLiking(true);
      const updatedPost = await appwriteService.addLikes(
        post.$id,
        userData.$id
      );
      if (updatedPost) {
        setPost(updatedPost);
        setLikes(updatedPost.likedBy.length);
        setIsLiked(updatedPost.likedBy.includes(userData.$id));
      }
    } catch {
      Swal.fire("Error", "Failed to like the post", "error");
    } finally {
      setIsLiking(false);
    }
  };

  if (!post) return <Loading />;

  const wordCount = getWordCount(post.content);
  const readTime = getReadTime(wordCount);
  const isAuthor = userData?.$id === post.userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        <div className="py-8 max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-8 group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm hover:shadow-md border border-orange-100 dark:border-gray-700 text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-all duration-200"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Posts</span>
          </motion.button>

          <motion.article
            className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100/50 dark:border-gray-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Featured Image */}
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
              
              {/* Floating Save Button */}
              <motion.button
                onClick={handleSaveLocal}
                aria-label={isSavedLocal ? "Remove from Saved" : "Save for Later"}
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
                    isSavedLocal ? "fill-white" : "fill-none hover:fill-orange-500/20"
                  }`}
                />
              </motion.button>
            </div>

            {/* Post Content */}
            <div className="p-8 lg:p-12">
              {/* Meta Information */}
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
                  Updated {formatDistanceToNow(new Date(post.$updatedAt), { addSuffix: true })}
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
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-orange-800 dark:from-white dark:via-gray-200 dark:to-orange-300 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {post.title}
              </motion.h1>

              {/* Content */}
              <motion.div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <MarkdownDisplay content={post.content} />
              </motion.div>
            </div>

            {/* Actions Bar */}
            <motion.div 
              className="px-8 lg:px-12 py-6 bg-gradient-to-r from-orange-50/50 via-white/50 to-orange-50/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50 border-t border-orange-100 dark:border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Share Button */}
                  <motion.button
                    onClick={sharePost}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share</span>
                  </motion.button>

                  {/* Like Button */}
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
                      <Heart
                        className={`w-4 h-4 transition-all ${
                          isLiked ? "fill-white" : "fill-none"
                        }`}
                      />
                      <span className="text-sm font-medium">{likes}</span>
                    </motion.button>
                  )}

                  {/* Comments Indicator */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Comments</span>
                  </div>
                </div>

                {/* Author Actions */}
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
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : "fill-none"}`} />
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
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100/50 dark:border-gray-700/50 overflow-hidden">
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
      </Container>
    </div>
  );
}