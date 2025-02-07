import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        eligibility: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/events', eventDetails);
            console.log('Event Details Submitted:', response.data);
        } catch (error) {
            console.error('Error submitting event details:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className='text-4xl font-bold mb-6 text-orange-600 dark:text-gray-100' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Add New Event/Webinar</h1>
            <div className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2" >Event Title:</label>
                        <input type="text" placeholder="Enter Event Title" name="title" value={eventDetails.title} onChange={handleChange} className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2">Date:</label>
                        <input type="date" name="date" value={eventDetails.date} onChange={handleChange} className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2">Time:</label>
                        <input type="time" name="time" value={eventDetails.time} onChange={handleChange} className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2">Location:</label>
                        <input type="text" placeholder='Enter Location' name="location" value={eventDetails.location} onChange={handleChange} className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2">Eligibility:</label>
                        <input type="text" placeholder='Enter Eligibility'  name="eligibility" value={eventDetails.eligibility} onChange={handleChange} className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" style={{ height: '80px' }} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2">Event Description:</label>
                        <textarea name="description" placeholder='Enter Description' value={eventDetails.description} onChange={handleChange} className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100" style={{ height: '150px' }} />
                    </div>
                    <button type="submit" className="btn-shadow w-60 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 hover:text-shadow transition duration-300">
                        Submit Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
