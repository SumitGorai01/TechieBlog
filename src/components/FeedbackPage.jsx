import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import emailjs from '@emailjs/browser';

function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    feedback: '',
    rating: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty.";
    if (formData.rating < 1) newErrors.rating = "Please provide a rating.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      emailjsfeedback.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID_FEEDBACK,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FEEDBACK,
        {
          name: formData.name,
          email: formData.email,
          category: formData.category,
          feedback: formData.feedback,
          rating: formData.rating,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY_FEEDBACK
      ).then((result) => {
        console.log('Email successfully sent!', result.text);
        setSubmitted(true);
      }, (error) => {
        console.error('Error sending email:', error.text);
      });
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          category: 'general',
          feedback: '',
          rating: 0,
        });
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
            Share Your Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Help us improve by sharing your thoughts and experiences
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-100 dark:border-gray-700 p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Thank you for your feedback!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We appreciate you taking the time to share your thoughts
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 transition-all duration-200 outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 transition-all duration-200 outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Feedback Category</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-orange-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 transition-all duration-200 outline-none appearance-none cursor-pointer hover:border-orange-300 dark:hover:border-orange-400"
                  >
                    <option value="general">📝 General Feedback</option>
                    <option value="bug">🐛 Bug Report</option>
                    <option value="feature">✨ Feature Request</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded p-1"
                    >
                      <FaStar
                        className={`w-8 h-8 transition-all duration-200 ${
                          (hoveredStar > 0 ? star <= hoveredStar : star <= formData.rating)
                            ? 'text-orange-500'
                            : 'text-gray-300 dark:text-gray-600 hover:text-orange-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                    {(hoveredStar > 0 ? hoveredStar : formData.rating) > 0 && 
                      `${hoveredStar > 0 ? hoveredStar : formData.rating} out of 5 stars`}
                  </span>
                </div>
                {errors.rating && <p className="text-red-500 text-sm font-medium">{errors.rating}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Share your thoughts, suggestions, or concerns..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 transition-all duration-200 outline-none resize-none"
                />
                {errors.feedback && <p className="text-red-500 text-sm font-medium">{errors.feedback}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-800"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your feedback helps us create better experiences for everyone
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
