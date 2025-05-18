import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The resource you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 inline-flex items-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 