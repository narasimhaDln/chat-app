import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMeme } from '../context/MemeContext';
import { useUser } from '../context/UserContext';
import { ThumbsUp, MessageSquare, Share2, ChevronLeft, Trash2, Flag, MoreHorizontal, Download, Send } from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const MemeDetailPage = () => {
  const { id } = useParams();
  const { getMemeById, upvoteMeme, viewMeme, deleteMeme, updateMeme } = useMeme();
  const { currentUser, getUserById } = useUser();
  const navigate = useNavigate();
  
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creator, setCreator] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  useEffect(() => {
    const loadMeme = () => {
      try {
      const memeData = getMemeById(id);
        
        if (memeData) {
      setMeme(memeData);
          
          // Track view - only call viewMeme once when the component mounts
          viewMeme(id);
          
          // Get creator info if available
          if (memeData.creatorId) {
            const creatorData = getUserById(memeData.creatorId);
            if (creatorData) {
              setCreator(creatorData);
            }
          }
        } else {
          setError('Meme not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading meme:', err);
        setError('Failed to load meme data');
      setLoading(false);
    }
    };
    
    loadMeme();
  }, [id, getMemeById, getUserById]);
  
  const handleUpvote = () => {
    upvoteMeme(id);
    setMeme(prevMeme => ({
      ...prevMeme,
      upvotes: prevMeme.upvotes + 1
    }));
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      const result = await deleteMeme(id);
      
      if (result.success) {
        navigate('/profile/' + currentUser.username);
      } else {
        alert(result.message || 'Failed to delete meme');
      }
    }
  };
  
  const handleDownload = () => {
    // Convert the meme image to a downloadable link
    const link = document.createElement('a');
    link.href = meme.imageUrl;
    link.download = `meme-${meme.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    if (!currentUser) {
      alert("You need to log in to post comments");
      return;
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      text: commentText,
      createdAt: new Date().toISOString(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatarUrl,
    };

    const updatedComments = meme.comments ? [...meme.comments, newComment] : [newComment];
    
    // Update meme with new comment
    const updatedMeme = {
      ...meme,
      comments: updatedComments
    };
    
    // Save to context/storage
    updateMeme(meme.id, { comments: updatedComments });
    
    // Update local state
    setMeme(updatedMeme);
    setCommentText('');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (error || !meme) {
    return <NotFoundPage />;
  }
  
  const isOwnMeme = currentUser && meme.creatorId === currentUser.id;
  
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
          <ChevronLeft size={16} className="mr-1" />
          Back to homepage
        </Link>
          </div>
          
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Meme Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {meme.title}
              </h1>
          
              {meme.creatorUsername && (
                <Link 
                  to={`/profile/${meme.creatorUsername}`}
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {meme.creatorAvatarUrl && (
                    <img 
                      src={meme.creatorAvatarUrl} 
                      alt={meme.creatorUsername} 
                      className="w-6 h-6 rounded-full mr-2 object-cover"
                    />
                  )}
                  <span>
                    Created by {meme.creatorDisplayName || meme.creatorUsername}
                  </span>
                </Link>
              )}
              
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-3">{new Date(meme.createdAt).toLocaleDateString()}</span>
                <span className="mr-3">{meme.views} views</span>
                <span>{meme.upvotes} upvotes</span>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreHorizontal size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <button
                      onClick={handleDownload}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </button>
                    
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Share2 size={16} className="mr-2" />
                      Share
                    </button>
                    
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Flag size={16} className="mr-2" />
                      Report
                    </button>
                    
                    {isOwnMeme && (
                      <button
                        onClick={handleDelete}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </button>
                    )}
                  </div>
              </div>
            )}
            </div>
          </div>
        </div>
        
        {/* Meme Image */}
        <div className="flex justify-center p-4 sm:p-6">
          <div className="max-w-2xl w-full">
            <img 
              src={meme.imageUrl} 
              alt={meme.title}
              className="w-full rounded-lg"
            />
          </div>
        </div>
        
        {/* Meme Actions */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleUpvote}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <ThumbsUp size={20} className="mr-1.5" />
              <span>{meme.upvotes || 0}</span>
            </button>
            
            <button 
              onClick={handleShowComments}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <MessageSquare size={20} className="mr-1.5" />
              <span>Comment{meme.comments && meme.comments.length > 0 ? ` (${meme.comments.length})` : ''}</span>
            </button>
              </div>
          
          <div>
            <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <Share2 size={20} className="mr-1.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Comments{meme.comments && meme.comments.length > 0 ? ` (${meme.comments.length})` : ''}
            </h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex gap-3">
                {currentUser && (
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.username} 
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-grow">
                  <div className="relative">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={currentUser ? "Write a comment..." : "Login to comment"}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows="2"
                      disabled={!currentUser}
                    ></textarea>
                    <button 
                      type="submit"
                      disabled={!currentUser || !commentText.trim()}
                      className="absolute bottom-2 right-2 p-1.5 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  {!currentUser && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Login
                      </Link> to post a comment
                    </p>
                  )}
                </div>
              </div>
            </form>
            
            {/* Comments List */}
            <div className="space-y-4">
              {meme.comments && meme.comments.length > 0 ? (
                meme.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img 
                      src={comment.userAvatar || 'https://placehold.co/100/gray/white?text=User'} 
                      alt={comment.username} 
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <Link 
                            to={`/profile/${comment.username}`}
                            className="font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                          >
                            {comment.username}
                          </Link>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tags if available */}
        {meme.tags && meme.tags.length > 0 && (
          <div className="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {meme.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default MemeDetailPage;