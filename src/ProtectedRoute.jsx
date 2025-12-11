import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, protectionEnabled } = useAuth();

  if (protectionEnabled && !isAuthenticated) {
    return <LoginPage />;
  }

  return children;
};

export default ProtectedRoute;