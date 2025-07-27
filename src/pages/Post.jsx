import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import parse from "html-react-parser";
import Swal from 'sweetalert2';
import { format, formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, Clock, Share2, User, Heart, Send, Bookmark } from "lucide-react";

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

  const [isSaved, setIsSaved] = useState(false)
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
        if (!fetchedPost) {
          throw new Error("Post not found");
        }
  
        setPost(fetchedPost);
  
        // Fetch author name properly
        const user = await authService.getUserNameById(fetchedPost.userId);
        console.log("User:", user);
        
        if (user) {
          setAuthor(user); // Only setting the name, not whole object
        } else {
          setAuthor("Unknown Author");
        }
  
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    }
  
    fetchPost();
  }, [slug, navigate]);
  
  
  const saveForLater = async () => {
    try {

        setIsSaved(prev => !prev)

        console.log("User ID:", userData?.$id);
        console.log("Post ID:", post?.$id);

        if (!userData?.$id || !post?.$id) {
            Swal.fire("Error", "Invalid user or post data", "error");
            return;
        }

        const result = await Swal.fire({
            title: "Save for Later?",
            text: `${isSaved ? "Remove now..." : "You can access this post later from your saved list."}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f59e0b",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        // Call the service method
        const response = await appwriteService.saveForLater(userData.$id, post.$id);

        if (response) {
            Swal.fire(
                "Success",
                `${isSaved ? "Post is removed":"Post has been added to your saved list!" }`,
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
      console.log(`Fetching savedForLater posts for userId: ${userId}`);
      
      const response = await appwriteService.getsaveForLater(userId);
      console.log("Saved Posts Response:", response);
      
      if (response && response.includes(post.$id)) {
        setIsSaved(prev => !prev);
      }

      return response; // Return data for future use if needed
    } catch (error) {
      console.error(`Error fetching saved posts for userId: ${userId}`, error);
      return null;
    }
  }

  getsaveForLater(userData.$id);
}, [userData?.$id, post?.$id]); // Ensure effect runs only when IDs are available

  useEffect(() => {
    // Check if this post is saved in localStorage (for non-logged-in users)
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
        title: 'Delete Post?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await appwriteService.deletePost(post.$id);
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to delete the post', 'error');
    }
  };

  const sharePost = async () => {
    const url = window.location.href;
    try {
      await navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url: url,
      });
    } catch (err) {
      navigator.clipboard.writeText(url);
      Swal.fire({
        title: 'Link Copied!',
        text: 'Post URL copied to clipboard',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleLike = async () => {
    if (!userData) {
      Swal.fire('Error', 'You need to be logged in to like a post', 'error');
      return;
    }

    try {
      setIsLiking(true);
      const updatedPost = await appwriteService.addLikes(post.$id, userData.$id);
      if (updatedPost) {
        setPost(updatedPost);
        setLikes(updatedPost.likedBy.length);
        setIsLiked(updatedPost.likedBy.includes(userData.$id));
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to like the post', 'error');
    } finally {
      setIsLiking(false);
    }
  };

  if (!post) return <Loading />;

  const wordCount = getWordCount(post.content);
  const readTime = getReadTime(wordCount);
  const isAuthor = userData?.$id === post.userId;

  return (
    <div className="py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container>
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <article className="max-w-4xl mx-auto relative">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-[300px] object-contain bg-gray-100 dark:bg-gray-800 rounded-xl mb-4"
          />
          {/* Save/Bookmark Icon for all users */}
          <button
            onClick={handleSaveLocal}
            aria-label={isSavedLocal ? "Remove from Saved" : "Save for Later"}
            className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors ${isSavedLocal ? "text-orange-500" : "text-gray-400"}`}
          >
            <Bookmark className={`w-7 h-7 ${isSavedLocal ? "fill-orange-500" : "fill-none"}`} />
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author || "Unknown Author"}</span>
                </div>
              <div className="hidden sm:block text-gray-400">•</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Posted {format(new Date(post.$createdAt), "MMMM d, yyyy")}</span>
              </div>
              <div className="hidden sm:block text-gray-400">•</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDistanceToNow(new Date(post.$updatedAt), { addSuffix: true })}</span>
              </div>
            </div>
            {/* Read Time & Word Count */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {readTime} min read</span>
              <span className="flex items-center gap-1">· ✍️ {wordCount} words</span>
            </div>
            <button
              onClick={sharePost}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
              title="Share Post"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {userData && (
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isLiking ? 'opacity-70 cursor-not-allowed' : ''
                } ${
                  isLiked
                    ? 'bg-red-100 dark:bg-red-900/50 text-red-500'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30'
                }`}
                title="Like Post"
              >
                {isLiking ? (
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-500" />
                ) : (
                  <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isLiked
                        ? 'fill-red-500 stroke-red-500'
                        : 'fill-none stroke-current hover:stroke-red-500'
                    }`}
                  />
                )}
                <span className="font-medium">{likes}</span>
              </button>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {post.title}
          </h1>

          <MarkdownDisplay content={post.content} />

          {isAuthor && (
            <div className="flex justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                to={`/edit-post/${post.$id}`}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Edit
              </Link>
              <button
                onClick={deletePost}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={saveForLater}
                className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                  isSaved ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"
                } text-white`}
              >
                  {isSaved ? "Remove from Saved" : "Save for Later"}
              </button>



            </div>
          )}
        </article>

        <Comments post={post} userData={userData} />
      </Container>
    </div>
  );
}