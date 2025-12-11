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
  const [protectionEnabled, setProtectionEnabled] = useState(true);

  const login = (username, password) => {
    // Simulate login - accept any non-empty credentials
    if (username && password) {
      setUser({ username, id: Date.now() });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleProtection = () => {
    setProtectionEnabled(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      protectionEnabled,
      toggleProtection
    }}>
      {children}
    </AuthContext.Provider>
  );
};