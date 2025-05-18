import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useMeme } from '../../context/MemeContext';
import { Heart, Flag, MessageCircle } from 'lucide-react';

const CommentSection = ({ memeId, comments }) => {
  const { isAuthenticated, currentUser } = useUser();
  const { addComment } = useMeme();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }
    
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await addComment(memeId, {
        userId: currentUser.id,
        username: currentUser.username,
        text: commentText.trim()
      });
      
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <MessageCircle size={20} className="mr-2" />
        Comments ({comments.length})
      </h3>
      
      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start space-x-3">
            <img 
              src={currentUser?.avatarUrl || "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150"} 
              alt={currentUser?.username} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={3}
                maxLength={140}
              ></textarea>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {commentText.length}/140 characters
                </span>
                <button
                  type="submit"
                  disabled={!commentText.trim() || isSubmitting}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Please <a href="/auth" className="text-purple-600 dark:text-purple-400 hover:underline">sign in</a> to leave a comment
          </p>
        </div>
      )}
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <img 
                src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150" 
                alt={comment.username} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <a href={`/profile/${comment.username}`} className="font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400">
                        {comment.username}
                      </a>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {comment.text}
                      </p>
                    </div>
                    <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
                      <button className="hover:text-red-500 transition-colors duration-200">
                        <Flag size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  <button className="ml-3 flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    <Heart size={14} className="mr-1" />
                    Like
                  </button>
                  <button className="ml-3 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;