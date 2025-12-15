import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Change this value to enable/disable route protection
  const protectionEnabled = false; // Set to true to enable protection

  const login = (username, password) => {
    if (username && password) {
      setUser({ username, id: Date.now() });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      protectionEnabled
    }}>
      {children}
    </AuthContext.Provider>
  );
};