import { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import Loading from '../components/loaders/Loading.jsx';

function AllPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts();
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
console.log("posts",posts);
  return (
    <div className='w-full py-4 md:py-5 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-300'>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center'>
              {posts.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Oops! Looks like there are no posts yet. Be the first to share something awesome!
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.$id} className="flex justify-center transform hover:-translate-y-1 transition-transform duration-300">
                    <PostCard {...post} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
