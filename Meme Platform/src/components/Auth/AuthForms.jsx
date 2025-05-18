import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Mail, Lock, User, ArrowRight, Image, Edit3 } from 'lucide-react';

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    avatarUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useUser();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      let result;
      
      if (isLogin) {
        result = await login({
          username: formData.username,
          password: formData.password
        });
      } else {
        result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName || formData.username,
          avatarUrl: formData.avatarUrl
        });
      }
      
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ form: result.message });
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {isLogin ? 'Sign In to Your Account' : 'Create a New Account'}
        </h2>
      
      {errors.form && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter your username"
              />
            </div>
          {errors.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
          </div>
          
          {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Name (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Edit3 size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="How should we call you?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Avatar URL (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="URL to your profile picture"
                />
              </div>
            </div>
          </>
          )}
          
          <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
              />
            </div>
          {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
          </div>
          
          {!isLogin && (
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
          <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            {isSubmitting ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
            <ArrowRight size={18} />
            )}
          </button>
      </form>
      
      <div className="mt-6 text-center">
          <button
            onClick={toggleAuthMode}
          className="text-purple-600 dark:text-purple-400 hover:underline focus:outline-none"
          >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
      </div>
    </div>
  );
};

export default AuthForms;