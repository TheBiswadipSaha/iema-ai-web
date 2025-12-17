// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, protectionEnabled, isLoading } = useAuth();
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }
  
  // If protection is disabled, allow access to all routes
  if (!protectionEnabled) {
    return children;
  }
  
  // If protection is enabled, check authentication
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;