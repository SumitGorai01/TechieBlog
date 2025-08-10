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
        confirmButtonColor: "#f59e0b",
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
    <div className="py-8 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <motion.article
          className="max-w-4xl mx-auto relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Featured Image */}
          <div className="relative">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-[300px] object-cover"
            />
            <button
              onClick={handleSaveLocal}
              aria-label={isSavedLocal ? "Remove from Saved" : "Save for Later"}
              className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md hover:scale-110 transform transition ${
                isSavedLocal ? "text-orange-500" : "text-gray-400"
              }`}
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isSavedLocal ? "fill-orange-500" : "fill-none"
                }`}
              />
            </button>
          </div>

          {/* Post Meta */}
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.$createdAt), "MMMM d, yyyy")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Updated {formatDistanceToNow(new Date(post.$updatedAt), { addSuffix: true })}
              </span>
              <span className="flex items-center gap-1">
                ⏱ {readTime} min read
              </span>
              <span>✍️ {wordCount} words</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            {/* Content */}
            <MarkdownDisplay content={post.content} />

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={sharePost}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {userData && (
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                    isLiked
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 stroke-red-500" : ""
                    }`}
                  />
                  {likes}
                </button>
              )}

              {isAuthor && (
                <>
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={deletePost}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={saveForLater}
                    className={`px-4 py-2 rounded-lg text-white ${
                      isSaved
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-amber-500 hover:bg-amber-600"
                    }`}
                  >
                    {isSaved ? "Remove from Saved" : "Save for Later"}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.article>

        {/* Comments */}
        <div className="mt-8">
          <Comments post={post} userData={userData} />
        </div>
      </Container>
    </div>
  );
}
