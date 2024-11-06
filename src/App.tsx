import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AuthForm from './components/AuthForm';
import Navigation from './components/Navigation';
import Feed from './pages/Feed';
import Beats from './pages/Beats';
import Studio from './pages/Studio';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {children}
      <Navigation />
    </div>
  );
};

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black">
    {children}
  </div>
);

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={
          <Layout>
            <AuthForm />
          </Layout>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        } />
        <Route path="/beats" element={
          <ProtectedRoute>
            <Beats />
          </ProtectedRoute>
        } />
        <Route path="/studio" element={
          <ProtectedRoute>
            <Studio />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;