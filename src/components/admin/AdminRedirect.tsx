
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { DemoAdminLogin } from './DemoAdminLogin';

const AdminRedirect: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('demoAdminLoggedIn') === 'true';
  
  // If not logged in, show login page
  if (!isLoggedIn) {
    return <DemoAdminLogin />;
  }
  
  // For demo purposes, we'll load React admin components
  if (location.pathname === '/admin') {
    // Redirect to the dashboard page
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return null;
};

export default AdminRedirect;
