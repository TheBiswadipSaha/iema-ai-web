import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-[140px] md:text-[180px] font-bold text-white/5 leading-none mb-4">
            404
          </h1>
          <div className="-mt-32 md:-mt-40">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 cursor-pointer bg-white/5 text-white rounded-lg font-medium border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Error Code */}
        <div className="mt-16">
          <p className="text-gray-600 text-sm font-mono">
            ERROR_404_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;