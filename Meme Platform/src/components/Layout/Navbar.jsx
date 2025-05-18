import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Moon, Sun, Menu, X, Search, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { currentUser, isAuthenticated, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">Meme</span>
              <span className="text-2xl font-bold text-teal-500 dark:text-teal-400">Hub</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search memes, tags, creators..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                to="/create" 
                className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
              >
                Create Meme
              </Link>
              
              <Link 
                to="/leaderboard" 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                Leaderboard
              </Link>
              
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                  >
                    <img 
                      src={currentUser.avatarUrl || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                      alt={currentUser.username}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span>{currentUser.username}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={`/profile/${currentUser.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
              
              <button
                onClick={toggleDarkMode}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg pt-2 pb-4 transition-colors duration-200">
          <form onSubmit={handleSearch} className="px-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search memes, tags, creators..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
          
          <div className="space-y-2 px-4">
            <Link 
              to="/create" 
              className="block w-full text-center py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Meme
            </Link>
            
            <Link 
              to="/leaderboard" 
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to={`/profile/${currentUser.username}`} 
                  className="flex items-center py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img 
                    src={currentUser.avatarUrl || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                    alt={currentUser.username}
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                  {currentUser.username}
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full py-2 text-left text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;