import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ChatScreen } from "./pages/ChatScreen";

const AppNavigator = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Chat Pages */}
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
    </BrowserRouter>
  );
};

export default AppNavigator;
