import React, { useState } from 'react';

const NotificationSettings = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const handleSave = e => {
    e.preventDefault();
    alert(`Settings Saved:\nEmail: ${emailEnabled}\nSMS: ${smsEnabled}`);
  };

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2 className="mb-3 text-success" style={{ fontWeight: 700 }}>Notification Settings</h2>
        <form onSubmit={handleSave}>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="emailEnabled"
              checked={emailEnabled}
              onChange={() => setEmailEnabled(!emailEnabled)}
            />
            <label className="form-check-label" htmlFor="emailEnabled">
              Enable Email Notifications
            </label>
          </div>
         
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default NotificationSettings;
