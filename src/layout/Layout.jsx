import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { navigate, currentPath } = useRouter();
  const { user, logout } = useAuth();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header currentPath={currentPath} navigate={handleNavigation} user={user} logout={logout} />

      {/* Main Content */}
      <main className="">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default Layout;