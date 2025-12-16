// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [token, setToken] = useState(null);
  
  // Change this value to enable/disable route protection
  const protectionEnabled = true; // Set to true to enable protection

  // Initialize auth state from sessionStorage on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
      }
    }
  }, []);

  const login = (userData, authToken, navigate) => {
    if (userData && authToken) {
      setUser(userData);
      setToken(authToken);
      
      sessionStorage.setItem("token", authToken);
      sessionStorage.setItem("user", JSON.stringify(userData));
      
      // Always navigate to protected home page after login
      if (navigate) {
        navigate('/', { replace: true });
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      token,
      login, 
      logout, 
      isAuthenticated: !!token,
      protectionEnabled
    }}>
      {children}
    </AuthContext.Provider>
  );
};