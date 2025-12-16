import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Check, X } from 'lucide-react';
import { useHttp } from '../hooks/useHttp';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const {showNotification} = useNotification();
  const {login} = useAuth();

  
  const { postReq, loading } = useHttp();
  
  // Password strength validation
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 1, label: 'Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Fair', color: 'bg-yellow-500' },
      { strength: 3, label: 'Good', color: 'bg-blue-500' },
      { strength: 4, label: 'Strong', color: 'bg-emerald-500' }
    ];

    return levels[strength - 1] || { strength: 0, label: '', color: '' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async () => {
    setError('');
    setApiResponse(null);
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (name.length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the terms and conditions');
      return;
    }
    
    try {
      const requestData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        isGoogleUser: false
      };

      // Using the postReq from useHttp hook
      const response = await postReq('api/auth/register', '', requestData);
      
      
      // Print the response to console
      console.log('API Response:', response);
      console.log('Response Success:', response.success);
      console.log('Response Message:', response.message);
      console.log('Full Response Object:', JSON.stringify(response, null, 2));
      
      // Store response in state to display in UI
      setApiResponse(response);
      
      if (response.success) {
        // alert('Account created successfully!');

        showNotification(response?.message, "success")
        login(response?.data?.user, response?.data?.accessToken) 
        // You can redirect here if needed
        // navigate('/dashboard');
      } else {
            showNotification(response?.message, "error")
            setError(response.message || 'Sign up failed');
        }
    } catch (err) {
        console.error('Error during sign up:', err);
        showNotification(response?.message, "error")
        setError('An unexpected error occurred');
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
            Join <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">GenAI Studio</span>
          </h1>
          <div className="w-full max-w-[500px] mx-auto text-center text-[#9ca3af] text-[14px] sm:text-[16px] font-[500]">
            Create your account and start your AI-powered journey today.
          </div>
        </div>

        {/* Enhanced Sign Up Form */}
        <div className="w-full bg-gradient-to-b from-[#1a1a1a]/90 to-[#0a0a0a]/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="space-y-6">
            {/* Name Input */}
            <div className="text-left group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-emerald-400 transition">Full Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-emerald-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#0f0f0f] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-500/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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
                  placeholder="Create a strong password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-400 transition-colors"
                  type="button"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength.strength ? passwordStrength.color : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  {passwordStrength.label && (
                    <p className="text-xs text-gray-400">
                      Password strength: <span className={`font-semibold ${passwordStrength.strength >= 3 ? 'text-emerald-400' : passwordStrength.strength >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>{passwordStrength.label}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-[#0f0f0f]/50 border border-gray-700/50 rounded-xl p-4 space-y-2">
              <p className="text-xs text-gray-400 font-semibold mb-2">Password must contain:</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  {password.length >= 8 ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-600" />
                  )}
                  <span className={password.length >= 8 ? 'text-emerald-400' : 'text-gray-500'}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {/[A-Z]/.test(password) && /[a-z]/.test(password) ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-600" />
                  )}
                  <span className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-emerald-400' : 'text-gray-500'}>
                    Upper and lowercase letters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {/[0-9]/.test(password) ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <X className="w-4 h-4 text-gray-600" />
                  )}
                  <span className={/[0-9]/.test(password) ? 'text-emerald-400' : 'text-gray-500'}>
                    At least one number
                  </span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-700 bg-[#0f0f0f] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition text-left">
                I agree to the <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm text-left bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                {error}
              </div>
            )}

            {/* API Response Display */}
            {/* {apiResponse && (
              <div className={`text-sm text-left rounded-xl p-4 border ${
                apiResponse.success 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <div className="font-bold mb-2">API Response:</div>
                <pre className="text-xs overflow-auto max-h-40 whitespace-pre-wrap">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )} */}

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center text-sm text-gray-400 pt-2">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition hover:underline">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;