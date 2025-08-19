// ===================================
// src/services/api.js - FIXED VERSION
// Base API Configuration and HTTP Client (Browser Compatible)
// ===================================

class ApiService {
  constructor() {
    // Base URL - browser compatible way to check environment
    this.baseURL = (typeof window !== 'undefined' && window.location.hostname === 'localhost') 
      ? 'http://localhost:4000/api'  // Development
      : '/api';  // Production (same domain)
    
    // Default headers
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get authentication token from localStorage
  getAuthToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken') || localStorage.getItem('adminToken');
  }

  // Get headers with authentication
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Handle API response
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    // Check if response is JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          this.handleUnauthorized();
          throw new Error(data.message || 'Unauthorized access');
        }
        
        if (response.status === 403) {
          throw new Error(data.message || 'Access forbidden');
        }
        
        if (response.status === 404) {
          throw new Error(data.message || 'Resource not found');
        }
        
        if (response.status >= 500) {
          throw new Error(data.message || 'Server error. Please try again later.');
        }
        
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    }
    
    // Handle non-JSON responses
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  }

  // Handle unauthorized access
  handleUnauthorized() {
    if (typeof window === 'undefined') return;
    
    // Clear stored auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Redirect to login if not already there
    if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
      window.location.href = '/login';
    }
  }

  // Generic GET request
  async get(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'GET',
        headers: this.getAuthHeaders(),
        ...options
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic POST request
  async post(endpoint, data = null, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'POST',
        headers: this.getAuthHeaders(),
        ...(data && { body: JSON.stringify(data) }),
        ...options
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic PUT request
  async put(endpoint, data = null, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        ...(data && { body: JSON.stringify(data) }),
        ...options
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic PATCH request
  async patch(endpoint, data = null, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        ...(data && { body: JSON.stringify(data) }),
        ...options
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`PATCH ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic DELETE request
  async delete(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        ...options
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }

  // File upload request
  async uploadFile(endpoint, file, additionalData = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const formData = new FormData();
      
      // Add file to form data
      formData.append('file', file);
      
      // Add additional data fields
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });

      const config = {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData, let browser set it
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: formData
      };

      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`File upload to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Download file request
  async downloadFile(endpoint, filename = 'download') {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      
      // Create download link (only if window is available)
      if (typeof window !== 'undefined') {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }
      
      return { success: true, message: 'File downloaded successfully' };
    } catch (error) {
      console.error(`File download from ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Health check endpoint
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: this.defaultHeaders
      });
      
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Test connection to backend
  async testConnection() {
    try {
      const isHealthy = await this.healthCheck();
      
      if (!isHealthy) {
        console.warn('Backend health check failed. Using fallback/mock mode.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('Cannot connect to backend. Using fallback/mock mode.');
      return false;
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;