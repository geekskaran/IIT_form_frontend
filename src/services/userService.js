// ===================================
// src/services/userService.js
// User Management API Service Layer
// ===================================
import apiService from './api';

class UserService {

  // ===================================
  // USER PROFILE MANAGEMENT
  // ===================================
  
  // Get current user profile
  async getUserProfile() {
    try {
      const response = await apiService.get('/users/profile');
      return response;
    } catch (error) {
      console.error('Get user profile failed:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(profileData) {
    try {
      const response = await apiService.put('/users/profile', {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        organization: profileData.organization,
        bio: profileData.bio,
        website: profileData.website,
        phone: profileData.phone
      });

      // Update local user data if successful
      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return response;
    } catch (error) {
      console.error('Update user profile failed:', error);
      throw error;
    }
  }

  // ===================================
  // FORM CONFIGURATION MANAGEMENT
  // ===================================

  // Get user's form configuration
  async getFormConfig() {
    try {
      const response = await apiService.get('/users/form-config');
      return response;
    } catch (error) {
      console.error('Get form config failed:', error);
      throw error;
    }
  }

  // Update form configuration
  async updateFormConfig(formConfig) {
    try {
      const response = await apiService.put('/users/form-config', {
        title: formConfig.title,
        description: formConfig.description,
        customHeadings: formConfig.customHeadings,
        isActive: formConfig.isActive,
        acceptingApplications: formConfig.acceptingApplications
      });

      return response;
    } catch (error) {
      console.error('Update form config failed:', error);
      throw error;
    }
  }

  // ===================================
  // FILE UPLOAD MANAGEMENT
  // ===================================

  // Upload advertisement/banner file
  async uploadAdvertisement(file) {
    try {
      const response = await apiService.uploadFile('/users/upload-advertisement', file);
      return response;
    } catch (error) {
      console.error('Advertisement upload failed:', error);
      throw error;
    }
  }

  // Delete advertisement/banner file
  async deleteAdvertisement() {
    try {
      const response = await apiService.delete('/users/advertisement');
      return response;
    } catch (error) {
      console.error('Advertisement deletion failed:', error);
      throw error;
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file) {
    try {
      const response = await apiService.uploadFile('/users/upload-profile-picture', file);
      
      // Update local user data if successful
      if (response.success) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, profilePicture: response.profilePicture };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return response;
    } catch (error) {
      console.error('Profile picture upload failed:', error);
      throw error;
    }
  }

  // ===================================
  // USER STATISTICS
  // ===================================

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const response = await apiService.get('/users/dashboard-stats');
      return response;
    } catch (error) {
      console.error('Get dashboard stats failed:', error);
      
      // Return mock data if API fails (for development)
      return {
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        rejectedApplications: 0,
        formViews: 0,
        emailsSent: 0
      };
    }
  }

  // Get user's applications overview
  async getApplicationsOverview() {
    try {
      const response = await apiService.get('/users/applications-overview');
      return response;
    } catch (error) {
      console.error('Get applications overview failed:', error);
      throw error;
    }
  }

  // ===================================
  // FORM SHARING & ANALYTICS
  // ===================================

  // Get form analytics
  async getFormAnalytics(dateRange = '30d') {
    try {
      const response = await apiService.get(`/users/form-analytics?range=${dateRange}`);
      return response;
    } catch (error) {
      console.error('Get form analytics failed:', error);
      throw error;
    }
  }

  // Generate shareable form link
  generateFormLink(userId = null) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userIdToUse = userId || currentUser.userId;
    
    if (!userIdToUse) {
      throw new Error('User ID not available');
    }

    return `${window.location.origin}/form/${userIdToUse}`;
  }

  // Copy form link to clipboard
  async copyFormLink(userId = null) {
    try {
      const formLink = this.generateFormLink(userId);
      await navigator.clipboard.writeText(formLink);
      return { success: true, link: formLink };
    } catch (error) {
      console.error('Copy form link failed:', error);
      throw new Error('Failed to copy link to clipboard');
    }
  }

  // ===================================
  // ACCOUNT MANAGEMENT
  // ===================================

  // Delete user account
  async deleteAccount(password) {
    try {
      const response = await apiService.delete('/users/account', {
        body: JSON.stringify({ password })
      });

      // Clear local data if successful
      if (response.success) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }

      return response;
    } catch (error) {
      console.error('Delete account failed:', error);
      throw error;
    }
  }

  // Export user data
  async exportUserData() {
    try {
      const response = await apiService.downloadFile('/users/export-data', 'user-data.json');
      return response;
    } catch (error) {
      console.error('Export user data failed:', error);
      throw error;
    }
  }

  // ===================================
  // NOTIFICATIONS & PREFERENCES
  // ===================================

  // Get notification preferences
  async getNotificationPreferences() {
    try {
      const response = await apiService.get('/users/notification-preferences');
      return response;
    } catch (error) {
      console.error('Get notification preferences failed:', error);
      throw error;
    }
  }

  // Update notification preferences
  async updateNotificationPreferences(preferences) {
    try {
      const response = await apiService.put('/users/notification-preferences', preferences);
      return response;
    } catch (error) {
      console.error('Update notification preferences failed:', error);
      throw error;
    }
  }

  // ===================================
  // HELPER METHODS
  // ===================================

  // Get current user from localStorage
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

  // Check if current user is legacy admin
  isLegacyAdmin() {
    const user = this.getCurrentUser();
    return user?.isLegacy === true;
  }

  // Get user's form URL
  getUserFormUrl() {
    const user = this.getCurrentUser();
    if (!user?.userId) {
      return null;
    }
    return this.generateFormLink(user.userId);
  }

  // Format user display name
  getUserDisplayName() {
    const user = this.getCurrentUser();
    if (!user) return 'Unknown User';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    return user.username || user.email || 'User';
  }

  // Validate form configuration
  validateFormConfig(config) {
    const errors = {};

    if (!config.title || config.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    }

    if (config.title && config.title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }

    if (config.description && config.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }

    if (config.customHeadings && config.customHeadings.length > 10) {
      errors.customHeadings = 'Maximum 10 custom headings allowed';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Handle file validation
  validateFile(file, type = 'image') {
    const errors = [];

    if (!file) {
      errors.push('Please select a file');
      return { isValid: false, errors };
    }

    // File size validation (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      errors.push('File size must be less than 5MB');
    }

    // File type validation
    if (type === 'image') {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        errors.push('Only JPEG, PNG, and GIF images are allowed');
      }
    } else if (type === 'document') {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        errors.push('Only PDF and Word documents are allowed');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create and export singleton instance
const userService = new UserService();
export default userService;