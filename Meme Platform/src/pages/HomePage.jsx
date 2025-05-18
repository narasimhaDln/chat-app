import React, { useState, useEffect } from 'react';
import MemeCard from '../components/Meme/MemeCard';
import { useMeme } from '../context/MemeContext';
import { Trophy, TrendingUp, Clock, Siren as Fire, Tag } from 'lucide-react';
import { popularTags } from '../data/mockData';

const HomePage = () => {
  const { memes, loading, getTrendingMemes, getRecentMemes } = useMeme();
  const [selectedTab, setSelectedTab] = useState('trending');
  const [displayMemes, setDisplayMemes] = useState([]);
  
  useEffect(() => {
    switch (selectedTab) {
      case 'trending':
        setDisplayMemes(getTrendingMemes());
        break;
      case 'newest':
        setDisplayMemes(getRecentMemes());
        break;
      case 'top-day':
        // In a real app, you would filter by time
        setDisplayMemes(getTrendingMemes().slice(0, 5));
        break;
      case 'top-week':
        // In a real app, you would filter by time
        setDisplayMemes(getTrendingMemes().slice(0, 8));
        break;
      default:
        setDisplayMemes(getTrendingMemes());
    }
  }, [selectedTab, memes]);
  
  const tabs = [
    { id: 'trending', label: 'Trending', icon: <Fire size={18} /> },
    { id: 'newest', label: 'New', icon: <Clock size={18} /> },
    { id: 'top-day', label: 'Top 24h', icon: <TrendingUp size={18} /> },
    { id: 'top-week', label: 'Top Week', icon: <Trophy size={18} /> }
  ];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-6">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-4 py-2 whitespace-nowrap rounded-lg mr-2 transition-colors duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Meme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayMemes.length > 0 ? (
            displayMemes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No memes found. Be the first to create one!</p>
            </div>
          )}
        </div>
        
        {/* Load More Button (could be replaced with infinite scroll) */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
            Load More
          </button>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="space-y-6">
        {/* Meme of the Day */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 text-white flex items-center">
            <Trophy size={18} className="mr-2" />
            <h3 className="font-semibold">Meme of the Day</h3>
          </div>
          
          {displayMemes.length > 0 && (
            <MemeCard meme={displayMemes[0]} showCreator={true} showActions={false} />
          )}
        </div>
        
        {/* Popular Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <Tag size={18} className="mr-2 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Popular Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <a
                key={index}
                href={`/tag/${tag.name}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200 flex items-center"
              >
                #{tag.name}
                <span className="ml-1 text-xs bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full">
                  {tag.count}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Create CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-md p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Got a funny idea?</h3>
          <p className="mb-4">Turn it into a meme and share it with the world.</p>
          <a
            href="/create"
            className="inline-block px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Create a Meme
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;