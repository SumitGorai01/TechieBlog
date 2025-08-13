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

  if (import.meta.env.MODE === "development") {
    console.log("posts", posts);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950 transition-all duration-500">
      <Container>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loading />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg mb-6">
                <svg 
                  className="w-8 h-8 text-white" 
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
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent mb-4">
                All Posts
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover and explore our collection of amazing content
              </p>
              
              <div className="flex items-center justify-center mt-6">
                <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-32"></div>
                <div className="w-2 h-2 rounded-full bg-orange-400 mx-4"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-32"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {posts.length === 0 ? (
                <div className="col-span-full">
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-6">
                      <svg 
                        className="w-10 h-10 text-orange-400" 
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
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      No posts found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      It looks like there aren't any posts to display yet.
                    </p>
                  </div>
                </div>
              ) : (
                posts.map((post) => (
                  <div 
                    key={post.$id} 
                    className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <PostCard {...post} />
                  </div>
                ))
              )}
            </div>

            {posts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-orange-200 dark:border-orange-800">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-orange-600 dark:text-orange-400">{posts.length}</span> posts
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