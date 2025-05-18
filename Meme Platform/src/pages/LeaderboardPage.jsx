import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeme } from '../context/MemeContext';
import { Trophy, TrendingUp, ThumbsUp, Crown, Award, ChevronDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LeaderboardPage = () => {
  const { memes } = useMeme();
  const { allUsers } = useUser();
  const [timeRange, setTimeRange] = useState('week');
  const [leaderboardTab, setLeaderboardTab] = useState('creators');
  
  // Get top memes based on upvotes
  const getTopMemes = () => {
    return [...memes]
      .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
      .slice(0, 10);
  };
  
  // Get top creators based on total upvotes across all memes
  const getTopCreators = () => {
    // Group memes by creator and calculate total stats
    const creatorStats = memes.reduce((acc, meme) => {
      if (!acc[meme.creatorId]) {
        acc[meme.creatorId] = {
          id: meme.creatorId,
          username: meme.creatorUsername,
          totalMemes: 0,
          totalUpvotes: 0,
          totalViews: 0
        };
      }
      
      acc[meme.creatorId].totalMemes += 1;
      acc[meme.creatorId].totalUpvotes += (meme.upvotes || 0);
      acc[meme.creatorId].totalViews += (meme.views || 0);
      
      return acc;
    }, {});
    
    // Convert to array and sort by total upvotes
    return Object.values(creatorStats)
      .sort((a, b) => b.totalUpvotes - a.totalUpvotes)
      .slice(0, 10)
      .map(stats => {
        // Find user details (avatar, etc.) from allUsers
        const userDetails = allUsers && allUsers.find(user => user.id === stats.id);
        return { 
          ...stats, 
          avatarUrl: (userDetails && userDetails.avatarUrl) || 
            "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150",
          badges: (userDetails && userDetails.badges) || []
        };
      });
  };
  
  const topMemes = getTopMemes();
  const topCreators = getTopCreators();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          See who's creating the most popular memes
        </p>
      </div>
      
      {/* Time Range Selection */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <button
            onClick={() => setLeaderboardTab('creators')}
            className={`flex items-center px-4 py-2 rounded-l-lg ${
              leaderboardTab === 'creators'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Crown size={18} className="mr-2" />
            Top Creators
          </button>
          <button
            onClick={() => setLeaderboardTab('memes')}
            className={`flex items-center px-4 py-2 rounded-r-lg ${
              leaderboardTab === 'memes'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Trophy size={18} className="mr-2" />
            Top Memes
          </button>
        </div>
        
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
      
      {/* Leaderboard Content */}
      {leaderboardTab === 'creators' ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Creator
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Memes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Upvotes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Views
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {topCreators.map((creator, index) => (
                <tr key={creator.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 ? (
                        <div className="bg-yellow-400 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                          <Trophy size={16} />
                        </div>
                      ) : index === 1 ? (
                        <div className="bg-gray-300 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                          <Trophy size={16} />
                        </div>
                      ) : index === 2 ? (
                        <div className="bg-amber-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                          <Trophy size={16} />
                        </div>
                      ) : (
                        <div className="text-gray-700 dark:text-gray-300 font-semibold w-8 h-8 flex items-center justify-center">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                        src={creator.avatarUrl || "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150"}
                        alt={creator.username} 
                      />
                      <div>
                        <Link to={`/profile/${creator.username}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400">
                          {creator.username}
                        </Link>
                        {creator.badges && creator.badges.length > 0 && (
                          <div className="flex mt-1">
                            <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full flex items-center">
                              <Award size={10} className="mr-1" />
                              {creator.badges[0]}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {creator.totalMemes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <ThumbsUp size={14} className="mr-1 text-green-500" />
                      {creator.totalUpvotes}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {creator.totalViews}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topMemes.map((meme, index) => (
            <div key={meme.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-200">
                {/* Rank Badge */}
                <div className="absolute top-2 left-2 z-10">
                  {index === 0 ? (
                    <div className="bg-yellow-400 text-white p-2 rounded-full shadow-md">
                      <Trophy size={20} />
                    </div>
                  ) : index === 1 ? (
                    <div className="bg-gray-300 text-white p-2 rounded-full shadow-md">
                      <Trophy size={20} />
                    </div>
                  ) : index === 2 ? (
                    <div className="bg-amber-600 text-white p-2 rounded-full shadow-md">
                      <Trophy size={20} />
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-full shadow-md font-bold w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </div>
                  )}
                </div>
                
                {/* Meme Image with Text */}
              <Link to={`/meme/${meme.id}`} className="block">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={meme.imageUrl} 
                      alt={meme.title} 
                      className="object-contain w-full h-full"
                    />
                  </div>
                  {/* Text overlays are only shown here if they're not already embedded in the image */}
                  {meme.topText && !meme.imageUrl.includes('withText') && !meme.imageUrl.includes('data:image/jpeg') && (
                    <div className="absolute top-0 left-0 right-0 text-center p-2 bg-black bg-opacity-40">
                      <p className="text-white text-lg md:text-xl font-bold uppercase tracking-wider stroke-black" style={{
                        textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                        lineHeight: '1.2'
                      }}>
                        {meme.topText}
                      </p>
                    </div>
                  )}
                  {meme.bottomText && !meme.imageUrl.includes('withText') && !meme.imageUrl.includes('data:image/jpeg') && (
                    <div className="absolute bottom-0 left-0 right-0 text-center p-2 bg-black bg-opacity-40">
                      <p className="text-white text-lg md:text-xl font-bold uppercase tracking-wider stroke-black" style={{
                        textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                        lineHeight: '1.2'
                      }}>
                        {meme.bottomText}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
                
                {/* Meme Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {meme.title}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <Link 
                      to={`/profile/${meme.creatorUsername}`}
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      {meme.creatorUsername}
                    </Link>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <ThumbsUp size={14} className="mr-1" />
                    {meme.upvotes || 0}
                  </div>
                  <span className="mx-2">•</span>
                  <span>{new Date(meme.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;