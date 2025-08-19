// ===================================
// src/services/authService.js
// Authentication API Service Layer
// ===================================
import apiService from './api';

class AuthService {
  
  // ===================================
  // USER REGISTRATION
  // ===================================
  async register(userData) {
    try {
      const response = await apiService.post('/users/register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email.toLowerCase(),
        password: userData.password,
        organization: userData.organization
      });

      if (response.success) {
        // Store authentication data
        this.storeAuthData(response.token, response.user);
        return response;
      }

      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration failed:', error);
      throw this.handleAuthError(error);
    }
  }

  // ===================================
  // USER LOGIN
  // ===================================
  async login(credentials) {
    try {
      const response = await apiService.post('/users/login', {
        email: credentials.email.toLowerCase(),
        password: credentials.password
      });

      if (response.success) {
        // Store authentication data
        this.storeAuthData(response.token, response.user);
        return response;
      }

      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Login failed:', error);
      
      // Fallback to legacy admin login for development/backward compatibility
      if (await this.tryLegacyLogin(credentials)) {
        return {
          success: true,
          message: 'Legacy admin login successful',
          user: this.getLegacyAdminUser(),
          token: 'legacy-admin-token'
        };
      }
      
      throw this.handleAuthError(error);
    }
  }

  // ===================================
  // LOGOUT USER
  // ===================================
  async logout() {
    try {
      // Call backend logout endpoint if available
      const token = this.getAuthToken();
      if (token && token !== 'legacy-admin-token') {
        await apiService.post('/users/logout');
      }
    } catch (error) {
      console.warn('Backend logout failed:', error);
      // Continue with local logout even if backend call fails
    } finally {
      // Clear local authentication data
      this.clearAuthData();
    }
  }

  // ===================================
  // VERIFY TOKEN
  // ===================================
  async verifyToken() {
    try {
      const token = this.getAuthToken();
      if (!token) {
        return false;
      }

      // Skip verification for legacy tokens
      if (token === 'legacy-admin-token') {
        return true;
      }

      const response = await apiService.get('/users/profile');
      return response.success !== false;
    } catch (error) {
      console.error('Token verification failed:', error);
      this.clearAuthData();
      return false;
    }
  }

  // ===================================
  // REFRESH TOKEN
  // ===================================
  async refreshToken() {
    try {
      const response = await apiService.post('/users/refresh-token');
      
      if (response.success) {
        this.storeAuthData(response.token, response.user);
        return response;
      }
      
      throw new Error('Token refresh failed');
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthData();
      throw error;
    }
  }

  // ===================================
  // FORGOT PASSWORD
  // ===================================
  async forgotPassword(email) {
    try {
      const response = await apiService.post('/users/forgot-password', {
        email: email.toLowerCase()
      });

      return response;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw this.handleAuthError(error);
    }
  }

  // ===================================
  // RESET PASSWORD
  // ===================================
  async resetPassword(token, newPassword) {
    try {
      const response = await apiService.post('/users/reset-password', {
        token,
        password: newPassword
      });

      return response;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw this.handleAuthError(error);
    }
  }

  // ===================================
  // CHANGE PASSWORD
  // ===================================
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiService.post('/users/change-password', {
        currentPassword,
        newPassword
      });

      return response;
    } catch (error) {
      console.error('Password change failed:', error);
      throw this.handleAuthError(error);
    }
  }

  // ===================================
  // HELPER METHODS
  // ===================================

  // Store authentication data in localStorage
  storeAuthData(token, user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Clear any legacy tokens
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }

  // Clear all authentication data
  clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }

  // Get current authentication token
  getAuthToken() {
    return localStorage.getItem('authToken') || localStorage.getItem('adminToken');
  }

  // Get current user data
  getCurrentUser() {
    const userStr = localStorage.getItem('user') || localStorage.getItem('adminUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAuthToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Check if user is legacy admin
  isLegacyAdmin() {
    return localStorage.getItem('adminToken') === 'legacy-admin-token';
  }

  // Try legacy admin login for backward compatibility
  async tryLegacyLogin(credentials) {
    // Legacy admin credentials (for development/backward compatibility)
    const legacyCredentials = {
      email: 'admin@example.com',
      password: 'admin123'
    };

    if (credentials.email.toLowerCase() === legacyCredentials.email && 
        credentials.password === legacyCredentials.password) {
      
      const adminUser = this.getLegacyAdminUser();
      localStorage.setItem('adminToken', 'legacy-admin-token');
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      
      return true;
    }
    
    return false;
  }

  // Get legacy admin user object
  getLegacyAdminUser() {
    return {
      id: 'admin',
      userId: 'LEGACY_ADMIN_001',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      organization: 'System Administration',
      isLegacy: true,
      formLink: '/form/LEGACY_ADMIN_001'
    };
  }

  // Handle authentication errors
  handleAuthError(error) {
    // Create user-friendly error messages
    const errorMessage = error.message || 'An authentication error occurred';
    
    // Map specific error cases
    if (errorMessage.includes('Network')) {
      return new Error('Unable to connect to server. Please check your internet connection.');
    }
    
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      return new Error('Invalid email or password. Please try again.');
    }
    
    if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
      return new Error('Access denied. Please contact support.');
    }
    
    if (errorMessage.includes('429')) {
      return new Error('Too many login attempts. Please try again later.');
    }
    
    if (errorMessage.includes('500') || errorMessage.includes('Server')) {
      return new Error('Server error. Please try again later.');
    }
    
    return new Error(errorMessage);
  }

  // Get user permissions (for future role-based access)
  getUserPermissions() {
    const user = this.getCurrentUser();
    if (!user) return [];
    
    // Default permissions for all authenticated users
    const permissions = ['read_own_data', 'manage_own_applications'];
    
    // Add admin permissions for legacy admin
    if (user.isLegacy) {
      permissions.push('admin_access', 'manage_all_applications');
    }
    
    return permissions;
  }

  // Check if user has specific permission
  hasPermission(permission) {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;