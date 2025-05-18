import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-8 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">Meme</span>
              <span className="text-2xl font-bold text-teal-500 dark:text-teal-400">Hub</span>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              The Internet's Playground for Memes. Create, share, and enjoy the
              best memes on the web.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Create Meme
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/tag/funny" className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200">
                #funny
              </Link>
              <Link to="/tag/relatable" className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200">
                #relatable
              </Link>
              <Link to="/tag/gaming" className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200">
                #gaming
              </Link>
              <Link to="/tag/coding" className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200">
                #coding
              </Link>
              <Link to="/tag/food" className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200">
                #food
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MemeHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center">
          Made with <Heart size={14} className="mx-1 text-pink-500" /> by MemeHub Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;