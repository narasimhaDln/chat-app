import React from 'react';
import { useUser } from '../context/UserContext';
import { useMeme } from '../context/MemeContext';
import MemeCard from '../components/Meme/MemeCard';
import { Bookmark } from 'lucide-react';

const BookmarksPage = () => {
  const { bookmarks, isAuthenticated } = useUser();
  const { memes, loading } = useMeme();
  
  const bookmarkedMemes = memes.filter(meme => bookmarks.includes(meme.id));
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Sign in to view bookmarks</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to save and view your bookmarked memes.</p>
        <a
          href="/auth"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          Sign In
        </a>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Bookmark size={24} className="text-purple-600 dark:text-purple-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Bookmarked Memes</h1>
      </div>
      
      {bookmarkedMemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedMemes.map(meme => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">No bookmarks yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            When you bookmark memes, they'll appear here for easy access.
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Browse Memes
          </a>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage; 