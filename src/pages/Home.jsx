import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Testimonials } from "../components";
import Loading from "../components/loaders/Loading.jsx";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import ContributorsLink from "../components/contributors/contributorsLink.jsx";
// import { getPostsFromDatabase } from '../appwrite/config.js';
import { TypeAnimation } from "react-type-animation";

import img from "../assets/tech-blog-illustration.png";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the Appwrite service
        const response = await appwriteService.getPosts();

        if (response) {
          // Assuming `response.documents` contains the posts
          const sortedPosts = response.documents
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by `createdAt` descending
            .slice(0, 8); // Limit to 8 posts

          setPosts(sortedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  if (posts.length === 0) {
    return (
      <div
        className="flex flex-col justify-center w-full min-h-screen text-center transition-colors duration-300 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black animate-fade-in"
      >
        <div className="p-6 mt-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-orange-600 md:text-5xl dark:text-orange-400">
            <TypeAnimation
              sequence={[
                "Welcome to ", // First part
                1000, // Delay (1 second)
                "Welcome to TechieBlog", // Full text
                1500, // Delay (1.5 seconds)
                "", // Clear text
                500, // Pause before restarting
              ]}
              wrapper="span"
              speed={10} // Typing speed
              repeat={Infinity} // Loop indefinitely
              cursor={true} // Show blinking cursor
            />
          </h1>
          <p
            className="mt-4 text-lg text-gray-700 dark:text-gray-300 md:text-xl animate-fade-in-delayed"
          >
            Your hub for the latest in technology and innovation.
          </p>
          <Link
            to={"/signup"}
            className="inline-flex items-center gap-2 px-4 py-3 mt-6 text-lg font-semibold text-white transition-colors duration-300 bg-orange-600 rounded-lg shadow-md hover:bg-orange-200 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            <span>Get Started</span>
            <LoginIcon />
          </Link>
        </div>

        <div className="flex flex-col items-center max-w-6xl gap-16 px-4 mx-auto mt-8 lg:flex-row">
          {/* Enhanced Subscription Form */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative p-8 transition-all duration-300 border border-orange-200 shadow-2xl bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl dark:border-gray-700 hover:shadow-3xl">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                  Stay Updated
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                  Join <span className="font-semibold text-orange-600 dark:text-orange-400">5,000+</span> tech enthusiasts
                </p>
              </div>

              {isSubscribed ? (
                <div className="py-8 text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-500 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                    Successfully Subscribed!
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Welcome to the TechieBlog community!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 pr-32 text-lg text-gray-900 placeholder-gray-500 transition-all duration-300 border-2 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500 focus:border-orange-500 dark:focus:border-orange-400 dark:text-gray-100 dark:placeholder-gray-400"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute px-6 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-md right-2 top-2 bottom-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95"
                    >
                      Subscribe
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Weekly insights
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      No spam
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Unsubscribe anytime
                    </div>
                  </div>
                </form>
              )}

              <div className="p-4 mt-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="text-center">
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                    What you'll get:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900 dark:text-orange-300">
                      🚀 Latest Tech Trends
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">
                      💡 Expert Insights
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      🔧 Coding Tips
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 animate-fade-in-delayed">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 bg-[length:400%_400%] rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              <img
                src={img}
                alt="Tech Blog Illustration"
                className="relative w-full max-w-lg mx-auto transition-opacity duration-300 shadow-2xl animate-fade dark:opacity-90 rounded-2xl"
              />
            </div>
          </div>
        </div>

        <Testimonials />
        
        <section className="mb-10">
          <h2 className="my-6 text-3xl font-bold text-black md:text-4xl dark:text-gray-200">
            Meet the Contributors
          </h2>
          <p className="mx-6 mt-2 mb-6 text-gray-700 dark:text-gray-400">
            Meet the brilliant minds who brought this project to life!
          </p>
          <div className="hidden md:block">
            <ContributorsLink classes="w-20 h-20" />
          </div>
          <div className="block md:hidden">
            <ContributorsLink classes="w-12 h-12" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen py-8 transition-colors duration-300 bg-gradient-to-b from-orange-50 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black"
    >
      <div className="text-center">
        <h1
          className="mb-2 text-4xl font-extrabold text-orange-600 dark:text-orange-400 animate-slide-in"
        >
          Latest Posts
        </h1>
        <div className="w-full py-8">
          <Container>
            {loading ? (
              <div className="dark:bg-gray-900">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
                {posts.map((post) => (
                  <div key={post.$id}>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            )}
          </Container>
        </div>

        <div className="mt-16 animate-fade-in-delayed">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Join the Community
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Share your knowledge, write posts, and connect with like-minded tech
            enthusiasts.
          </p>
          <button
            className="px-8 py-3 mt-6 font-semibold text-white transition-colors duration-300 bg-orange-600 rounded-lg shadow-md dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;