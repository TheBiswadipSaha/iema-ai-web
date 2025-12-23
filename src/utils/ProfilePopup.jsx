import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useHttp } from '../hooks/useHttp';

function ProfilePopup({ isOpen, onClose, user: initialUser }) {
  const popupRef = useRef(null);
  const [user, setUser] = useState(initialUser || null);
  const [fetchError, setFetchError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const { getReq, loading } = useHttp();
  const [isPending, startTransition] = useTransition();
  
  // Fetch profile data when popup opens
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("yo")
      if (isOpen || !hasFetched) {
        console.log('Fetching profile data...');
        setHasFetched(true);
        
        // Get token from localStorage - adjust key name if different
        const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
        console.log('Token:', token ? 'Present' : 'Missing');
        
        const result = await getReq('api/auth/profile', token);
        console.log('Profile API Response:', result);
        
        // Wrap state updates in startTransition to make them non-blocking
        startTransition(() => {
          if (result.success) {
            // Adjust based on your API response structure
            setUser(result?.data);
            console.log({user})
            setFetchError(null);
          } else {
            setFetchError(result.message || 'Failed to load profile');
          }
        });
      }
    };

    if (isOpen) {
      fetchProfile();
    } else {
      // Reset when popup closes
      setHasFetched(false);
    }
  }, [isOpen, hasFetched]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Show loading state if either the HTTP request is loading or transition is pending
  const isLoading = loading || isPending;

  return (
    <div className="fixed inset-0 bg-[#00000065] backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
      <div ref={popupRef} className="bg-[#2a2a2a] rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-semibold">Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : fetchError ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <p className="text-red-400 text-sm">{fetchError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-400 hover:text-red-300 text-sm underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {getInitials(user?.name)}
                </span>
              </div>
            </div>

            {/* Display Name */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-2">Name</label>
              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white">
                {user?.user?.name || 'User'}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-2">Email ID</label>
              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white break-all">
                {user?.user?.email || 'No email available'}
              </div>
            </div>

            {/* Info Text */}
            <p className="text-gray-500 text-xs text-center mt-6">
              Your profile helps people recognize you
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePopup;