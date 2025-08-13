import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import Loading from "../components/loaders/Loading.jsx";

function AllPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await appwriteService.getPosts();
        if (res && res.documents) {
          setPosts(res.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Debug log in dev mode
  if (import.meta.env.MODE === "development") {
    console.log("posts", posts);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950 relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300/30 to-amber-400/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-orange-400/25 to-red-300/15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-amber-300/20 to-orange-500/10 blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Container>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 rounded-3xl p-8 border border-white/30 dark:border-white/10 shadow-2xl">
              <Loading />
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
            {/* Glassmorphism Header Section */}
            <div className="text-center mb-12">
              <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-3xl p-8 md:p-12 border border-white/40 dark:border-white/10 shadow-2xl mx-auto max-w-4xl">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400/80 to-orange-600/80 backdrop-blur-sm shadow-xl mb-8 border border-white/30">
                  <svg 
                    className="w-10 h-10 text-white drop-shadow-lg" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                    />
                  </svg>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-6 drop-shadow-sm">
                  All Posts
                </h1>
                
                <p className="text-xl text-gray-700/90 dark:text-gray-200/90 max-w-2xl mx-auto leading-relaxed">
                  Discover and explore our collection of amazing content.
                </p>
                
                {/* Glassmorphic decorative line */}
                <div className="flex items-center justify-center mt-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent w-24 backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mx-6 shadow-lg border border-white/30"></div>
                  <div className="h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent w-24 backdrop-blur-sm"></div>
                </div>
              </div>
            </div>

            {/* Posts Grid with Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {posts.length === 0 ? (
                <div className="col-span-full">
                  <div className="text-center py-16">
                    <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 rounded-3xl p-12 border border-white/30 dark:border-white/10 shadow-2xl max-w-md mx-auto">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400/60 to-orange-600/60 backdrop-blur-sm mb-8 border border-white/30 shadow-xl">
                        <svg 
                          className="w-12 h-12 text-white drop-shadow-lg" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                          />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        No posts found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        It looks like there aren't any posts to display yet. Check back soon for new content!
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                posts.map((post) => (
                  <div 
                    key={post.$id} 
                    className="group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  >
                    <div className="backdrop-blur-lg bg-white/25 dark:bg-black/25 rounded-2xl border border-white/30 dark:border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/35 dark:hover:bg-black/35 transition-all duration-300 overflow-hidden">
                      <PostCard {...post} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Glassmorphic Bottom Stats */}
            {posts.length > 0 && (
              <div className="mt-16">
                <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 rounded-2xl p-2 border border-white/30 dark:border-white/10 shadow-xl text-center max-w-sm mx-auto">
                  <p className="text-gray-700/90 dark:text-gray-200/90 text-lg">
                    Showing{' '}
                    <span className="font-bold text-orange-600 dark:text-orange-400 bg-orange-100/50 dark:bg-orange-900/30 px-2 py-1 rounded-lg">
                      {posts.length}
                    </span>
                    {' '}posts
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;