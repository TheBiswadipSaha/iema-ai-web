import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Define valid chat types - matches all routes from HomeCard
export const VALID_CHAT_TYPES = [
  'image-playground',
  'image-generator',
  'ai-tutor',
  'blog-generator',
  'code-generator',
  'email-generator',
  'web-summarizer'
];

const ChatRouteValidator = ({ children }) => {
  const { type, chatId } = useParams();
  
  // Check if the chat type is valid
  if (!VALID_CHAT_TYPES.includes(type)) {
    return <Navigate to="/404" replace />;
  }
  
  return children;
};

export default ChatRouteValidator;