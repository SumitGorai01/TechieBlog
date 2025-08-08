import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Testimonials } from "../components";
import Loading from "../components/loaders/Loading.jsx";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { TypeAnimation } from "react-type-animation";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          const sortedPosts = response.documents
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 8);
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
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto mb-16 mt-20">
           
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 p-2 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 dark:from-white dark:via-orange-200 dark:to-red-200 bg-clip-text text-transparent leading-tight">
              <TypeAnimation
                sequence={[
                  "TechieBlog",
                  2000,
                  "Innovation",
                  2000,
                  "Future Tech",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-white/70 mb-8 font-light leading-relaxed">
              Discover cutting-edge technology insights,<br />
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text font-medium">
                written by experts, for innovators
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/all-posts"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Reading
                  <LoginIcon className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link to="/articles">
                <button className="px-8 py-4 border-2 border-gray-300 dark:border-white/20 rounded-2xl text-gray-700 dark:text-white font-semibold text-lg backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:border-orange-400 dark:hover:border-white/40">
                  Explore Articles
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
              <div className="relative p-8 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 dark:from-orange-500/10 dark:to-red-500/10 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM12 3v3m0 0l-3-3m3 3l3-3" />
                      </svg>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Stay Ahead of Tech
                    </h2>
                    <p className="text-gray-600 dark:text-white/70 text-lg">
                      Join <span className="text-orange-500 font-semibold">10,000+</span> forward-thinking developers
                    </p>
                  </div>

                  {isSubscribed ? (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome Aboard! 🚀
                      </h3>
                      <p className="text-gray-600 dark:text-white/70">
                        You're now part of the TechieBlog community
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@domain.com"
                            className="w-full px-6 py-5 bg-gray-50 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 text-lg focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-400 dark:focus:border-orange-400/50 transition-all duration-300"
                            required
                          />
                          <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                          >
                            Subscribe
                          </button>
                        </div>
                      </form>

                     
                      <div className="flex flex-wrap justify-center gap-3">
                        <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-gray-700 dark:text-white/80 text-sm font-medium">Weekly Deep Dives</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          <span className="text-gray-700 dark:text-white/80 text-sm font-medium">Exclusive Content</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                          <span className="text-gray-700 dark:text-white/80 text-sm font-medium">Zero Spam</span>
                        </div>
                      </div>

                     
                      <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                          <div className="text-gray-600 dark:text-white/60 text-sm">Articles</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                          <div className="text-gray-600 dark:text-white/60 text-sm">Readers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9★</div>
                          <div className="text-gray-600 dark:text-white/60 text-sm">Rating</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 hidden lg:block">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20">
             
            </div>
          </div>

          <div className="absolute bottom-8 right-8 hidden lg:block">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

     
        <div className="relative z-10 mt-16">
          <Testimonials />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">

      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative px-4 py-20 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm text-gray-700 dark:text-gray-200">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
            Fresh Content • Updated Daily
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 dark:from-white dark:via-orange-200 dark:to-red-200 bg-clip-text text-transparent">
            Latest Insights
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the newest trends and innovations shaping our digital future
          </p>
        </div>
      </div>

      <div className="relative px-4 py-16">
        <Container>
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {posts.map((post, index) => (
                <div 
                  key={post.$id} 
                  className="transform transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Home;