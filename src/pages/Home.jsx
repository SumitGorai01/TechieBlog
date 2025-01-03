import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full text-center bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 min-h-screen flex flex-col justify-center animate-fade-in">
        <div className="p-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-orange-600 tracking-tight animate-slide-in">
            Welcome to <span className="text-red-800">TechieBlog</span>
          </h1>
          <p className="text-gray-700 mt-4 text-lg md:text-xl animate-fade-in-delayed">
            Your hub for the latest in technology and innovation.
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 animate-fade-up">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Subscribe to TechieBlog
          </h2>
          <p className="text-gray-700 mt-2">
            Get the latest posts delivered right to your inbox.
          </p>
          <form action="#" className="mt-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="youremail@example.com"
                className="w-full md:w-auto flex-1 rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-orange-300 p-3"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 animate-fade-in-delayed">
          <img
            src="/assets/tech-blog-illustration.svg"
            alt="Tech Blog Illustration"
            className="mx-auto w-full max-w-md animate-bounce-slow"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gradient-to-b from-orange-50 to-red-100 min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8 animate-slide-in">
          Latest Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform hover:scale-105 transition duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden bg-white p-4 animate-zoom-in"
            >
              <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 animate-fade-in-delayed">
          <h2 className="text-3xl font-bold text-gray-900">Join the Community</h2>
          <p className="text-gray-700 mt-2">
            Share your knowledge, write posts, and connect with like-minded tech enthusiasts.
          </p>
          <button
            className="mt-6 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
