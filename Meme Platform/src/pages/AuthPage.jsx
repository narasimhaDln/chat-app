import React from 'react';
import AuthForms from '../components/Auth/AuthForms';

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Join MemeHub</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create, share, and enjoy the best memes on the Internet
        </p>
      </div>
      
      <AuthForms />
    </div>
  );
};

export default AuthPage;