import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  User,
  Sparkles,
  Menu,
  X,
  ArrowLeft,
  LogOut,
  UserCircle,
  PrinterCheck,
  Gem,
  Coins
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import ProfilePopup from '../utils/ProfilePopup';

function Header({
  logo = 'IEMA AI',
  isBackPresent = true,
  menuItems = [
    { label: 'Features', path: '/' },
    { label: 'Pricing', path: '/pricing' },
    // { label: 'Docs', path: '/docs' },
    { label: 'Blog', path: '/blog' }
  ],
  isLoggedIn = false,
  credits = 0,
  notificationCount = 0,
  isChatScreen = false,
  user = null
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  credits =
    localStorage.getItem('unknown') ||
    sessionStorage.getItem('unknown') ||
    0;

  const currentPath = location.pathname;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  const UserDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`p-2 rounded-full transition  cursor-pointer ${isChatScreen ? 'bg-gray-900' : 'bg-emerald-900'
          }`}
      >
        <User
          size={18}
          className={isChatScreen ? 'text-gray-300' : 'text-emerald-500'}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-lg z-50">
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              setIsProfileOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-900 cursor-pointer"
          >
            <UserCircle size={18} />
            Profile
          </button>

          <button
            onClick={() => {
              navigate('/pricing');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-900 cursor-pointer"
          >
            <Coins size={18} />
            Buy Credits
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-red-400 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );

  /* ================= CHAT HEADER ================= */
  if (isChatScreen) {
    return (
      <>
        <header className="bg-black border-b border-gray-800">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {isBackPresent && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <img src={logoImg} className="w-10 h-10 rounded-xl" />
              <span className="font-bold hidden sm:block">{logo}</span>
            </div>

            <div className="flex items-center gap-3 s select-none">
              {/* <Bell size={18} className="text-gray-300" /> */}
              <div className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    <span className="text-emerald-400">{credits.toLocaleString()}</span>
                    <span className="text-gray-500 ml-1">credits</span>
                  </span>

                  {/* Expandable button on hover */}
                  <button
                    onClick={() => navigate('/pricing')}
                    className="flex cursor-pointer items-center gap-1 ml-2 px-0 overflow-hidden max-w-0 group-hover:max-w-[100px] group-hover:px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium transition-all duration-300 hover:bg-emerald-500 hover:text-black whitespace-nowrap"
                  >
                    <Coins size={12} />
                    <span>Buy More</span>
                  </button>
                </div>
              </div>
              <UserDropdown />
            </div>
          </div>
        </header>

        <ProfilePopup
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
        />
      </>
    );
  }

  /* ================= MAIN HEADER ================= */
  return (
    <>
      <header className="bg-black border-b border-gray-800">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-12 h-12 rounded-xl" />
            <span className="text-xl font-bold">{logo}</span>
          </div>

          <nav className="hidden lg:flex gap-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-sm transition ${currentPath === item.path
                  ? 'text-emerald-400'
                  : 'text-gray-300 hover:text-emerald-400 cursor-pointer'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">
                  {credits} <span className="text-emerald-400">Credits</span>
                </span>
                <UserDropdown />
                <button className="border border-emerald-500 px-6 py-2 rounded-full flex items-center gap-2">
                  <Sparkles size={16} />
                  Upgrade
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-emerald-500 text-black px-6 py-2 rounded-full flex items-center gap-2"
              >
                <Sparkles size={16} />
                Get Started
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-gray-800">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="block w-full text-left py-3 text-gray-300 hover:text-emerald-400 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </>
  );
}

export default Header;
