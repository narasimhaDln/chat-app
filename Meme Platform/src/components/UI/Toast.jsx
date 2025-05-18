import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  if (!isVisible) return null;
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20';
      default:
        return 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20';
    }
  };
  
  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      case 'info':
        return 'border-blue-500';
      default:
        return 'border-blue-500';
    }
  };
  
  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 flex items-center p-4 mb-4 w-full max-w-xs rounded-lg shadow border-l-4 ${getBackgroundColor()} ${getBorderColor()} transition-all duration-300 ease-in-out animate-slide-in`}
      role="alert"
    >
      <div className="inline-flex flex-shrink-0 items-center justify-center mr-3">
        {getIcon()}
      </div>
      <div className="text-sm font-normal text-gray-800 dark:text-gray-200">
        {message}
      </div>
      <button 
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
        onClick={() => setIsVisible(false)}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;