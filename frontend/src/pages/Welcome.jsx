import React from 'react';


const Welcome = () => {
  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 className="mb-3 text-success" style={{ fontWeight: 700 }}>Welcome to the Court Notification System</h2>
        <p className="mb-4 text-secondary" style={{ fontSize: '1.1rem' }}>
          Manage, track, and receive notifications for court cases efficiently and securely.
        </p>
        <CalendarDisplay />
        <div className="mt-4">
          <h4 className="mb-2 text-primary" style={{ fontWeight: 600 }}>Upcoming Notifications</h4>
          <ul className="list-group">
            <li className="list-group-item">Hearing for Case C001 on 2025-08-01</li>
            <li className="list-group-item">Judgment for Case C002 on 2025-08-15</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
