import React, { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Calendar, Clock, MapPin, Users, FileText, Info } from 'lucide-react';
import { toast } from 'react-toastify';

import { z } from 'zod';
import eventService from '../appwrite/event';
import authService from '../appwrite/auth';

const EventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  date: z.string().refine(val => new Date(val) >= new Date(), "Date must be in the future"),
  time: z.string(),
  location: z.string().min(3, "Location must be specified"),
  eligibility: z.string().optional(),
  description: z.string().optional(),
});

const AddEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    eligibility: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = EventSchema.parse(eventDetails);

      const user = await authService.getCurrentUser();
      if (!user) {
        toast.error("You must be logged in to create an event.");
        return;
      }

      const response = await eventService.createEvent({
        ...validatedData,
        userId: user.$id
      });

      if (response && response.$id) {
  toast.success('Event successfully submitted!');

  setEventDetails({
    title: '',
    date: '',
    time: '',
    location: '',
    eligibility: '',
    description: ''
  });
  setErrors({});
} else {
  toast.error('Event submitted but response is invalid.');
}


    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.flatten().fieldErrors;
        setErrors(formErrors);

        const firstError = Object.values(formErrors)[0]?.[0];
        if (firstError) {
          toast.error('Validation Error', { description: firstError });
        }
      } else {
        toast.error('Submission Failed', {
          description: 'An unexpected error occurred.',
        });
        console.error('Event submission error:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto m-5 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">Create New Event</h1>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isExpanded && (
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 bg-orange-50 dark:bg-gray-800 p-3 rounded-lg flex items-start">
          <Info className="mr-2 mt-1 text-orange-500" size={20} />
          <div>
            <p className="font-semibold mb-2">Event Creation Guidelines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use a descriptive and engaging title</li>
              <li>Provide precise location details</li>
              <li>Set a future date</li>
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-200 mb-2">
            <FileText className="mr-2 text-orange-500" size={20} />
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className={`w-full p-3 border rounded-lg transition-all ${errors.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-orange-500'} dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
        </div>

        {/* Date & Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-200 mb-2">
              <Calendar className="mr-2 text-orange-500" size={20} />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg transition-all ${errors.date ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-orange-500'} dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date[0]}</p>}
          </div>
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-200 mb-2">
              <Clock className="mr-2 text-orange-500" size={20} />
              Time
            </label>
            <input
              type="time"
              name="time"
              value={eventDetails.time}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-200 mb-2">
            <MapPin className="mr-2 text-orange-500" size={20} />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            placeholder="Enter event location or virtual link"
            className={`w-full p-3 border rounded-lg transition-all ${errors.location ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-orange-500'} dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location[0]}</p>}
        </div>

        {/* Eligibility Input */}
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-200 mb-2">
            <Users className="mr-2 text-orange-500" size={20} />
            Eligibility
          </label>
          <textarea
            name="eligibility"
            value={eventDetails.eligibility}
            onChange={handleChange}
            placeholder="Describe who can attend this event"
            className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-200 mb-2">
            <FileText className="mr-2 text-orange-500" size={20} />
            Event Description
          </label>
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            placeholder="Provide detailed information about the event"
            className="w-full p-3 border rounded-lg h-36 focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
