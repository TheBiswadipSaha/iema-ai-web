import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Sparkles, Menu, X, ArrowLeft, LogOut, UserCircle } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import ProfilePopup from '../utils/ProfilePopup';

function Header({ 
  logo = "IEMA AI",
  isBackPresent = true,
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
  currentPath = '/',
  isChatScreen = false,
  onBack = () => {},
  user = null,
  navigate = () => {}
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    setIsProfileOpen(true);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  const UserDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`p-2 ${isChatScreen ? 'lg:p-2' : 'lg:p-3'} hover:bg-gray-700 rounded-full transition ${isChatScreen ? 'bg-gray-900' : 'bg-emerald-900'}`}
      >
        <User size={18} className={`${isChatScreen ? 'text-gray-300' : 'text-emerald-500'} lg:w-5 lg:h-5`} />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          <button onClick={handleProfileClick} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-900 transition text-left text-gray-300 hover:text-white">
            <UserCircle size={18} />
            <span className="text-sm font-medium">Profile</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-900 transition text-left text-gray-300 hover:text-red-400">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  if (isChatScreen) {
    return (
      <>
        <header className="bg-black text-white shadow-lg border-b border-gray-800">
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {isBackPresent && (
                  <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition">
                    <ArrowLeft size={20} className="text-gray-300" />
                  </button>
                )}
                <div className="flex items-center space-x-2">
                  <img src={logoImg} className='w-10 h-10 rounded-xl' alt="Logo" />
                  <span className="text-lg font-bold hidden sm:inline">{logo}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button className="relative p-2 hover:bg-gray-800 rounded-full transition bg-gray-900">
                  <Bell size={18} className="text-gray-300" />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notificationCount}</span>
                  )}
                </button>
                <div className="flex items-center space-x-2 bg-gray-900 px-3 sm:px-4 py-2 rounded-full">
                  <span className="text-xs sm:text-sm font-medium text-white">Credits: <span className="text-emerald-400">{credits}</span></span>
                </div>
                <UserDropdown />
              </div>
            </div>
          </div>
        </header>
        <ProfilePopup isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />
      </>
    );
  }

  return (
    <>
      <header className="bg-black text-white shadow-lg border-b border-gray-800">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={logoImg} className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl' alt="Logo" />
              <span className="text-lg sm:text-xl font-bold">{logo}</span>
            </div>

            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex space-x-6 xl:space-x-8 items-center">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.path} onClick={(e) => handleNavigation(e, item.path)} className={`text-sm hover:text-emerald-400 transition ${currentPath === item.path ? 'text-emerald-400' : 'text-gray-300'}`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {isLoggedIn ? (
                <>
                  <button className="relative p-2 lg:p-3 hover:bg-gray-800 rounded-full transition bg-gray-900">
                    <Bell size={18} className="text-gray-300 lg:w-5 lg:h-5" />
                    {notificationCount > 0 && (
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notificationCount}</span>
                    )}
                  </button>
                  <div className="hidden lg:flex items-center space-x-2 bg-gray-900 px-4 py-3 rounded-full shadow-md">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-white">{credits} Credits</span>
                  </div>
                  <UserDropdown />
                  <button onClick={onButtonClick} className="bg-black text-white px-4 lg:px-6 py-2 rounded-full font-medium transition flex items-center space-x-2 shadow-lg shadow-emerald-500 border border-emerald-500 text-sm">
                    <Sparkles size={16} className="lg:w-[18px] lg:h-[18px]" />
                    <span className="hidden lg:inline">Upgrade</span>
                  </button>
                </>
              ) : (
                <button onClick={onButtonClick} className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 lg:px-6 py-2 rounded-full font-medium transition flex items-center space-x-2 text-sm">
                  <Sparkles size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span>Get Started</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>

            <button className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <nav className="mb-4">
                <ul className="flex flex-col space-y-3">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.path} onClick={(e) => handleNavigation(e, item.path)} className={`block text-sm hover:text-emerald-400 transition py-2 ${currentPath === item.path ? 'text-emerald-400' : 'text-gray-300'}`}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center justify-between bg-gray-900 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-white">{credits} Credits</span>
                      </div>
                      <button className="relative">
                        <Bell size={18} className="text-gray-300" />
                        {notificationCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notificationCount}</span>
                        )}
                      </button>
                    </div>
                    <button onClick={handleProfileClick} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center space-x-2 hover:bg-gray-800">
                      <UserCircle size={18} />
                      <span>Profile</span>
                    </button>
                    <button onClick={onButtonClick} className="bg-black text-white px-6 py-3 rounded-full font-medium transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500 border border-emerald-500">
                      <Sparkles size={18} />
                      <span>Upgrade</span>
                    </button>
                    <button onClick={handleLogout} className="bg-gray-900 text-red-400 px-6 py-3 rounded-lg font-medium transition flex items-center justify-center space-x-2 hover:bg-gray-800">
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button onClick={onButtonClick} className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-full font-medium transition flex items-center justify-center space-x-2 w-full">
                    <Sparkles size={18} />
                    <span>Get Started</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <ProfilePopup isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />
    </>
  );
}

export default Header;