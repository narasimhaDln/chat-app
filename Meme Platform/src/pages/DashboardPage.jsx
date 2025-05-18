import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useMeme } from '../context/MemeContext';
import StatsCard from '../components/Dashboard/StatsCard';
import MemePerformance from '../components/Dashboard/MemePerformance';
import { Eye, Award, ThumbsUp, MessageCircle } from 'lucide-react';

const DashboardPage = () => {
  const { currentUser } = useUser();
  const { getUserMemes } = useMeme();
  const [userMemes, setUserMemes] = useState([]);
  
  useEffect(() => {
    if (currentUser) {
      const memes = getUserMemes(currentUser.id);
      setUserMemes(memes);
    }
  }, [currentUser]);
  
  // Calculate total stats
  const totalViews = userMemes.reduce((sum, meme) => sum + (meme.views || 0), 0);
  const totalUpvotes = userMemes.reduce((sum, meme) => sum + (meme.upvotes || 0), 0);
  const totalComments = userMemes.reduce((sum, meme) => sum + (meme.comments ? meme.comments.length : 0), 0);
  
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Creator Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your meme performance and analytics
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Total Views" 
          value={totalViews.toLocaleString()} 
          icon={<Eye className="w-6 h-6 text-blue-500" />}
          description={`Across ${userMemes.length} memes`}
          color="blue"
        />
        <StatsCard 
          title="Total Upvotes" 
          value={totalUpvotes.toLocaleString()} 
          icon={<ThumbsUp className="w-6 h-6 text-green-500" />}
          description="From all your memes"
          color="green"
        />
        <StatsCard 
          title="Total Comments" 
          value={totalComments.toLocaleString()} 
          icon={<MessageCircle className="w-6 h-6 text-purple-500" />}
          description="Community engagement"
          color="purple"
        />
      </div>
      
      {/* Meme Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Meme Performance</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track how your memes are performing</p>
        </div>
      <MemePerformance memes={userMemes} />
      </div>
      
      {/* Achievements Section - Future Development */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Creator Achievements</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Unlock badges as you create popular content</p>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              You haven't unlocked any achievements yet. Keep creating great memes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;