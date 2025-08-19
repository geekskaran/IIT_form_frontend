// ===================================
// src/App.jsx - UPDATED
// Multi-User Application Form System with Fixed Routing
// ===================================
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// ===================================
// Import Services (NEW)
// ===================================
import authService from './services/authService';
import userService from './services/userService';

// ===================================
// Import Existing Components
// ===================================
import ApplicationForm from './components/application/ApplicationForm';
import ApplicationsList from './components/dashboard/ApplicationList';

// ===================================
// Import New Pages (FIXED IMPORTS)
// ===================================
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/Login';

// ===================================
// Import New Components (FIXED IMPORTS)
// ===================================
import ProtectedRoute from './components/auth/ProtectedRoute';
import FormBuilder from './components/dashboard/FormBuilder';

// ===================================
// Import Layout Components
// ===================================
import DashboardLayout from './components/layout/DashboardLayout';
import Header from './components/layout/Header';

// ===================================
// Global Error Boundary Component
// ===================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">
                The application encountered an unexpected error. Please refresh the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ===================================
// Enhanced Protected Route with Loading
// ===================================
const EnhancedProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const isAuth = authService.isAuthenticated();
      
      if (isAuth) {
        // Verify token with backend
        const isValid = await authService.verifyToken();
        
        if (isValid) {
          const userData = authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ===================================
// Legacy Protected Route (Backward Compatibility)
// ===================================
const LegacyProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (adminToken && adminUser) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <div className="bg-white shadow-sm border-b p-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
};

// ===================================
// Page Wrapper Components
// ===================================

// Landing Page Wrapper
const LandingPageWrapper = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <ErrorBoundary>
      <LandingPage 
        onLoginClick={handleLoginClick} 
        onSignUpClick={handleSignUpClick} 
      />
    </ErrorBoundary>
  );
};

// Login Page Wrapper
const LoginPageWrapper = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    // Update global state if needed
    navigate('/dashboard');
  };

  return (
    <ErrorBoundary>
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        navigate={navigate}
      />
    </ErrorBoundary>
  );
};

// Sign Up Page Wrapper
const SignUpPageWrapper = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <SignUpPage navigate={navigate} />
    </ErrorBoundary>
  );
};

// Dashboard Page Wrapper
const DashboardPageWrapper = () => {
  return (
    <ErrorBoundary>
      <DashboardPage />
    </ErrorBoundary>
  );
};

// Form Builder Page Wrapper
const FormBuilderPageWrapper = () => {
  return (
    <ErrorBoundary>
      <DashboardLayout>
        <FormBuilder />
      </DashboardLayout>
    </ErrorBoundary>
  );
};

// Applications List Page Wrapper
const ApplicationsPageWrapper = () => {
  return (
    <ErrorBoundary>
      <DashboardLayout>
        <ApplicationsList />
      </DashboardLayout>
    </ErrorBoundary>
  );
};

// Public Application Form Wrapper
const PublicFormWrapper = () => {
  return (
    <ErrorBoundary>
      <ApplicationForm />
    </ErrorBoundary>
  );
};

// ===================================
// Email Management Page (Placeholder)
// ===================================
const EmailManagementPageWrapper = () => {
  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-blue-500 text-2xl mr-3">📧</div>
                <div>
                  <h3 className="text-lg font-medium text-blue-900">Email System Coming Soon</h3>
                  <p className="text-blue-700 mt-1">
                    The email template management and bulk sending features will be available in the next update.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900">📝 Templates</h4>
                  <p className="text-sm text-gray-600 mt-1">Create and manage email templates</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900">📤 Bulk Send</h4>
                  <p className="text-sm text-gray-600 mt-1">Send emails to multiple candidates</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900">📊 Analytics</h4>
                  <p className="text-sm text-gray-600 mt-1">Track email delivery and opens</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
};

// ===================================
// Router Component with All Routes
// ===================================
const AppRoutes = () => {
  return (
    <Routes>
      {/* ===================================
          PUBLIC ROUTES
          ================================= */}
      
      {/* Landing Page */}
      <Route path="/" element={<LandingPageWrapper />} />
      
      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPageWrapper />} />
      <Route path="/signup" element={<SignUpPageWrapper />} />
      
      {/* Public Application Forms */}
      <Route path="/form/:userId" element={<PublicFormWrapper />} />
      
      {/* Legacy Application Form (backward compatibility) */}
      <Route path="/application" element={<PublicFormWrapper />} />

      {/* ===================================
          PROTECTED ROUTES - New Multi-User System
          ================================= */}
      
      {/* Main Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <EnhancedProtectedRoute>
            <DashboardPageWrapper />
          </EnhancedProtectedRoute>
        } 
      />
      
      {/* Form Builder */}
      <Route 
        path="/form-builder" 
        element={
          <EnhancedProtectedRoute>
            <FormBuilderPageWrapper />
          </EnhancedProtectedRoute>
        } 
      />
      
      {/* Applications Management */}
      <Route 
        path="/dashboard/applications" 
        element={
          <EnhancedProtectedRoute>
            <ApplicationsPageWrapper />
          </EnhancedProtectedRoute>
        } 
      />

      {/* Email Management */}
      {/* <Route 
        path="/emails" 
        element={
          <EnhancedProtectedRoute>
            <EmailManagementPageWrapper />
          </EnhancedProtectedRoute>
        } 
      /> */}

      {/* ===================================
          LEGACY ROUTES - Backward Compatibility
          ================================= */}
      
      {/* Legacy Applications Route */}
      <Route 
        path="/applications" 
        element={
          <LegacyProtectedRoute>
            <ApplicationsList />
          </LegacyProtectedRoute>
        } 
      />

      {/* ===================================
          ERROR ROUTES
          ================================= */}
      
      {/* 404 Page */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-300">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
              <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
              <a 
                href="/" 
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

// ===================================
// Main App Component
// ===================================
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Test API connection
      const apiService = (await import('./services/api')).default;
      const connected = await apiService.testConnection();
      setApiConnected(connected);
      
      if (!connected) {
        console.warn('⚠️ Backend API not available. Using fallback mode.');
      }
    } catch (error) {
      console.warn('⚠️ API initialization failed. Using fallback mode.', error);
      setApiConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Initializing Application</h2>
          <p className="mt-2 text-gray-600">Please wait while we set things up...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* API Status Banner (Development) */}
          {process.env.NODE_ENV === 'development' && !apiConnected && (
            <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
              <div className="flex items-center justify-center">
                <div className="text-yellow-800 text-sm">
                  ⚠️ Development Mode: Backend API not connected. Using fallback/mock data.
                </div>
              </div>
            </div>
          )}
          
          {/* Main Application Routes */}
          <AppRoutes />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;