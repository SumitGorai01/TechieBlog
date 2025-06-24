import React, { useState } from 'react';
import feedbackImg from "../assets/feedback.svg";
import { FaStar } from "react-icons/fa";


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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.includes('@')) newErrors.email = "Enter a valid email.";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty.";
    if (formData.rating < 1) newErrors.rating = "Please provide a rating.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', category: 'general', feedback: '', rating: 0 });
      }, 3000);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-3'>
      <h1 className='md:text-5xl sm:text-2xl font-bold text-center text-orange-600 dark:text-gray-200'>Feedback Form</h1>
      <div className='w-full max-w-5xl bg-orange-200 dark:bg-gray-700 shadow-lg rounded-xl p-8'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2 p-4'>
            <img src={feedbackImg} alt='Feedback' className='w-full' />
          </div>
          <div className='w-full md:w-1/2 p-4'>
            {submitted ? (
              <p className='text-green-600 text-2xl text-center font-bold'>Thank you for your feedback!</p>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text'>Feedback</h1> */}
                
                <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Your name...' className='input-style' />
                {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                
                <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Your email...' className='input-style' />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                
                <select name='category' value={formData.category} onChange={handleChange} className='input-style dark:text-gray-800' style={{ color: "rgba(0, 0, 0, 0.5" }}>
                  <option value='general'>
                    General
                  </option>
                  <option value='bug'>Bug Report</option>
                  <option value='feature'>Feature Request</option>
                </select>
                
                <textarea name='feedback' value={formData.feedback} onChange={handleChange} placeholder='Your feedback...' className='input-style' />
                {errors.feedback && <p className='text-red-500 text-sm'>{errors.feedback}</p>}

                <div className='flex items-center space-x-2'>
                  <span className='text-gray-900 dark:text-gray-100'>Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${formData.rating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    />
                  ))}
                </div>
                {errors.rating && <p className='text-red-500 text-sm'>{errors.rating}</p>}

                <button type='submit' className='w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-md'>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5a663;
          color: black;
          border-radius: 10px;
          background-color: #fff7eb;
          transition: all 0.3s ease-in-out;
        }
        .input-style:focus {
          outline: none;
          border-color: #ff9800;
          box-shadow: 0px 0px 10px rgba(255, 152, 0, 0.5);
        }
        .input-style:hover {
          border-color: #ff9800;
          box-shadow: 0px 0px 5px rgba(255, 152, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default FeedbackPage;