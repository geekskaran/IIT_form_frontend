// ===================================
// Final Complete App.jsx
// Multi-User Application Form System
// ===================================
import React, { useState, useEffect } from 'react';

// ✅ Fixed (includes Navigate)
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// ===================================
// Import Existing Components
// ===================================
import ApplicationForm from './components/application/ApplicationForm';
import ApplicationsList from './components/dashboard/ApplicationList';
import Login from './pages/Login';

// ===================================
// Import New Components (create these based on your structure)
// ===================================
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import FormBuilder from './components/dashboard/FormBuilder';

// ===================================
// Import Layout Component
// ===================================
import DashboardLayout from './components/layout/DashboardLayout';
// Change the import path
import Header from './components/layout/Header';  // Instead of ./components/landing/Header

// ===================================
// Protected Route Component (Enhanced)
// ===================================
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    // Check for new multi-user auth tokens first
    const newToken = localStorage.getItem('authToken');
    const newUser = localStorage.getItem('user');
    
    // Fallback to existing admin tokens for backward compatibility
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (newToken && newUser) {
      // New multi-user system
      setIsAuthenticated(true);
      setUser(JSON.parse(newUser));
    } else if (adminToken && adminUser) {
      // Legacy admin system - migrate to new system
      setIsAuthenticated(true);
      setUser(JSON.parse(adminUser));
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
// Legacy Protected Route (for backward compatibility)
// ===================================
const LegacyProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      {/* Legacy Logout Button */}
      <div className="bg-white shadow-sm border-b p-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
};

// ===================================
// Form Page Wrapper (for dynamic forms)
// ===================================
const FormPage = () => {
  return <ApplicationForm />;
};

// ===================================
// Dashboard Page Wrapper
// ===================================
const DashboardPageWrapper = () => {
  // Check if DashboardPage component exists, fallback to ApplicationsList
  const DashboardComponent = DashboardPage || (() => (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/applications"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View Applications</h3>
            <p className="text-gray-600">Review and manage submitted applications</p>
          </a>
          <a
            href="/form-builder"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Form Builder</h3>
            <p className="text-gray-600">Customize your application form</p>
          </a>
          <a
            href="/emails"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Templates</h3>
            <p className="text-gray-600">Manage email templates</p>
          </a>
        </div>
      </div>
    </DashboardLayout>
  ));

  return <DashboardComponent />;
};

// ===================================
// Form Builder Page Wrapper
// ===================================
const FormBuilderPageWrapper = () => {
  return (
    <DashboardLayout>
      <FormBuilder />
    </DashboardLayout>
  );
};

// ===================================
// Applications List Page Wrapper
// ===================================
const ApplicationsPageWrapper = () => {
  return (
    <DashboardLayout>
      <ApplicationsList />
    </DashboardLayout>
  );
};

// ===================================
// Landing Page Wrapper with Header - FIXED
// ===================================
const LandingPageWrapper = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('Navigating to login...');
    navigate('/login');
  };

  const handleSignUpClick = () => {
    console.log('Navigating to signup...');
    navigate('/signup');
  };

  // ✅ FIXED: Properly pass props to your existing LandingPage component
  try {
    return (
      <LandingPage 
        onLoginClick={handleLoginClick} 
        onSignUpClick={handleSignUpClick} 
      />
    );
  } catch (error) {
    console.error('LandingPage component error:', error);
    
    // Fallback to a simple landing page with header
    return (
      <div>
        <Header onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-4xl mx-auto py-16 px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Application Form System
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Streamline your application process with our multi-user form management system
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <button
                  onClick={handleLoginClick}
                  className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Login to Dashboard
                </button>
                <button
                  onClick={handleSignUpClick}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </button>
              </div>
              
              <div className="mt-12">
                <a
                  href="/form/demo"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View Sample Application Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// ===================================
// Sign Up Page Wrapper - FIXED
// ===================================
const SignUpPageWrapper = () => {
  const navigate = useNavigate();

  // ✅ FIXED: Pass navigation handler to your existing SignUpPage
  try {
    return <SignUpPage navigate={navigate} />;
  } catch (error) {
    console.error('SignUpPage component error:', error);
    
    // Fallback signup form
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                sign in to your existing account
              </button>
            </p>
          </div>
          <div className="bg-white p-8 border border-gray-300 rounded-lg">
            <p className="text-center text-gray-600">
              SignUp component not yet implemented.
            </p>
            <div className="mt-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// ===================================
// Login Wrapper - FIXED
// ===================================
const LoginWrapper = () => {
  const navigate = useNavigate();

  // ✅ FIXED: Pass navigation handler to Login component
  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  try {
    return <Login onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
  } catch (error) {
    console.error('Login component error:', error);
    return <Login />;
  }
};

// ===================================
// Router Wrapper to Enable useNavigate in Components
// ===================================
const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* ===================================
            PUBLIC ROUTES
            ================================= */}
        
        {/* Landing Page - New multi-user home */}
        <Route path="/" element={<LandingPageWrapper />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignUpPageWrapper />} />
        
        {/* Public Application Form - Dynamic forms per user */}
        <Route path="/form/:userId" element={<FormPage />} />
        
        {/* Legacy route - original application form */}
        <Route path="/application" element={<ApplicationForm />} />

        {/* ===================================
            PROTECTED ROUTES - New Multi-User System
            ================================= */}
        
        {/* Main Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPageWrapper />
            </ProtectedRoute>
          } 
        />
        
        {/* Form Builder */}
        <Route 
          path="/form-builder" 
          element={
            <ProtectedRoute>
              <FormBuilderPageWrapper />
            </ProtectedRoute>
          } 
        />
        
        {/* Applications Management - Modern Layout */}
        <Route 
          path="/dashboard/applications" 
          element={
            <ProtectedRoute>
              <ApplicationsPageWrapper />
            </ProtectedRoute>
          } 
        />

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
            FUTURE ROUTES - Ready for Implementation
            ================================= */}
        
        {/* Email Management */}
        <Route 
          path="/emails" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
                  <p className="text-gray-600 mt-2">Email management system coming soon...</p>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Analytics */}
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                  <p className="text-gray-600 mt-2">Analytics dashboard coming soon...</p>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* ===================================
            REDIRECTS & FALLBACKS
            ================================= */}
        
        {/* Redirect old admin route to new dashboard */}
        <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
        
        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

// ===================================
// Main App Component
// ===================================
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;