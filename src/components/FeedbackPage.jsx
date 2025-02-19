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
    <div className='flex flex-col items-center justify-center min-h-screen p-6'>
      <div className='w-full max-w-4xl bg-white bg-gradient-to-r dark:via-gray-800 dark:to-gray-900 dark:text-white p-8 rounded-lg shadow-md flex'>
        {/* Image container added here */}
        <div className='w-1/2 flex items-center justify-center p-4'>
          <img src='https://img.freepik.com/free-vector/flat-giving-feedback-template_23-2148962149.jpg' alt='Your description' className='w-full rounded-md shadow-md' />
        </div>
        <div className='w-1/2 p-4'>
          {submitted ? (
            <p className='text-orange-600 text-2xl'>Thank you for your feedback!</p>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <h1 className='text-4xl font-bold mb-6 text-orange-600 dark:text-gray-100' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Feedback</h1>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name...'
                required
                className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 hover:border-orange-500 hover:shadow-md focus:shadow-lg transition duration-300'
              />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your email...'
                required
                className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 hover:border-orange-500 hover:shadow-md focus:shadow-lg transition duration-300'
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 hover:border-orange-500 hover:shadow-md focus:shadow-lg transition duration-300'
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
                className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 hover:border-orange-500 hover:shadow-md focus:shadow-lg transition duration-300'
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
                  className='w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 hover:border-orange-500 hover:shadow-md focus:shadow-lg transition duration-300'
                />
              </div>
              <button
                type='submit'
                className='btn-shadow w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
