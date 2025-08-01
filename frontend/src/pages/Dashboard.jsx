import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

// Pages
import CalendarPage from '../pages/CalendarPage';
import CaseOverview from '../pages/CaseOverview';
import CaseSearch from '../pages/CaseSearch';tificationSettings';
import NotificationSettings from '../pages/NotificationSettings';
import MyCases from '../pages/MyCases';es/AdminUserManagement';
import AdminUserManagement from '../pages/AdminUserManagement';elcome Page with Calendar
import CaseEntry from '../pages/CaseEntry';
const Dashboard = () => {
import './Dashboard.css'; = useAuth();

const Dashboard = () => { => {
  const { user, setUser } = useAuth();
  };
  const handleLogout = () => {
    setUser(null);n <Navigate to="/" />;
  };
  return (
  if (!user) return <Navigate to="/" />;
      <Sidebar />
  return (n className="flex-grow-1 p-4" style={{ background: '#f7f7f7' }}>
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Sidebar />ssName="text-2xl">Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
      <main className="flex-grow-1 p-4" style={{ background: '#f7f7f7' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ fontWeight: 600, color: '#008040' }}>
            Welcome, {user.email}
          </h2>ute path="/" element={<CalendarPage />} />
          <button.role === 'clerk' && <Route path="case-overview" element={<CaseOverview />} />}
            onClick={handleLogout}ch" element={<CaseSearch />} />
            className="btn btn-danger"ment={<MyCases />} />
            style={{ fontWeight: 500, borderRadius: 8 }}ication-settings" element={<NotificationSettings />} />}
          > {user.role === 'admin' && <Route path="manage-users" element={<AdminUserManagement />} />}
            Logout path="*" element={<h2>Page not found</h2>} />
          </button>
        </div>
      </main>
        <div className="dashboard-content bg-white rounded shadow-sm p-4">
          <Outlet />
        </div>
      </main>
    </div>ault Dashboard;
  );};export default Dashboard;