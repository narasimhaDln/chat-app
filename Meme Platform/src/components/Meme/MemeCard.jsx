import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Flag, ImageOff, Heart, Bookmark, BookmarkCheck, MoreHorizontal } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useMeme } from '../../context/MemeContext';

const MemeCard = ({ meme, showCreator = true, showActions = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isAuthenticated, currentUser, toggleBookmark, isBookmarked } = useUser();
  const { upvoteMeme } = useMeme();
  const navigate = useNavigate();
  
  // Get the creator's avatar URL
  const getCreatorAvatarUrl = () => {
    // Check if creator avatar is already in the meme data
    if (meme.creatorAvatarUrl) {
      return meme.creatorAvatarUrl;
    }
    
    // Check if this is the current user's meme
    if (currentUser && currentUser.id === meme.creatorId) {
      return currentUser.avatarUrl;
    }
    
    // Default avatar if creator not found
    return 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150';
  };
  
  const creatorAvatarUrl = getCreatorAvatarUrl();
  
  const handleImageError = () => {
    console.log('Image failed to load:', meme.imageUrl);
    setImageError(true);
  };
  
  const getPlaceholderImage = () => {
    // Return a placeholder image based on meme title/content
    return `https://placehold.co/600x400/gray/white?text=${encodeURIComponent(meme.title || 'Meme')}`;
  };
  
  const handleVote = (e, voteType) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }
    
    if (voteType === 'upvote') {
      upvoteMeme(meme.id);
    }
  };
  
  const handleNavigateToProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${meme.creatorUsername}`);
  };
  
  const handleNavigateToMeme = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/meme/${meme.id}`);
  };
  
  const shareMeme = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: meme.title,
        text: `Check out this meme: ${meme.title}`,
        url: `${window.location.origin}/meme/${meme.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/meme/${meme.id}`);
      // Show toast that link is copied
    }
  };
  
  const handleCardClick = () => {
    navigate(`/meme/${meme.id}`);
  };
  
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement like functionality
  };
  
  const handleShowComments = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement show comments functionality
  };
  
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    shareMeme(e);
  };
  
  const handleOptionsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement options functionality
  };
  
  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
        {/* Meme Header with Title */}
        {showCreator && (
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div 
                onClick={handleNavigateToProfile}
                className="block cursor-pointer"
              >
                <img 
                  src={creatorAvatarUrl} 
                  alt={meme.creatorUsername} 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100/gray/white?text=User';
                  }}
                />
              </div>
              <div>
                <div 
                  onClick={handleNavigateToProfile}
                  className="font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                >
                  {meme.creatorUsername}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(meme.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {meme.title}
            </div>
          </div>
        )}
        
        {/* If we need to show the title but no creator, show it in a subtle way */}
        {!showCreator && (
          <div className="px-4 py-2 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
            <span>{meme.title}</span>
            <span>{new Date(meme.createdAt).toLocaleDateString()}</span>
        </div>
        )}
        
        {/* Meme Image with Text */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
            {imageError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <ImageOff size={48} className="mb-2" />
                <p className="text-sm font-medium">{meme.title || 'Image not available'}</p>
                {(meme.topText || meme.bottomText) && (
                  <div className="mt-2 text-center px-4">
                    {meme.topText && <p className="text-sm mb-1">"{meme.topText}"</p>}
                    {meme.bottomText && <p className="text-sm">"{meme.bottomText}"</p>}
                  </div>
                )}
              </div>
            ) : (
            <img 
              src={meme.imageUrl} 
              alt={meme.title} 
              className="object-contain w-full h-full"
                onError={handleImageError}
            />
            )}
          </div>
          
          {/* Text overlays are only shown if image has loaded successfully */}
          {!imageError && meme.topText && !meme.imageUrl.includes('withText') && !meme.imageUrl.includes('data:image/jpeg') && (
            <div className="absolute top-0 left-0 right-0 text-center p-2 bg-black bg-opacity-40">
              <p className="text-white text-lg md:text-xl font-bold uppercase tracking-wider" style={{
                textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                lineHeight: '1.2'
              }}>
                {meme.topText}
              </p>
            </div>
          )}
          
          {!imageError && meme.bottomText && !meme.imageUrl.includes('withText') && !meme.imageUrl.includes('data:image/jpeg') && (
            <div className="absolute bottom-0 left-0 right-0 text-center p-2 bg-black bg-opacity-40">
              <p className="text-white text-lg md:text-xl font-bold uppercase tracking-wider" style={{
                textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                lineHeight: '1.2'
              }}>
                {meme.bottomText}
              </p>
            </div>
          )}
        </div>
        
        {/* Meme Actions */}
        {showActions && (
          <div className="px-4 py-2 flex items-center justify-between border-t dark:border-gray-700">
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isBookmarked(meme.id) ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                }`}
                disabled={!isAuthenticated}
              >
                <Heart
                  size={18}
                  className={isBookmarked(meme.id) ? 'fill-current' : ''}
                />
                <span>{meme.upvotes || 0}</span>
              </button>
              
              <button
                onClick={handleShowComments}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400"
              >
                <MessageCircle size={18} />
                <span>{meme.comments ? meme.comments.length : 0}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400"
              >
                <Share2 size={18} />
              </button>
              
              {isAuthenticated && (
                <button
                  onClick={() => toggleBookmark(meme.id)}
                  className={`flex items-center space-x-1 ${
                    isBookmarked(meme.id) ? 'text-purple-500' : 'text-gray-600 dark:text-gray-400'
                  }`}
                  aria-label={isBookmarked(meme.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                >
                  {isBookmarked(meme.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              )}
            </div>
            
            <button
              onClick={handleOptionsClick}
              className="text-gray-600 dark:text-gray-400"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeCard;