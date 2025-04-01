import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Header from './Header';
import Footer from './Footer';

const Events = () => {
  const [session, loading] = useSession();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/community');
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('Please log in to create an event.');
      return;
    }

    const response = await fetch('/api/community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newEvent, author: session.user.email }),
    });

    if (response.ok) {
      const newEventData = await response.json();
      setEvents([...events, newEventData]);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
    } else {
      alert('Failed to create event.');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Events</h1>
        <form onSubmit={handleEventSubmit}>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Event Title"
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            required
          />
          <input
            type="text"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            placeholder="Event Location"
            required
          />
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Event Description"
            required
          />
          <button type="submit">Create Event</button>
        </form>
        <div className="events-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h2>{event.title}</h2>
              <p>{event.date} at {event.time}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <small>Posted by {event.author}</small>
              <button>RSVP</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
