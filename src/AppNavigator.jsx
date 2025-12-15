import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import ChatRouteValidator from "./ChatRouteValidator";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ChatScreen } from "./pages/ChatScreen";
import SelectTutor from "./pages/SelectTutor";
import SignUpPage from "./pages/SignUpPage";

const AppNavigator = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes with Layout */}
          <Route 
            path="/" 
            element={
              <Layout>
                <HomePage />
              </Layout>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              <Layout>
                <LoginPage />
              </Layout>
            } 
          />

          <Route 
            path="/signup" 
            element={
              <Layout>
                <SignUpPage />
              </Layout>
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