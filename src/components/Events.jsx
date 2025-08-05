import React, { useState } from 'react';
import { Bookmark, Calendar, Clock, Plus, ArrowRight, Sparkles, Users, MapPin } from 'lucide-react';

const Events = () => {
    const events = [
        {
            id: 1,
            title: "Introduction to HTML",
            type: "Webinar",
            date: "February 10, 2025",
            time: "10:00 AM - 12:00 PM",
            description: "Join us for an introductory session on HTML where you'll learn the basics of structuring a webpage and creating content.",
            attendees: 124,
            category: "Frontend",
            difficulty: "Beginner",
            instructor: "Sarah Chen",
            link: "/register"
        },
        {
            id: 2,
            title: "Advanced CSS Techniques",
            type: "Workshop",
            date: "March 15, 2025",
            time: "2:00 PM - 4:00 PM",
            description: "Dive deep into advanced CSS techniques, including animations, transitions, and responsive design best practices.",
            attendees: 89,
            category: "Frontend",
            difficulty: "Advanced",
            instructor: "Alex Rodriguez",
            link: "/register"
        },
        {
            id: 3,
            title: "React Performance Optimization",
            type: "Masterclass",
            date: "April 8, 2025",
            time: "3:00 PM - 5:00 PM",
            description: "Learn cutting-edge techniques to optimize React applications for maximum performance and user experience.",
            attendees: 156,
            category: "Framework",
            difficulty: "Intermediate",
            instructor: "Jamie Park",
            link: "/register"
        }
    ];

    const [savedEvents, setSavedEvents] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Webinar', 'Workshop', 'Masterclass'];

    const handleSaveEvent = (eventId, e) => {
        e.preventDefault();
        setSavedEvents(prev => 
            prev.includes(eventId) 
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const isEventSaved = (eventId) => savedEvents.includes(eventId);

    const filteredEvents = activeFilter === 'All' 
        ? events 
        : events.filter(event => event.type === activeFilter);

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-400/80 to-amber-400/70 dark:from-orange-600/90 dark:to-amber-600/85">
                <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/40"></div>
                <div className="relative px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/20 backdrop-blur-sm rounded-full text-orange-800 dark:text-orange-200 border border-orange-200/50 dark:border-orange-300/30">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-sm font-medium">New Events Added Weekly</span>
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight text-orange-900 dark:text-white sm:text-7xl mb-6">
                            Upcoming Events
                        </h1>
                        <p className="text-xl leading-8 text-orange-800 dark:text-orange-100 max-w-2xl mx-auto">
                            Join our community of learners and level up your skills with expert-led sessions, workshops, and masterclasses.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-50 dark:from-gray-900"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeFilter === filter
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                    {filteredEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-500/50"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <div className="relative p-6 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {event.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full mb-1">
                                                {event.type}
                                            </span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{event.category}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleSaveEvent(event.id, e)}
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            isEventSaved(event.id)
                                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500'
                                        }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${isEventSaved(event.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    {event.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                                    {event.description}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">By {event.instructor}</span>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getDifficultyColor(event.difficulty)}`}>
                                        {event.difficulty}
                                    </span>
                                </div>
                            </div>

                            <div className="px-6 pb-6">
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4 text-orange-500" />
                                        <span>{event.attendees} registered</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl"
                                >
                                    <span>Register Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-3xl border border-orange-200 dark:border-orange-500/20">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Host Your Own Event
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                                Share your expertise with our community. Create and manage your own events and workshops.
                            </p>
                        </div>
                        <a href="/add-event" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105">
                            <Plus className="w-5 h-5" />
                            <span>Add New Event</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;