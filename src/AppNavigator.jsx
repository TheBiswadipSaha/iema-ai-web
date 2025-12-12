import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ChatScreen } from "./pages/ChatScreen";
import SelectTutor from "./pages/SelectTutor";

const AppContent = () => {
  const location = useLocation();
  
  // Define paths where footer should be hidden and chat header should be shown
  const chatPaths = [
    "/select-tutor/",
    "/select-tutor",
    "/select-tutor/ai-tutor",
    "/blog-generator",
    "/img-playground",
    "/web-summarizer",
    "/email-generator",
    "/img-generator",
    "/code-generator"
  ];
  
  const shouldHideFooter = chatPaths.includes(location.pathname);
  const isChatScreen = chatPaths.includes(location.pathname);

  return (
    <Layout hideFooter={shouldHideFooter} isChatScreen={isChatScreen}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Chat Pages */}
        <Route path="/select-tutor" element={<SelectTutor />} />
        <Route path="/select-tutor/ai-tutor" element={<ChatScreen />} />
        <Route path="/blog-generator" element={<ChatScreen />} />
        <Route path="/img-playground" element={<ChatScreen />} />
        <Route path="/web-summarizer" element={<ChatScreen />} />
        <Route path="/email-generator" element={<ChatScreen />} />
        <Route path="/img-generator" element={<ChatScreen />} />
        <Route path="/code-generator" element={<ChatScreen />} />

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

const AppNavigator = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default AppNavigator;