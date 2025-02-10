import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        workshop: '',
        comments: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-3/4">
                <h1 className='text-4xl font-bold mb-6 text-orange-600 dark:text-gray-100' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Register for Workshop</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" placeholder='Enter full name' name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" placeholder='Enter email address' name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input type="tel" placeholder='eg: +91 xxxxx-xxxxx' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Select Workshop</label>
                        <select name="workshop" value={formData.workshop} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" required>
                            <option value="">Select a workshop</option>
                            <option value="web-development">Web Development</option>
                            <option value="app-development">App Development</option>
                            <option value="data-science">Data Science</option>
                            <option value="ai-ml">AI and Machine Learning</option>
                            <option value="cloud-computing">Cloud Computing</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Comments</label>
                        <textarea name="comments" placeholder='type here.....' value={formData.comments} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100"></textarea>
                    </div>
                    <button type="submit" className="btn-shadow w-60 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 hover:text-shadow transition duration-300">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
