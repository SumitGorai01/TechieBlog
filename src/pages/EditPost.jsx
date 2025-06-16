import { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostForm } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/loaders/Loading.jsx';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) setPost(post);
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          navigate("/");
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300">
      <Container>
        {loading ? (
          <Loading />
        ) : post ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Edit Your Post
            </h1>
            <PostForm post={post} />
          </>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            Post not found.
          </p>
        )}
      </Container>
    </div>
  );
}

export default EditPost;
