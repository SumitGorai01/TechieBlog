import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        let isValid = true;

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            const mailtoUrl = `mailto:your-email@example.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;
            
            window.location.href = mailtoUrl;
            
            // Clear form after opening mail client
            setFormData({ name: '', email: '', message: '' });
            toast.success('Mail client opened successfully!');
        } else {
            toast.error('Please fill in all required fields correctly.');
        }
    };

    return (
        <div className="mt-20 mb-28 max-w-3xl mx-auto p-8 bg-white bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg rounded-lg dark:text-white">
            <ToastContainer position="top-right" />
            
            <h1 className="text-4xl font-bold mb-6 text-center text-orange-600">Contact Us</h1>
            <p className="mb-8 text-center text-lg">If you have any questions, feel free to reach out!</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">
                        Name
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-gray-800 transition duration-200`}
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Email
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-gray-800 transition duration-200`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Message
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 border ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-gray-800 transition duration-200`}
                        rows="6"
                        placeholder="Enter your message"
                    ></textarea>
                    {errors.message && (
                        <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactUs;