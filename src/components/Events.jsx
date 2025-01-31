import React from 'react';
import { Link } from 'react-router-dom';
const Events = () => {
    const events = [
        {
            title: "Webinar: Introduction to HTML",
            date: "February 10, 2025",
            time: "10:00 AM - 12:00 PM",
            description: "Join us for an introductory session on HTML where you'll learn the basics of structuring a webpage and creating content.",
            link: "#register"  
        },
        {
            title: "Workshop: Advanced CSS techniques",
            date: "March 15, 2025",
            time: "2:00 PM - 4:00 PM",
            description: "Dive deep into advanced CSS techniques, including animations, transitions, and responsive design best practices.",
            link: "#register"
        },
    ];

    return (
        <div className="p-4">
            <h1 className='text-3xl font-bold mb-6 text-orange-600 dark:text-gray-100' style={{ textShadow: '2px 4px 4px rgba(0, 0, 0, 0.8)' }}>Upcoming Events/Webinars</h1>
            <div className="ml-60 mr-60 mb-20">
                {events.map((event, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 mb-10">
                        <h2 className="text-2xl font-semibold mb-10">{event.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8"><strong>Date:</strong> {event.date}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8"><strong>Time:</strong> {event.time}</p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300 mb-16">{event.description}</p>
                        <button className="btn-shadow w-60 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 hover:text-shadow transition duration-300">
                            <a href={event.link}>Register Now</a>
                        </button>
                    </div>
                ))}
            </div>
            <Link to="/add-event">
            <button className="btn-shadow w-80 px-4 text-xl py-4 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 hover:text-shadow transition duration-300">Add Events/Webinars</button>
            </Link>
        </div>
    );
}

export default Events;
