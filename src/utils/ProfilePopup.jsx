import React, { useEffect, useRef } from 'react';

function ProfilePopup({ isOpen, onClose, user }) {
  const popupRef = useRef(null);

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

  return (
    <div className="fixed inset-0 bg-[#00000065] backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
      <div ref={popupRef} className="bg-[#2a2a2a] rounded-2xl p-8 w-full max-w-md mx-4">
        <h2 className="text-white text-2xl font-semibold mb-6">Profile</h2>
        
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">
              {getInitials(user?.displayName || user?.name)}
            </span>
          </div>
        </div>

        {/* Display Name */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">Display name</label>
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white">
            {user?.displayName || user?.name || 'User'}
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">Username</label>
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white">
            {user?.username || user?.email || 'username'}
          </div>
        </div>

        {/* Info Text */}
        <p className="text-gray-500 text-xs text-center mt-6">
          Your profile helps people recognize you
        </p>
      </div>
    </div>
  );
}

export default ProfilePopup;