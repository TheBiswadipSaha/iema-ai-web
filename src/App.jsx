import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Router } from './context/RouterContext';
import AppNavigator from './AppNavigator';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <AppNavigator />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;