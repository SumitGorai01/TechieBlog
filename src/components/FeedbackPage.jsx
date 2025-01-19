import React, { useState } from 'react';

function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the feedback submission, e.g., send it to your server
    setSubmitted(true);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
        {submitted ? (
          <p className='text-orange-600 text-2xl'>Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>Feedback</h1>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Your name...'
              required
              className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
            />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your email...'
              required
              className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
            >
              <option value='general'>General</option>
              <option value='bug'>Bug Report</option>
              <option value='feature'>Feature Request</option>
            </select>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder='Your feedback...'
              required
              className='w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
            />
            <div className='flex items-center space-x-4'>
              <span className='text-gray-900 dark:text-gray-100'>Rating:</span>
              <input
                type='number'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min='1'
                max='5'
                placeholder='1-5'
                required
                className='p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
              />
            </div>
            <button
              type='submit'
              className='btn-shadow w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FeedbackPage;
