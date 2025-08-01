import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

// Pages
import CalendarPage from '../pages/CalendarPage';
import CaseOverview from '../pages/CaseOverview';
import CaseSearch from '../pages/CaseSearch';
import NotificationSettings from '../pages/NotificationSettings';
import MyCases from '../pages/MyCases';
import AdminUserManagement from '../pages/AdminUserManagement';
import CaseEntry from '../pages/CaseEntry';

import './Dashboard.css';

const Dashboard = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return <Navigate to="/" />;

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Sidebar />

      <main className="flex-grow-1 p-4" style={{ background: '#f7f7f7' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ fontWeight: 600, color: '#008040' }}>
            Welcome, {user.email}
          </h2>
          <button
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ fontWeight: 500, borderRadius: 8, width: '120px', minWidth: 'unset', padding: '8px 0' }} // Reduced width
          >
            Logout
          </button>
        </div>

        <div className="dashboard-content bg-white rounded shadow-sm p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
