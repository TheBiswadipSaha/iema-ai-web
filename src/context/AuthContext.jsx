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
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  
  // Change this value to enable/disable route protection
  const protectionEnabled = false; // Set to true to enable protection

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
      }
    }
  }, []);

  const login = (userData, userRole, authToken) => {
    if (userData && authToken) {
      setUser(userData);
      setRole(userRole);
      setToken(authToken);
      
      localStorage.setItem("token", authToken);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      role,
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