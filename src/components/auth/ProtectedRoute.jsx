// ===================================
// src/components/auth/ProtectedRoute.jsx
// Authentication Guard Component for Protected Routes
// ===================================
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check for new multi-user auth tokens first
      const newToken = localStorage.getItem('authToken');
      const newUser = localStorage.getItem('user');
      
      // Fallback to existing admin tokens for backward compatibility
      const adminToken = localStorage.getItem('adminToken');
      const adminUser = localStorage.getItem('adminUser');
      
      if (newToken && newUser) {
        // New multi-user system - verify token with backend
        try {
          const response = await fetch('/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${newToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const userData = JSON.parse(newUser);
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // If backend is not available, still allow access with local token for development
          const userData = JSON.parse(newUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else if (adminToken && adminUser) {
        // Legacy admin system - for backward compatibility
        const userData = JSON.parse(adminUser);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;