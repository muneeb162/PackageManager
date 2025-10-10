import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Package, Lock, EyeOff, Eye } from 'lucide-react';
import { useTheme } from './ThemeContext';
import axios from 'axios';


const LoginPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Theme-based style classes
  const themeClasses = {
    mainBackground: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    card: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    input: isDarkMode 
      ? 'bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
      : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    inputLabel: isDarkMode ? 'text-gray-200' : 'text-gray-700',
    button: isDarkMode 
      ? 'bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200'
      : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200',
    error: 'text-red-500',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make a POST request to your backend server for authentication
      const response = await axios.post('https://your-backend-api.com/login', {
        email: formData.email,
        password: formData.password,
      });

      // Check if login is successful
      if (response.data.success) {
        // If successful, redirect to the dashboard
        navigate('/dashboard');
      } else {
        // If failed, set error message
        setError('Invalid email or password');
      }
    } catch (err) {
      // Handle any errors from the request
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${themeClasses.mainBackground} p-4`}>
      <Card className={`w-full max-w-md ${themeClasses.card}`}>
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <CardTitle className={`text-2xl font-bold text-center ${themeClasses.text}`}>
            Package Manager
          </CardTitle>
          <p className={`text-sm ${themeClasses.textMuted}`}>
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${themeClasses.inputLabel}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-md outline-none ${themeClasses.input}`}
              />
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${themeClasses.inputLabel}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 rounded-md outline-none ${themeClasses.input}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className={`p-3 rounded-md bg-red-100 border border-red-200 ${themeClasses.error}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-md font-medium ${themeClasses.button} 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In
                </div>
              )}
            </button>

            <div className="text-center space-y-2">
              <button
                type="button"
                className={`text-sm ${themeClasses.textMuted} hover:underline`}
              >
                Forgot password?
              </button>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;