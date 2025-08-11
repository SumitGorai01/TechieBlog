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
        // Fetch each post by ID (could be optimized if appwriteService supports batch fetch)
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
    <div className="w-full py-8 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-300">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600 dark:text-orange-400">Saved Blogs</h1>
        {loading ? (
          <Loading />
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
            <span>No blogs saved yet. Click the <span className="inline-block align-middle"><svg width="20" height="20" fill="currentColor" className="inline text-orange-500"><path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/></svg></span> icon on any blog to save it for later!</span>
          </div>
        ) : (
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 justify-items-center">
              {posts.map((post) => (
                <div key={post.$id} className="flex justify-center transform hover:-translate-y-1 transition-transform duration-300">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Saved Events Section */}
        <h2 className="text-2xl font-bold text-center mt-16 mb-8 text-orange-500 dark:text-orange-300">Saved Events</h2>
        {savedEventObjects.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-lg">
            <span>No events saved yet. Click the <span className="inline-block align-middle"><svg width="20" height="20" fill="currentColor" className="inline text-orange-500"><path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/></svg></span> icon on any event to save it for later!</span>
          </div>
        ) : (
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 justify-items-center">
              {savedEventObjects.map((event, idx) => (
                <div key={event.title} className="flex flex-col justify-center items-start bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full sm:w-96 border-2 border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">{event.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Date:</strong> {event.date}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Time:</strong> {event.time}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                  <a href={event.link} className="mt-auto px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold shadow hover:shadow-orange-500/30 transition-all duration-300">Register Now</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
} 