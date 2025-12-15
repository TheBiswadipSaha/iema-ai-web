import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const { navigate } = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#d8c5c556] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;