

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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15
            }
        }
    };

    return (
        <div className="px-4 py-10 sm:px-8 min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className='text-4xl sm:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300'
            >
                🚀 Upcoming Events & Webinars
            </motion.h1>

            <div className="grid gap-10 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-auto max-w-7xl">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        whileHover={{ y: -10, boxShadow: "0 15px 25px rgba(249, 115, 22, 0.15)" }}
                        className="group relative p-6 border-2 border-orange-100 rounded-2xl shadow-xl bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 transition duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-orange-600 transition duration-300">
                            {event.title}
                        </h2>

                        <div className="space-y-2 mb-6">
                            <p className="text-gray-600 dark:text-gray-400"><strong className="text-orange-600 dark:text-orange-400">📅 Date:</strong> {event.date}</p>
                            <p className="text-gray-600 dark:text-gray-400"><strong className="text-orange-600 dark:text-orange-400">🕒 Time:</strong> {event.time}</p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.description}</p>
                        </div>

                        <div className="flex justify-center">
                            <motion.a
                                href={event.link}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Register Now
                            </motion.a>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-16">
                <Link to="/add-event">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-8 py-4 text-lg sm:text-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Event
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};

export default Events;

