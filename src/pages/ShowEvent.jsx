import axios from "axios";
import { useEffect, useState } from "react";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      {events.map((event, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Eligibility:</strong> {event.eligibility}</p>
          <p><strong>Description:</strong> {event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowEvents;
