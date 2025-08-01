import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Welcome from './pages/Welcome';
import CaseOverview from './pages/CaseOverview';
import CaseSearch from './pages/CaseSearch';
import MyCases from './pages/MyCases';
import NotificationSettings from './pages/NotificationSettings';
import AdminUserManagement from './pages/AdminUserManagement';  
import Footer from './components/Footer';
import Header from './components/Header'; // <-- Import Header
import CaseEntry from './pages/CaseEntry'; // <-- Add this import
import CaseDetails from './pages/CaseDetails'; // Add this import
import CalendarPage from './pages/CalendarPage'; // <-- Import CalendarPage
import EditCase from './pages/EditCase';


const App = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header /> {/* <-- Add Header here */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />}>
              <Route index element={<CalendarPage />} />
              <Route path="case-overview" element={<CaseOverview />} />
              <Route path="case-search" element={<CaseSearch />} />
              <Route path="my-cases" element={<MyCases />} />
              <Route path="notification-settings" element={<NotificationSettings />} />
              <Route path="manage-users" element={<AdminUserManagement />} />
              <Route path="case-entry" element={<CaseEntry />} />
              <Route path="case/:id" element={<CaseDetails />} />
              <Route path="*" element={<h2>Page not found</h2>} />
               {user?.role === 'clerk' && <Route path="case/:id/edit" element={<EditCase />} />}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
