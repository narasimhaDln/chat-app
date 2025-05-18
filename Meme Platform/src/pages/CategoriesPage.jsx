import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMeme } from '../context/MemeContext';
import MemeCard from '../components/Meme/MemeCard';
import { ArrowLeft, Grid2X2, Tag } from 'lucide-react';

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const { categories, getMemesByCategory, loading } = useMeme();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [displayMemes, setDisplayMemes] = useState([]);
  
  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setCurrentCategory(category);
        setDisplayMemes(getMemesByCategory(categoryId));
      }
    }
  }, [categoryId, categories, getMemesByCategory]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  // If no category parameter, show all categories
  if (!categoryId) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3">
          <Grid2X2 size={24} className="text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meme Categories</h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className={`${category.color} bg-opacity-20 hover:bg-opacity-30 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-200 hover:shadow-md`}
            >
              <span className="text-4xl mb-3">{category.icon}</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {getMemesByCategory(category.id).length} memes
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  // Show specific category
  if (!currentCategory) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Category not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The category you're looking for doesn't exist.</p>
        <Link
          to="/categories"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          View All Categories
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link to="/categories" className="text-gray-500 hover:text-purple-600 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{currentCategory.icon}</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentCategory.name} Memes</h1>
        </div>
      </div>
      
      {displayMemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMemes.map(meme => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">No memes in this category yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Be the first to create a meme in the {currentCategory.name} category!
          </p>
          <Link
            to="/create"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Create a Meme
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage; 