import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Events = () => {
    const events = [
        {
            title: "Webinar: Introduction to HTML",
            date: "February 10, 2025",
            time: "10:00 AM - 12:00 PM",
            description: "Join us for an introductory session on HTML where you'll learn the basics of structuring a webpage and creating content.",
            link: "/register"
        },
        {
            title: "Workshop: Advanced CSS techniques",
            date: "March 15, 2025",
            time: "2:00 PM - 4:00 PM",
            description: "Dive deep into advanced CSS techniques, including animations, transitions, and responsive design best practices.",
            link: "/register"
        },
    ];

    return (
        <div className="p-6 min-h-screen">
            <div className='mt-20'></div>
            <motion.h1 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-4xl font-extrabold mb-10 text-orange-600 dark:text-gray-100 text-center '
            >
                Upcoming Events/Webinars
            </motion.h1>
            <div className="flex flex-wrap justify-center gap-10 mx-4 sm:mx-8 md:mx-16 lg:mx-60 mb-20">
                {events.map((event, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col p-6 w-full sm:w-96 border rounded-xl shadow-2xl bg-white dark:bg-gray-800 hover:shadow-orange-500 transition-all duration-300"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">{event.title}</h2>
                        <p className="text-gray-700 dark:text-gray-400 mb-4"><strong>Date:</strong> {event.date}</p>
                        <p className="text-gray-700 dark:text-gray-400 mb-4"><strong>Time:</strong> {event.time}</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">{event.description}</p>
                        <div className="mt-auto flex justify-center">
                            <motion.a 
                                href={event.link} 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-full sm:w-60 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
                            >
                                Register Now
                            </motion.a>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center">
                <Link to="/add-event">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-80 px-6 py-4 text-lg sm:text-xl bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:bg-orange-700 transition duration-300"
                    >
                        Add Events/Webinars
                    </motion.button>
                </Link>
            </div>
        </div>
    );
}

export default Events;