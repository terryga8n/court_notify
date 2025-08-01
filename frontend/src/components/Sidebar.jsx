import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar bg-white shadow-sm p-4" style={{ minHeight: '100vh', borderRight: '1px solid #e5e7eb' }}>
      <h2 className="mb-4 text-primary" style={{ fontWeight: 700, fontSize: 22 }}>Menu</h2>
      <ul className="list-unstyled">
        <li><Link to="/dashboard" className="sidebar-link">Home</Link></li>
        {user.role === 'clerk' && <li><Link to="/dashboard/case-overview" className="sidebar-link">Case Overview</Link></li>}
        <li><Link to="/dashboard/case-search" className="sidebar-link">Case Search</Link></li>
        {user.role === 'clerk' && <li><Link to="/dashboard/notification-settings" className="sidebar-link">Notification Settings</Link></li>}
        <li><Link to="/dashboard/my-cases" className="sidebar-link">My Cases</Link></li>
        {user.role === 'admin' && <li><Link to="/dashboard/manage-users" className="sidebar-link">User Management</Link></li>}
        {user.role === 'clerk' && (
          <li>
            <Link to="/dashboard/case-entry" className="sidebar-link">New Case Entry</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
