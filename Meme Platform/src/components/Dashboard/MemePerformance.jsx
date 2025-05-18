import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Eye, ThumbsUp, MessageCircle, MoreVertical, Edit, Trash2, Share2 } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';

const MemePerformance = ({ memes }) => {
  const { deleteMeme } = useMeme();
  const [sortOption, setSortOption] = useState('newest');
  const [openMenu, setOpenMenu] = useState(null);
  
  const getSortedMemes = () => {
    const sortedMemes = [...memes];
    
    switch (sortOption) {
      case 'newest':
        return sortedMemes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sortedMemes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'most-upvotes':
        return sortedMemes.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      case 'most-views':
        return sortedMemes.sort((a, b) => (b.views || 0) - (a.views || 0));
      case 'most-comments':
        return sortedMemes.sort((a, b) => 
          ((b.comments && b.comments.length) || 0) - 
          ((a.comments && a.comments.length) || 0)
        );
      default:
        return sortedMemes;
    }
  };
  
  const handleMenuToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };
  
  const handleDeleteMeme = (id) => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      deleteMeme(id);
    }
    setOpenMenu(null);
  };
  
  const handleShareMeme = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/meme/${id}`);
    // Show toast notification
    setOpenMenu(null);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Memes Performance</h3>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">{memes.length} total memes</p>
          
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-upvotes">Most Upvotes</option>
              <option value="most-views">Most Views</option>
              <option value="most-comments">Most Comments</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Meme
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Views
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Upvotes
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Comments
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {getSortedMemes().map((meme) => (
              <tr key={meme.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md object-cover" src={meme.imageUrl} alt={meme.title} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        <Link to={`/meme/${meme.id}`} className="hover:text-purple-600 dark:hover:text-purple-400">
                          {meme.title}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {meme.tags && meme.tags.map((tag, index) => (
                          <span key={index} className="mr-1">
                            #{tag}{index < meme.tags.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(meme.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Eye size={14} className="mr-1" />
                    {meme.views || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <ThumbsUp size={14} className="mr-1" />
                    {meme.upvotes || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MessageCircle size={14} className="mr-1" />
                    {meme.comments ? meme.comments.length : 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="relative">
                    <button
                      onClick={() => handleMenuToggle(meme.id)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {openMenu === meme.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                        <Link
                          to={`/meme/${meme.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Eye size={14} className="mr-2" />
                          View
                        </Link>
                        <Link
                          to={`/edit/${meme.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Edit size={14} className="mr-2" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleShareMeme(meme.id)}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                        >
                          <Share2 size={14} className="mr-2" />
                          Copy Link
                        </button>
                        <button
                          onClick={() => handleDeleteMeme(meme.id)}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {memes.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  You haven't created any memes yet.
                  <div className="mt-2">
                    <Link 
                      to="/create" 
                      className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      Create Your First Meme
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemePerformance;