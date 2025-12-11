import React from 'react';
import { useRouter } from './context/RouterContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './layout/layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const AppNavigator = () => {
  const { currentPath } = useRouter();

  const routes = {
    '/': <HomePage />,
    '/login': <LoginPage />,
    // '/dashboard': <ProtectedRoute><DashboardPage /></ProtectedRoute>,
    // '/profile': <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  };

  const currentRoute = routes[currentPath] || <NotFoundPage />;

  return (
    <Layout>
      {currentRoute}
    </Layout>
  );
};

export default AppNavigator;