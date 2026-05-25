import React, { useState, useEffect } from 'react';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    description: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (day) => {
    const selected = new Date(year, month, day);
    setSelectedDate(selected.toISOString().split('T')[0]);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      alert('Please enter an event title');
      return;
    }

    const eventToAdd = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      title: newEvent.title,
      time: newEvent.time || 'All day',
      description: newEvent.description || '',
      createdAt: new Date().toISOString()
    };

    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id ? eventToAdd : event
      ));
    } else {
      // Add new event
      setEvents([...events, eventToAdd]);
    }

    // Reset form and close modal
    setNewEvent({ title: '', time: '', description: '' });
    setEditingEvent(null);
    setShowEventModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      time: event.time === 'All day' ? '' : event.time,
      description: event.description
    });
    setShowEventModal(true);
  };

  const openAddEventModal = () => {
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }
    setEditingEvent(null);
    setNewEvent({ title: '', time: '', description: '' });
    setShowEventModal(true);
  };

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    return events.filter(event => event.date === selectedDate);
  };

  // Get all events grouped by date for schedule view
  const getAllEventsGrouped = () => {
    const grouped = {};
    events.forEach(event => {
      if (!grouped[event.date]) {
        grouped[event.date] = [];
      }
      grouped[event.date].push(event);
    });
    // Sort dates
    return Object.keys(grouped).sort().map(date => ({
      date,
      events: grouped[date]
    }));
  };

  // Check if a date has events (for dot indicator)
  const hasEventsOnDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Store Calendar
          </h1>
          <p className="text-gray-600 mt-2">Manage your schedule and events</p>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
          
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handlePrevMonth}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-105 text-gray-700 font-semibold"
            >
              ← Previous
            </button>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {currentMonth.toLocaleString('default', { month: 'long' })} {year}
            </h2>
            
            <button
              onClick={handleNextMonth}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-105 text-gray-700 font-semibold"
            >
              Next →
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 md:gap-3 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-500 py-2 text-sm md:text-base">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-xl bg-gray-50"></div>
            ))}
            
            {/* Actual days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;
              const isToday = today.getDate() === day && 
                             today.getMonth() === month && 
                             today.getFullYear() === year;
              const hasEvent = hasEventsOnDate(day);
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`
                    aspect-square rounded-xl transition-all duration-300 font-medium relative
                    ${isSelected 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-95' 
                      : isToday
                        ? 'bg-blue-100 border-2 border-blue-400 text-gray-800 hover:bg-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-105'
                    }
                  `}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={`text-lg ${isSelected ? 'font-bold' : ''}`}>{day}</span>
                    {hasEvent && !isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1"></div>
                    )}
                    {hasEvent && isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-1"></div>
                    )}
                    {isToday && !isSelected && (
                      <span className="text-[10px] mt-0.5 text-blue-500">Today</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Date Section with Events */}
          {selectedDate && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <div>
                  <span className="text-gray-500 text-sm">Selected Date</span>
                  <div className="text-2xl font-bold text-gray-800 flex items-center gap-2 mt-1">
                    <span>📅</span>
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <button
                  onClick={openAddEventModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-all shadow-md hover:shadow-lg"
                >
                  + Add Event
                </button>
              </div>

              {/* Events List for Selected Date */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-3">Events on this day:</h4>
                {getEventsForSelectedDate().length === 0 ? (
                  <div className="text-gray-400 text-sm py-4 text-center bg-white/50 rounded-xl">
                    No events scheduled. Click "Add Event" to create one.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {getEventsForSelectedDate().map(event => (
                      <div key={event.id} className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-semibold text-gray-800">{event.title}</span>
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                              ⏰ {event.time}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* View Schedule Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-3 bg-white rounded-xl shadow-md border border-gray-200 text-gray-700 font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            📋 View Full Schedule ({events.length} events)
          </button>
        </div>

        {/* Add/Edit Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEventModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Product Launch"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 10:00 AM or All day"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Add details about this event..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddEvent}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-all"
                  >
                    {editingEvent ? 'Update Event' : 'Save Event'}
                  </button>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowScheduleModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">📅 Complete Schedule</h2>
                <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ✕
                </button>
              </div>
              <div className="p-6">
                {events.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No events scheduled yet. Add some events to see them here!
                  </div>
                ) : (
                  <div className="space-y-6">
                    {getAllEventsGrouped().map(({ date, events: dateEvents }) => (
                      <div key={date} className="border-l-4 border-blue-400 pl-4">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        <div className="space-y-2">
                          {dateEvents.map(event => (
                            <div key={event.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-start">
                              <div>
                                <div className="font-semibold text-gray-800">{event.title}</div>
                                <div className="text-sm text-gray-500">⏰ {event.time}</div>
                                {event.description && (
                                  <div className="text-sm text-gray-600 mt-1">{event.description}</div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setShowScheduleModal(false);
                                    handleEditEvent(event);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}