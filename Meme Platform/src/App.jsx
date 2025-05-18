import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { MemeProvider } from './context/MemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import MemeDetailPage from './pages/MemeDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import BookmarksPage from './pages/BookmarksPage';
import CategoriesPage from './pages/CategoriesPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <MemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/meme/:id" element={<MemeDetailPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:categoryId" element={<CategoriesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              
              {/* Protected Routes */}
              <Route path="/create" element={
                <ProtectedRoute>
                  <CreatePage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/bookmarks" element={
                <ProtectedRoute>
                  <BookmarksPage />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </MemeProvider>
      </UserProvider>
    </Router>
  );
};

export default App;