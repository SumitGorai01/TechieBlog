import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import Loading from "../components/loaders/Loading";
import Events from '../components/Events';

const eventData = [
  {
    title: "Webinar: Introduction to HTML",
    date: "February 10, 2025",
    time: "10:00 AM - 12:00 PM",
    description: "Join us for an introductory session on HTML where you'll learn the basics of structuring a webpage and creating content.",
    link: "/register"
  },
  {
    title: "Workshop: Advanced CSS techniques",
    date: "March 15, 2025",
    time: "2:00 PM - 4:00 PM",
    description: "Dive deep into advanced CSS techniques, including animations, transitions, and responsive design best practices.",
    link: "/register"
  },
];

export default function SavedBlogs() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [savedEvents, setSavedEvents] = useState(() => {
    return JSON.parse(localStorage.getItem('savedEvents') || '[]');
  });
  const savedEventObjects = eventData.filter(event => savedEvents.includes(event.title));

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      const savedIds = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
      if (savedIds.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }
      try {
        const fetchedPosts = await Promise.all(
          savedIds.map(async (id) => {
            try {
              return await appwriteService.getPost(id);
            } catch {
              return null;
            }
          })
        );
        setPosts(fetchedPosts.filter(Boolean));
      } catch (error) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-rose-50/80 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-200/30 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-200/10 to-orange-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full py-12">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-block backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 rounded-2xl px-8 py-6 shadow-2xl border border-white/30 dark:border-gray-700/30">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                Saved Blogs
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto"></div>
            </div>
          </div>

          {loading ? (
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <Loading />
            </div>
          ) : posts.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/20 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" fill="currentColor" className="text-orange-500/60">
                  <path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
                No blogs saved yet
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Click the <span className="inline-flex items-center px-2 py-1 bg-orange-500/20 rounded-lg mx-1">
                  <svg width="16" height="16" fill="currentColor" className="text-orange-500">
                    <path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/>
                  </svg>
                </span> icon on any blog to save it for later!
              </p>
            </div>
          ) : (
            <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 rounded-3xl p-8 shadow-2xl border border-white/10 dark:border-gray-700/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 justify-items-center">
                {posts.map((post) => (
                  <div 
                    key={post.$id} 
                    className="group relative backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-2xl p-1 shadow-xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <PostCard {...post} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-24 mb-12">
            <div className="inline-block backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 rounded-2xl px-6 py-4 shadow-xl border border-white/25 dark:border-gray-700/25">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                Saved Events
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

          {savedEventObjects.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 rounded-3xl p-10 shadow-2xl border border-white/20 dark:border-gray-700/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="currentColor" className="text-orange-500/60">
                  <path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-1">
                No events saved yet
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Click the <span className="inline-flex items-center px-2 py-1 bg-orange-500/20 rounded-lg mx-1">
                  <svg width="14" height="14" fill="currentColor" className="text-orange-500">
                    <path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/>
                  </svg>
                </span> icon on any event to save it for later!
              </p>
            </div>
          ) : (
            <div className="backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 rounded-3xl p-8 shadow-2xl border border-white/10 dark:border-gray-700/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 justify-items-center">
                {savedEventObjects.map((event, idx) => (
                  <div 
                    key={event.title} 
                    className="group relative backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 w-full max-w-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4 leading-tight">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium text-sm">Date:</span>
                          <span className="ml-2 text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium text-sm">Time:</span>
                          <span className="ml-2 text-sm">{event.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                        {event.description}
                      </p>
                      
                      <a 
                        href={event.link} 
                        className="inline-block w-full text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 text-sm backdrop-blur-sm"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}