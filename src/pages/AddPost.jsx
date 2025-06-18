import React, { useEffect, useState } from 'react';
import { Container, PostForm, Loading } from '../components';

function AddPost() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate PostForm loading or perform real loading logic here
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Replace with actual async loading if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-10 bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <Container>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create a New Post
        </h1>
        {isLoading ? <Loading /> : <PostForm />}
      </Container>
    </div>
  );
}

export default AddPost;
