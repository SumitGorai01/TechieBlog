import React, { useState } from 'react';
import { toast } from 'react-toastify';
import eventService from '../appwrite/event'

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await eventService.registerForEvent(formData);
            if (response) {
                toast.success("Successfully registered for the workshop!");
                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    workshop: '',
                    comments: ''
                });
            } else {
                toast.error("Failed to register. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Form submission error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 max-w-6xl flex flex-col sm:flex-row shadow-2xl shadow-orange-500/70 rounded-lg w-full">
                {/* Left side image */}
                <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
                    <img
                        src="src/assets/workshop.png"
                        alt="Workshop"
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Right side form */}
                <div className="w-full sm:w-1/2 p-6">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 dark:from-white dark:via-orange-200 dark:to-red-200 bg-clip-text text-transparent leading-tight" style={{ display:'flex', justifyContent:'center' }}>
                        Register for Workshop
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Select Workshop</label>
                            <select
                                name="workshop"
                                value={formData.workshop}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100"
                                required
                            >
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
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div class="flex justify-center items-center">
  <button type="submit" class="w-full sm:w-60 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 hover:text-shadow transition duration-300">
    Register
  </button>
</div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
