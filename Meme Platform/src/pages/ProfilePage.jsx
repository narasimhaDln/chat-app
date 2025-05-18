import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMeme } from '../context/MemeContext';
import { useUser } from '../context/UserContext';
import MemeCard from '../components/Meme/MemeCard';
import { Calendar, Award, Grid, Settings, User as UserIcon, Link as LinkIcon, Bookmark, Activity, Mail, MapPin, Plus } from 'lucide-react';

const ProfilePage = () => {
  const { username } = useParams();
  const { getUserMemes } = useMeme();
  const { currentUser, allUsers, getUserById } = useUser();
  
  const [user, setUser] = useState(null);
  const [userMemes, setUserMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('memes');
  
  useEffect(() => {
    const loadUserData = () => {
      // Check if this is the current user's profile
      if (currentUser && currentUser.username === username) {
        setUser(currentUser);
        const memes = getUserMemes(currentUser.id);
        setUserMemes(memes);
      } else {
        // Look for user in all users
        let userData = null;
        if (allUsers && allUsers.length > 0) {
          userData = allUsers.find(u => u.username === username);
        }
        
    if (userData) {
      setUser(userData);
      const memes = getUserMemes(userData.id);
      setUserMemes(memes);
        }
    }
    setLoading(false);
    };
    
    loadUserData();
  }, [username, getUserMemes, currentUser, allUsers]);
  
  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate how long ago the user joined
  const calculateJoinedTime = (dateString) => {
    const joinDate = new Date(dateString);
    const now = new Date();
    const diffYears = now.getFullYear() - joinDate.getFullYear();
    const diffMonths = now.getMonth() - joinDate.getMonth();
    
    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    } else {
      const diffDays = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24));
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The user you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }
  
  const isOwnProfile = currentUser && currentUser.username === username;
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-5">
            {/* User Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.displayName}
                  </h1>
                <div className="flex items-center mt-1">
                  <span className="text-purple-600 dark:text-purple-400 font-medium mr-3">@{user.username}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
              
                {isOwnProfile ? (
                <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm text-sm">
                  <Settings size={16} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm text-sm">
                  <UserIcon size={16} className="mr-2" />
                    Follow
                  </button>
                )}
          </div>
          
            {/* Bio */}
            <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
              {user.bio}
            </p>
            
            {/* Stats Row */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Grid size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="font-semibold">{user.stats?.totalMemes || 0}</span> memes
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Activity size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="font-semibold">{user.stats?.totalUpvotes || 0}</span> upvotes
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Bookmark size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="font-semibold">{user.stats?.totalViews || 0}</span> views
              </div>
              {user.badges && user.badges.length > 0 && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Award size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="font-semibold">{user.badges.length}</span> badges
                </div>
              )}
              </div>
            </div>
            
          {/* Navigation Tabs */}
          <div className="flex border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('memes')} 
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'memes' 
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Memes
            </button>
            {user.badges && user.badges.length > 0 && (
              <button 
                onClick={() => setActiveTab('badges')} 
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'badges' 
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Badges
              </button>
            )}
            <button 
              onClick={() => setActiveTab('about')} 
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'about' 
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        {/* Memes Tab */}
        {activeTab === 'memes' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {isOwnProfile ? 'Your Memes' : `${user.username}'s Memes`}
        </h2>
              
              {isOwnProfile && (
                <Link to="/create" className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm text-sm">
                  <Plus size={16} className="mr-2" />
                  Create Meme
                </Link>
              )}
            </div>
        
        {userMemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userMemes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} showCreator={false} />
            ))}
          </div>
        ) : (
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isOwnProfile 
                ? "You haven't created any memes yet."
                : `${user.username} hasn't created any memes yet.`
              }
            </p>
            {isOwnProfile && (
                  <Link to="/create" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm inline-flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                Create Your First Meme
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Badges & Achievements
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.badges && user.badges.map((badge, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                >
                  <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-full mr-4">
                    <Award size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{badge}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Earned for excellence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* About Tab */}
        {activeTab === 'about' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              About {isOwnProfile ? 'You' : user.displayName}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bio</h3>
                <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Calendar size={16} className="text-gray-500 dark:text-gray-400 mr-3 w-5 flex-shrink-0" />
                    <div>
                      <p>Member since {formatDate(user.createdAt)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{calculateJoinedTime(user.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Mail size={16} className="text-gray-500 dark:text-gray-400 mr-3 w-5 flex-shrink-0" />
                    <span>{user.email || 'Email not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <LinkIcon size={16} className="text-gray-500 dark:text-gray-400 mr-3 w-5 flex-shrink-0" />
                    <span>memehub.com/{user.username}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Stats</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Grid size={16} className="text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm font-medium">Total Memes</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{user.stats?.totalMemes || 0}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Activity size={16} className="text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm font-medium">Total Upvotes</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{user.stats?.totalUpvotes || 0}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Bookmark size={16} className="text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm font-medium">Total Views</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{user.stats?.totalViews || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;