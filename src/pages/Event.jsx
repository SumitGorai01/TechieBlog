import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data); // Ensure backend returns an array
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No events found.</p>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-orange-600 mb-2">{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            {event.eligibility && <p><strong>Eligibility:</strong> {event.eligibility}</p>}
            {event.description && <p className="mt-2 text-sm text-gray-600">{event.description}</p>}
            <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
              Register
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
