import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { email, password });
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setError('');
    
    // Simulate OAuth flow
    console.log(`Initiating ${provider} login...`);
    
    // In a real application, you would redirect to the OAuth provider
    // For Google: window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...'
    // For GitHub: window.location.href = 'https://github.com/login/oauth/authorize?...'
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`${provider} login initiated! In production, this would redirect to ${provider}'s OAuth page.`);
    }, 1000);
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
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors"
                  type="button"
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
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold   transition-all duration-300 hover:bg-emerald-600  hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 cursor-pointer ">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            {/* Divider with better styling */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-b from-[#1a1a1a]/90 to-[#0a0a0a]/90 text-gray-400">or continue with</span>
              </div>
            </div> */}

            {/* Social Login Buttons */}
            {/* <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-[#0f0f0f] border border-gray-700 rounded-xl hover:border-emerald-500/50 hover:bg-[#1a1a1a] transition-all duration-300 group">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-300 group-hover:text-white transition cursor-pointer">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-[#0f0f0f] border border-gray-700 rounded-xl hover:border-emerald-500/50 hover:bg-[#1a1a1a] transition-all duration-300 group">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-gray-300 group-hover:text-white transition cursor-pointer">GitHub</span>
              </button>
            </div> */}

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