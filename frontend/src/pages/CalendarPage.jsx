import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './CalendarPage.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month'); // Default view

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/cases?role=${user.role}&email=${user.email}`)
      .then(res => {
        const formattedEvents = [];
        res.data.forEach(c => {
          if (c.nextHearingDate) {
            formattedEvents.push({
              title: `${c.caseNumber} - Hearing`,
              start: new Date(c.nextHearingDate),
              end: new Date(c.nextHearingDate),
              allDay: true,
              style: (user.role === 'magistrate' && c.magistrateEmail === user.email) || (user.role === 'public' && (c.accusedEmail === user.email || c.reporterEmail === user.email))
              
                ? { backgroundColor: '#008040', color: '#fff', borderRadius: '8px' }
                : {}
            });
          }
          if (c.judgmentDate) {
            formattedEvents.push({
              title: `${c.caseNumber} - Judgment`,
              start: new Date(c.judgmentDate),
              end: new Date(c.judgmentDate),
              allDay: true,
              style: { backgroundColor: '#eab308', color: '#222', borderRadius: '8px' }
            });
          }
        });
        setEvents(formattedEvents);
      });
  }, [user]);

  const eventStyleGetter = event => ({
    style: event.style || {}
  });

  return (
    <div className="container py-4">
      <div
        className="bg-white rounded shadow-sm p-4 mb-4"
        style={{
          width: '100%',
          margin: '0 auto',
          // Prevent overflow past viewport
          boxSizing: 'border-box'
        }}
      >
        <h2 className="mb-4 text-success" style={{ fontWeight: 700 }}>Court Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            width: '100%',
            minWidth: 0,
            maxWidth: '100%',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
          eventPropGetter={eventStyleGetter}
          views={['month', 'agenda', 'week', 'day']}
          view={view}
          onView={setView}
          toolbar={true}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
