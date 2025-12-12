import React from 'react';
import { Bell, User, Sparkles } from 'lucide-react';

function Header({ 
  logo = "IEMA AI",
  menuItems = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Docs', path: '/docs' },
    { label: 'Blog', path: '/blog' }
  ],
  isLoggedIn = false,
  credits = 250,
  notificationCount = 0,
  onNavigate = () => {},
  onButtonClick = () => {},
  currentPath = '/'
}) {
  const handleNavigation = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="bg-black text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Sparkles size={28} className="text-white" />
          </div>
          <span className="text-xl font-bold">{logo}</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={`text-sm hover:text-emerald-400 transition ${
                    currentPath === item.path ? 'text-emerald-400' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <button className="relative p-3 hover:bg-gray-800 rounded-full transition bg-gray-900">
                <Bell size={20} className="text-gray-300" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Credits Display */}
              <div className="flex items-center space-x-2 bg-gray-900 px-4 py-3 rounded-full shadow-md">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-white">{credits} Credits</span>
              </div>

              {/* User Icon */}
              <button className="p-3 hover:bg-gray-700 rounded-full transition bg-emerald-900">
                <User size={20} className="text-emerald-500" />
              </button>

              {/* Upgrade Button */}
              <button
                onClick={onButtonClick}
                className="bg-black text-white px-6 py-2 rounded-full font-medium transition flex items-center space-x-2 shadow-lg shadow-emerald-500 border border-emerald-500"
              >
                <Sparkles size={18} />
                <span>Upgrade</span>
              </button>
            </>
          ) : (
            <>
              {/* Get Started Button */}
              <button
                onClick={onButtonClick}
                className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-full font-medium transition flex items-center space-x-2"
              >
                <Sparkles size={18} />
                <span>Get Started</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;