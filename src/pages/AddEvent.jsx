// AddEvent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddEvent = ({ setEventList }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    eligibility: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEvent = {
      ...formData,
      id: Date.now(), // unique ID
    };

    // Save to localStorage (or Appwrite later)
    const prev = JSON.parse(localStorage.getItem("events")) || [];
    const updated = [...prev, fullEvent];
    localStorage.setItem("events", JSON.stringify(updated));

    if (setEventList) {
      setEventList(updated);
    }

    // Redirect to Events page
    navigate("/events");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <textarea name="eligibility" placeholder="Eligibility" value={formData.eligibility} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <button type="submit">Submit Event</button>
    </form>
  );
};

export default AddEvent;
