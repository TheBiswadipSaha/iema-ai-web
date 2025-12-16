import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ChatRouteValidator from "./ChatRouteValidator";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ChatScreen } from "./pages/ChatScreen";
import SelectTutor from "./pages/SelectTutor";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "./context/AuthContext";

// Wrapper component to conditionally render HomePage based on auth status
const HomePageWrapper = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    // Protected home page - chat screen mode with footer and hideFooter true
    return (
      <Layout hideFooter={false} isChatScreen={true} isBackPresent={false}>
        <HomePage />
      </Layout>
    );
  }
  
  // Public home page - normal mode with footer visible
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

const AppNavigator = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Home Page - Works for both authenticated and unauthenticated users */}
          <Route 
            path="/" 
            element={<HomePageWrapper />} 
          />
          
          {/* Login/Signup - Redirect to home if authenticated */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />

          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            } 
          />
          
          {/* Select Tutor - Protected Route with Layout (no footer, chat screen mode) */}
          <Route 
            path="/select-tutor" 
            element={
              <ProtectedRoute>
                <Layout hideFooter={true} isChatScreen={true}>
                  <SelectTutor />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Single Chat Route - All chat types pass through here */}
          <Route 
            path="/chat/:type" 
            element={
              <ProtectedRoute>
                <ChatRouteValidator>
                  <Layout hideFooter={true} isChatScreen={true}>
                    <ChatScreen />
                  </Layout>
                </ChatRouteValidator>
              </ProtectedRoute>
            } 
          />

          {/* Chat Route with Chat ID */}
          <Route 
            path="/chat/:type/:chatId" 
            element={
              <ProtectedRoute>
                <ChatRouteValidator>
                  <Layout hideFooter={true} isChatScreen={true}>
                    <ChatScreen />
                  </Layout>
                </ChatRouteValidator>
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Page - No Layout */}
          <Route 
            path="/404" 
            element={<NotFoundPage />} 
          />
          
          {/* Catch all - Redirect to 404 */}
          <Route 
            path="*" 
            element={<Navigate to="/404" replace />} 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppNavigator;