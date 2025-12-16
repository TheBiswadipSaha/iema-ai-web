import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Router } from './context/RouterContext';
import AppNavigator from './AppNavigator';
import './App.css';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <AppNavigator />
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;