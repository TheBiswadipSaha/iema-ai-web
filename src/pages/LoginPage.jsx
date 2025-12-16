import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHttp } from '../hooks/useHttp';
import { useNotification } from '../context/NotificationContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { postReq, loading } = useHttp();
  const { showNotification } = useNotification();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      const requestData = {
        email: email.trim().toLowerCase(),
        password
      };

      // Using the postReq from useHttp hook
      const response = await postReq('api/auth/login', '', requestData);
      
      // Print the response to console
      console.log('API Response:', response);
      console.log('Response Success:', response.success);
      console.log('Response Message:', response.message);
      console.log('Full Response Object:', JSON.stringify(response, null, 2));
      
      if (response.success) {
        showNotification(response?.message || 'Login successful!', "success");
        
        // Login and navigate - navigate is handled by login function
        login(response?.data?.user, response?.data?.accessToken, navigate);
      } else {
        showNotification(response?.message || 'Login failed', "error");
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      showNotification('An unexpected error occurred', "error");
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center py-8 px-4 bg-black overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 h-96 w-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 h-96 w-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Enhanced green glow effect */}
      <div className="absolute h-200 min-w-0 lg:w-200 max-w-200 bg-[#05a014a4] blur-[500px] -z-10"></div>

      {/* Dark mode grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 70, 51, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 70, 51, 1) 1px, transparent 1px)
          `
        }}
      />

      {/* Radial gradient fade */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#000000]"
        style={{
          maskImage: "radial-gradient(ellipse at center, transparent 10%, #00af12fb 70%)"
        }}
      />

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center text-white w-full max-w-md">
        {/* Badge with animation */}
        <div className="mb-6 sm:mb-8 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 w-full max-w-[250px] justify-center mx-auto backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
          <div className="h-3 w-3 rounded-full bg-[#b3a528]"></div>
          <span className="text-sm text-[#74818d] font-semibold text-[15px]">AI-Powered Platform</span>
        </div>

        {/* Heading with better animation */}
        <div className="w-full px-4 mb-10">
          <h1 className="mb-4 text-center text-3xl sm:text-4xl md:text-5xl text-white font-bold">
            Welcome Back to <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">GenAI Studio</span>
          </h1>
          <div className="w-full max-w-[500px] mx-auto text-center text-[#9ca3af] text-[14px] sm:text-[16px] font-[500]">
            Sign in to unlock the full potential of AI-powered creativity and productivity.
          </div>
        </div>

        {/* Enhanced Login Form */}
        <div className="w-full bg-gradient-to-b from-[#1a1a1a]/90 to-[#0a0a0a]/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="space-y-6">
            {/* Email Input with enhanced styling */}
            <div className="text-left group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-emerald-400 transition">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-emerald-400' : 'text-gray-500'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#0f0f0f] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-500/50"
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input with enhanced styling */}
            <div className="text-left group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-emerald-400 transition">Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-emerald-400' : 'text-gray-500'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-12 py-3.5 bg-[#0f0f0f] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-500/50"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors"
                  type="button"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message with better styling */}
            {error && (
              <div className="text-red-400 text-sm text-left bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-center gap-2 animate-in slide-in-from-top">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                {error}
              </div>
            )}

            {/* Remember & Forgot Password Row */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-700 bg-[#0f0f0f] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                  disabled={loading}
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition">Remember me</span>
              </label>
              <a href="#" className="text-emerald-400 hover:text-emerald-300 transition font-semibold">
                Forgot password?
              </a>
            </div>

            {/* Enhanced Login Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 cursor-pointer">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            {/* Sign Up Link with better styling */}
            <div className="text-center text-sm text-gray-400 pt-2">
              Don't have an account?{' '}
              <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-bold transition hover:underline">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}