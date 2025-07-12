// src/pages/SavedBlogs.jsx
import React, { useEffect, useState } from "react";
import { Account } from "appwrite";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import Loading from "../components/loaders/Loading";

export default function SavedBlogs() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      try {
        const account = new Account(appwriteService.client);
        const user = await account.get();
        const savedIds = await appwriteService.getsaveForLater(user.$id);

        if (savedIds.length === 0) {
          setPosts([]);
          return;
        }

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
        console.error("Error fetching saved posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <div className="w-full py-8 min-h-screen bg-white dark:bg-black">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600 dark:text-orange-400">Saved Blogs</h1>
        {loading ? (
          <Loading />
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
            <span>No blogs saved yet. Click the <span className="inline-block align-middle"><svg width="20" height="20" fill="currentColor" className="inline text-orange-500"><path d="M5 3a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L10 16.118l5.553 1.776A1 1 0 0 0 17 17V5a2 2 0 0 0-2-2H5zm0 2h10v11.382l-4.553-1.455a1 1 0 0 0-.894 0L5 16.382V5z"/></svg></span> icon on any blog to save it for later!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
