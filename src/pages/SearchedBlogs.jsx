import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import { PropagateLoader } from 'react-spinners';

function SearchedBlogs() {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSearchedBlogs = useCallback(async () => {
        try {
            const res = await appwriteService.getSearchedPosts(slug);
            if (res) {
                setPosts(res.documents);
            }
        } catch (error) {
            console.error('Error fetching searched blogs:', error);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        getSearchedBlogs();
    }, [slug, getSearchedBlogs]);

    return (
        <div className="w-full py-8 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 
            dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                {loading ? (
                    <div className="min-h-[200px] flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            Did you know waiting makes blogs better?
                        </p>
                        <PropagateLoader color="#ff6300" />
                    </div>
                ) : posts.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-full flex justify-center">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No blogs found for "{slug}"</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Try searching with a different keyword.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchedBlogs;
