import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useUser } from '../../context/UserContext';
import { Toast } from '../UI/Toast';

const Layout = ({ children }) => {
  const { loading, darkMode, toggleDarkMode } = useUser();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-8">
        {children}
      </main>
      
      <Footer />
      
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Layout;