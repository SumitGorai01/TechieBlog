import React, { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Calendar, Clock, MapPin, Users, FileText, Info, Sparkles } from 'lucide-react';

const AddEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '', date: '', time: '', location: '', eligibility: '', description: ''
  });
  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem('user'); 
    if (!isLoggedIn) {
      setLoginError('Please first login');
      return;
    }

    setLoginError('');
    console.log('Event submitted:', eventDetails);
  };

  const inputClasses = (field) => `w-full p-4 bg-white/50 dark:bg-gray-800/50 border-2 rounded-2xl transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 backdrop-blur-sm ${
    focusedField === field 
      ? 'border-orange-400 shadow-lg shadow-orange-500/10 bg-white dark:bg-gray-800' 
      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600'
  } ${errors[field] ? 'border-red-400' : ''}`;

  const labelIcon = (field, Icon) => (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${
      focusedField === field ? 'bg-orange-500 shadow-lg shadow-orange-500/25' : 'bg-orange-100 dark:bg-orange-900/30'
    }`}>
      <Icon className={`w-4 h-4 ${focusedField === field ? 'text-white' : 'text-orange-600 dark:text-orange-400'}`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/30 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950/20 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Bring your community together with something amazing</p>
        </div>

        <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl border border-orange-100/50 dark:border-orange-900/30 overflow-hidden">
          
          <div className="p-6 border-b border-orange-100/50 dark:border-orange-900/30">
            <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-between w-full text-left group hover:bg-orange-50/50 dark:hover:bg-orange-950/30 rounded-xl p-3 transition-all duration-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400/20 to-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                  <Info className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">Event Guidelines</span>
              </div>
              <div className="p-1 rounded-full group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                {isExpanded ? <ChevronUp size={20} className="text-orange-600" /> : <ChevronDown size={20} className="text-orange-600" />}
              </div>
            </button>

            {isExpanded && (
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-50/80 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 rounded-xl border border-orange-200/30 dark:border-orange-800/30">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>Use a descriptive and engaging title</li>
                  <li className="flex items-center"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>Provide precise location details</li>
                  <li className="flex items-center"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></div>Set a future date and time</li>
                </ul>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                {labelIcon('title', FileText)}
                Event Title
              </label>
              <input type="text" name="title" value={eventDetails.title} onChange={handleChange} onFocus={() => setFocusedField('title')} onBlur={() => setFocusedField('')} placeholder="Enter a captivating event title..." className={inputClasses('title')} />
              {errors.title && <p className="text-red-500 text-sm flex items-center mt-1"><div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>{errors.title[0]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  {labelIcon('date', Calendar)}
                  Date
                </label>
                <input type="date" name="date" value={eventDetails.date} onChange={handleChange} onFocus={() => setFocusedField('date')} onBlur={() => setFocusedField('')} className={inputClasses('date')} />
                {errors.date && <p className="text-red-500 text-sm flex items-center mt-1"><div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>{errors.date[0]}</p>}
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  {labelIcon('time', Clock)}
                  Time
                </label>
                <input type="time" name="time" value={eventDetails.time} onChange={handleChange} onFocus={() => setFocusedField('time')} onBlur={() => setFocusedField('')} className={inputClasses('time')} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                {labelIcon('location', MapPin)}
                Location
              </label>
              <input type="text" name="location" value={eventDetails.location} onChange={handleChange} onFocus={() => setFocusedField('location')} onBlur={() => setFocusedField('')} placeholder="Where will the magic happen?" className={inputClasses('location')} />
              {errors.location && <p className="text-red-500 text-sm flex items-center mt-1"><div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>{errors.location[0]}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                {labelIcon('eligibility', Users)}
                Eligibility
              </label>
              <textarea name="eligibility" value={eventDetails.eligibility} onChange={handleChange} onFocus={() => setFocusedField('eligibility')} onBlur={() => setFocusedField('')} placeholder="Who can join this amazing experience?" rows={3} className={`${inputClasses('eligibility')} resize-none`} />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                {labelIcon('description', FileText)}
                Event Description
              </label>
              <textarea name="description" value={eventDetails.description} onChange={handleChange} onFocus={() => setFocusedField('description')} onBlur={() => setFocusedField('')} placeholder="Tell everyone what makes this event special..." rows={5} className={`${inputClasses('description')} resize-none`} />
            </div>

            <button onClick={handleSubmit} className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transform hover:-translate-y-0.5">
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Create Event
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            {loginError && (
              <div className="mt-3 text-center animate-fadeIn">
                <span className="inline-flex items-center px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {loginError}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ready to bring people together? ✨</p>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;