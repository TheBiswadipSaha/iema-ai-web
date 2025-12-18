import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, hideFooter = false, isChatScreen, isBackPresent= true }) => {
  const { navigate, currentPath } = useRouter();
  const { user, logout } = useAuth();
  const navigation= useNavigate();
  const score = localStorage.getItem('unknown') || sessionStorage.getItem('unknown') || 0;

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleBack = () => {
    window.history.back();
  };

  // Define paths where ChatHeader should be shown
  const chatPaths = [
    "/select-tutor/ai-tutor",
    "/blog-generator",
    "/image-generator",
    "/web-summarizer",
    "/email-generator",
    "/img-generator",
    "/code-generator"
  ];



  // Debug logging - remove this after fixing
  console.log('Current Path:', currentPath);
  console.log('Is Chat Screen:', isChatScreen);
  console.log('Chat Paths:', chatPaths);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with conditional rendering */}
      <Header 
        currentPath={currentPath} 
        navigate={handleNavigation} 
        user={user} 
        isBackPresent={isBackPresent}
        logout={logout}
        isLoggedIn={!!user}
        credits={score}
        notificationCount={isChatScreen ? 3 : 0}
        isChatScreen={isChatScreen}
        onBack={handleBack}
        onNavigate={(path) => navigate(path)}
        onButtonClick={() => navigation('/login')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - conditionally rendered */}
      {!hideFooter && <Footer />}
      
    </div>
  );
};

export default Layout;