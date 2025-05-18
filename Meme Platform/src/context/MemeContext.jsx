import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockMemes } from '../data/mockData';
import { useUser } from './UserContext';

const MemeContext = createContext();
const MEME_STORAGE_KEY = 'memehub_memes_data';

export const useMeme = () => useContext(MemeContext);

export const MemeProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    { id: 'funny', name: 'Funny', icon: '😂', color: 'bg-yellow-400' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', color: 'bg-blue-400' },
    { id: 'animals', name: 'Animals', icon: '🐱', color: 'bg-green-400' },
    { id: 'movies', name: 'Movies & TV', icon: '🎬', color: 'bg-red-400' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'bg-orange-400' },
    { id: 'tech', name: 'Technology', icon: '💻', color: 'bg-indigo-400' },
    { id: 'politics', name: 'Politics', icon: '🗣️', color: 'bg-purple-400' },
    { id: 'trending', name: 'Trending', icon: '📈', color: 'bg-pink-400' }
  ]);
  const { currentUser, updateUserStats } = useUser();

  useEffect(() => {
    loadMemes();
  }, []);

  // Load memes from localStorage or initialize with mock data
  const loadMemes = () => {
    try {
      const savedMemes = localStorage.getItem(MEME_STORAGE_KEY);
      
      if (savedMemes) {
        setMemes(JSON.parse(savedMemes));
      } else {
        // Initialize with mock data if no stored memes
        setMemes(mockMemes);
        localStorage.setItem(MEME_STORAGE_KEY, JSON.stringify(mockMemes));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading memes:', error);
      setMemes(mockMemes);
      setLoading(false);
    }
  };

  // Save memes to localStorage
  const saveMemes = (updatedMemes) => {
    try {
      localStorage.setItem(MEME_STORAGE_KEY, JSON.stringify(updatedMemes));
      setMemes(updatedMemes);
    } catch (error) {
      console.error('Error saving memes:', error);
    }
  };

  const createMeme = (memeData) => {
    if (!currentUser) {
      return { success: false, message: 'You must be logged in to create memes' };
    }

    const newMeme = {
      id: `meme-${Date.now()}`,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      views: 0,
      creatorId: currentUser.id,
      creatorUsername: currentUser.username,
      creatorDisplayName: currentUser.displayName,
      creatorAvatarUrl: currentUser.avatarUrl,
      ...memeData
    };

    const updatedMemes = [newMeme, ...memes];
    saveMemes(updatedMemes);
    
    // Update the user's stats
    updateUserStats(currentUser.id, { totalMemes: currentUser.stats.totalMemes + 1 });

    return { success: true, meme: newMeme };
  };

  const getMemeById = (id) => {
    return memes.find((meme) => meme.id === id);
  };

  const getUserMemes = (userId) => {
    return memes.filter((meme) => meme.creatorId === userId);
  };

  const updateMeme = (id, updatedData) => {
    const updatedMemes = memes.map((meme) =>
      meme.id === id ? { ...meme, ...updatedData } : meme
    );
    
    saveMemes(updatedMemes);
    return { success: true, meme: updatedMemes.find(m => m.id === id) };
  };

  const deleteMeme = (id) => {
    if (!currentUser) {
      return { success: false, message: 'You must be logged in to delete memes' };
          }
    
    const memeToDelete = memes.find(meme => meme.id === id);
    
    if (!memeToDelete) {
      return { success: false, message: 'Meme not found' };
    }
    
    if (memeToDelete.creatorId !== currentUser.id) {
      return { success: false, message: 'You can only delete your own memes' };
    }
    
    const updatedMemes = memes.filter((meme) => meme.id !== id);
    saveMemes(updatedMemes);
    
    // Update the user's stats
    updateUserStats(currentUser.id, { totalMemes: currentUser.stats.totalMemes - 1 });
    
    return { success: true };
  };

  const upvoteMeme = (id) => {
    if (!currentUser) {
      return { success: false, message: 'You must be logged in to upvote' };
    }
    
    const updatedMemes = memes.map((meme) => {
      if (meme.id === id) {
        // Update creator stats if the meme belongs to another user
        if (meme.creatorId !== currentUser.id) {
          updateUserStats(meme.creatorId, { totalUpvotes: (meme.upvotes + 1) });
        }
        
        return { ...meme, upvotes: meme.upvotes + 1 };
          }
          return meme;
    });
    
    saveMemes(updatedMemes);
    return { success: true };
  };

  const viewMeme = (id) => {
    const meme = memes.find(m => m.id === id);
    if (!meme) return;
    
    const updatedMemes = memes.map((m) => {
      if (m.id === id) {
        // Update creator stats
        updateUserStats(m.creatorId, { totalViews: (m.views + 1) });
        
        return { ...m, views: m.views + 1 };
      }
      return m;
    });
    
    saveMemes(updatedMemes);
  };

  const getTrendingMemes = () => {
    return [...memes]
      .sort((a, b) => b.upvotes - a.upvotes)
      .slice(0, 10);
  };

  const getRecentMemes = () => {
    return [...memes]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20);
  };

  const getMemesByTag = (tag) => {
    return memes.filter(meme => 
      meme.tags && meme.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  };

  // Get memes by category
  const getMemesByCategory = (categoryId) => {
    return memes.filter(meme => 
      meme.categories && meme.categories.includes(categoryId)
    );
  };

  return (
    <MemeContext.Provider
      value={{
        memes,
        loading,
        categories,
        createMeme,
        getMemeById,
        getUserMemes,
        updateMeme,
        deleteMeme,
        getMemesByTag,
        getMemesByCategory,
        upvoteMeme,
        viewMeme,
        getTrendingMemes,
        getRecentMemes
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};

export default MemeContext;