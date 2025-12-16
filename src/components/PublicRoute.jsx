// src/components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to protected home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the public page (login/signup)
  return children;
};

export default PublicRoute;