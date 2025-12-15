import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, protectionEnabled } = useAuth();
  
  // If protection is disabled, allow access to all routes
  if (!protectionEnabled) {
    return children;
  }
  
  // If protection is enabled, check authentication
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;