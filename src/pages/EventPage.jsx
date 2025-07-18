// EventPage.jsx
import React, { useEffect, useState } from "react";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events yet</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="border p-3 mb-3 rounded shadow">
              <h3 className="font-semibold">{event.title}</h3>
              <p>{event.date} at {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Eligibility:</strong> {event.eligibility}</p>
              <p><strong>Description:</strong> {event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventPage;
