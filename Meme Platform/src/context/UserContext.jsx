import React, { createContext, useState, useEffect, useContext } from 'react';
import { mockUsers } from '../data/mockData';

const UserContext = createContext();
const LOCAL_STORAGE_KEY = 'memehub_user_data';

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(mockUsers);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    // Load user data from localStorage
    loadUserData();
  }, []);

  // Load user data from localStorage
  const loadUserData = () => {
    try {
      // Check for stored user session
      const storedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_current`);
      const storedAllUsers = localStorage.getItem(`${LOCAL_STORAGE_KEY}_all`);
      
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
      setIsAuthenticated(true);
    }
      
      if (storedAllUsers) {
        setAllUsers(JSON.parse(storedAllUsers));
      } else {
        // Initialize with mock data if no stored users
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_all`, JSON.stringify(mockUsers));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
    setLoading(false);
    }
  };

  // Save all users to localStorage
  const saveAllUsers = (users) => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_all`, JSON.stringify(users));
      setAllUsers(users);
    } catch (error) {
      console.error('Error saving users data:', error);
    }
  };

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const login = (credentials) => {
    // Simulate authentication
    const { username, password } = credentials;
    const user = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_current`, JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (userData) => {
    // Check if username or email already exists
    const userExists = allUsers.some(u => u.username === userData.username || u.email === userData.email);
    
    if (userExists) {
      return { success: false, message: 'Username or email already exists' };
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      displayName: userData.displayName || userData.username,
      avatarUrl: userData.avatarUrl || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: userData.bio || `Hello! I'm ${userData.username} and I love creating memes.`,
      ...userData,
      createdAt: new Date().toISOString(),
      badges: [],
      stats: { totalMemes: 0, totalUpvotes: 0, totalViews: 0 }
    };
    
    const { password, ...userWithoutPassword } = newUser;
    
    // Update all users
    const updatedUsers = [...allUsers, newUser];
    saveAllUsers(updatedUsers);
    
    // Set current user and authentication
    setCurrentUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_current`, JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_current`);
  };

  const updateProfile = (userData) => {
    // Update current user
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_current`, JSON.stringify(updatedUser));
    
    // Update user in all users
    const updatedAllUsers = allUsers.map(user => 
      user.id === currentUser.id ? { ...user, ...userData } : user
    );
    saveAllUsers(updatedAllUsers);
    
    return { success: true, user: updatedUser };
  };

  const getUserById = (userId) => {
    return allUsers.find(user => user.id === userId);
  };

  const updateUserStats = (userId, statsUpdate) => {
    const updatedAllUsers = allUsers.map(user => {
      if (user.id === userId) {
        const updatedStats = { ...user.stats, ...statsUpdate };
        return { ...user, stats: updatedStats };
      }
      return user;
    });
    
    saveAllUsers(updatedAllUsers);
    
    // Update current user if the stats are for the current user
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser = { 
        ...currentUser, 
        stats: { ...currentUser.stats, ...statsUpdate } 
      };
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_current`, JSON.stringify(updatedCurrentUser));
    }
  };

  const toggleBookmark = (memeId) => {
    setBookmarks(prevBookmarks => {
      if (prevBookmarks.includes(memeId)) {
        return prevBookmarks.filter(id => id !== memeId);
      } else {
        return [...prevBookmarks, memeId];
      }
    });
  };

  const isBookmarked = (memeId) => {
    return bookmarks.includes(memeId);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        allUsers,
        darkMode,
        toggleDarkMode,
        login,
        register,
        logout,
        updateProfile,
        getUserById,
        updateUserStats,
        bookmarks,
        toggleBookmark,
        isBookmarked
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;