// ===================================
// src/services/applicationService.js
// Application Management API Service Layer
// ===================================
import apiService from './api';

class ApplicationService {

  // ===================================
  // APPLICATION SUBMISSION (Public)
  // ===================================

  // Submit new application (public endpoint)
  async submitApplication(userId, applicationData) {
    try {
      const response = await apiService.post(`/applications/form/${userId}`, applicationData);
      return response;
    } catch (error) {
      console.error('Application submission failed:', error);
      throw error;
    }
  }

  // Submit application with file upload
  async submitApplicationWithFiles(userId, applicationData, files = {}) {
    try {
      const formData = new FormData();
      
      // Add application data
      formData.append('applicationData', JSON.stringify(applicationData));
      
      // Add files
      Object.keys(files).forEach(key => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      const response = await fetch(`${apiService.baseURL}/applications/form/${userId}`, {
        method: 'POST',
        body: formData
      });

      return await apiService.handleResponse(response);
    } catch (error) {
      console.error('Application submission with files failed:', error);
      throw error;
    }
  }

  // ===================================
  // APPLICATION MANAGEMENT (Protected)
  // ===================================

  // Get all applications for current user
  async getApplications(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query parameters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const endpoint = `/applications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      console.error('Get applications failed:', error);
      throw error;
    }
  }

  // Get single application by ID
  async getApplicationById(applicationId) {
    try {
      const response = await apiService.get(`/applications/${applicationId}`);
      return response;
    } catch (error) {
      console.error('Get application by ID failed:', error);
      throw error;
    }
  }

  // Get recent applications
  async getRecentApplications(limit = 5) {
    try {
      const response = await apiService.get(`/applications/recent?limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Get recent applications failed:', error);
      
      // Return empty array if API fails (for development)
      return { applications: [] };
    }
  }

  // ===================================
  // APPLICATION STATUS MANAGEMENT
  // ===================================

  // Update application status
  async updateApplicationStatus(applicationId, status, remarks = '') {
    try {
      const response = await apiService.put(`/applications/${applicationId}/status`, {
        status,
        remarks
      });
      
      return response;
    } catch (error) {
      console.error('Update application status failed:', error);
      throw error;
    }
  }

  // Bulk update application statuses
  async bulkUpdateApplicationStatus(applicationIds, status, remarks = '') {
    try {
      const response = await apiService.put('/applications/bulk-status', {
        applicationIds,
        status,
        remarks
      });
      
      return response;
    } catch (error) {
      console.error('Bulk status update failed:', error);
      throw error;
    }
  }

  // Add remarks to application
  async addApplicationRemarks(applicationId, remarks) {
    try {
      const response = await apiService.post(`/applications/${applicationId}/remarks`, {
        remarks
      });
      
      return response;
    } catch (error) {
      console.error('Add application remarks failed:', error);
      throw error;
    }
  }

  // ===================================
  // APPLICATION FILTERING & SEARCH
  // ===================================

  // Search applications
  async searchApplications(searchTerm, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        ...filters
      });

      const response = await apiService.get(`/applications/search?${queryParams.toString()}`);
      return response;
    } catch (error) {
      console.error('Search applications failed:', error);
      throw error;
    }
  }

  // Filter applications by status
  async getApplicationsByStatus(status) {
    return this.getApplications({ status });
  }

  // Filter applications by date range
  async getApplicationsByDateRange(startDate, endDate) {
    return this.getApplications({ 
      startDate: startDate.toISOString(), 
      endDate: endDate.toISOString() 
    });
  }

  // ===================================
  // APPLICATION STATISTICS
  // ===================================

  // Get application statistics
  async getApplicationStats() {
    try {
      const response = await apiService.get('/applications/stats');
      return response;
    } catch (error) {
      console.error('Get application stats failed:', error);
      
      // Return mock stats if API fails
      return {
        total: 0,
        submitted: 0,
        under_review: 0,
        approved: 0,
        rejected: 0
      };
    }
  }

  // Get applications by month
  async getApplicationsByMonth(year = new Date().getFullYear()) {
    try {
      const response = await apiService.get(`/applications/stats/monthly?year=${year}`);
      return response;
    } catch (error) {
      console.error('Get monthly applications failed:', error);
      throw error;
    }
  }

  // ===================================
  // FILE MANAGEMENT
  // ===================================

  // Download application document
  async downloadApplicationDocument(applicationId, documentType) {
    try {
      const filename = `${applicationId}-${documentType}.pdf`;
      const response = await apiService.downloadFile(
        `/applications/${applicationId}/documents/${documentType}`,
        filename
      );
      return response;
    } catch (error) {
      console.error('Download application document failed:', error);
      throw error;
    }
  }

  // Get document URL for preview
  getDocumentPreviewUrl(applicationId, documentType) {
    const token = localStorage.getItem('authToken') || localStorage.getItem('adminToken');
    return `${apiService.baseURL}/applications/${applicationId}/documents/${documentType}/preview?token=${token}`;
  }

  // ===================================
  // EXPORT FUNCTIONALITY
  // ===================================

  // Export applications to CSV
  async exportApplicationsCSV(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters);
      const filename = `applications-${new Date().toISOString().split('T')[0]}.csv`;
      
      const response = await apiService.downloadFile(
        `/applications/export/csv?${queryParams.toString()}`,
        filename
      );
      return response;
    } catch (error) {
      console.error('Export applications CSV failed:', error);
      throw error;
    }
  }

  // Export applications to Excel
  async exportApplicationsExcel(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters);
      const filename = `applications-${new Date().toISOString().split('T')[0]}.xlsx`;
      
      const response = await apiService.downloadFile(
        `/applications/export/excel?${queryParams.toString()}`,
        filename
      );
      return response;
    } catch (error) {
      console.error('Export applications Excel failed:', error);
      throw error;
    }
  }

  // ===================================
  // APPLICATION DELETION
  // ===================================

  // Delete single application
  async deleteApplication(applicationId) {
    try {
      const response = await apiService.delete(`/applications/${applicationId}`);
      return response;
    } catch (error) {
      console.error('Delete application failed:', error);
      throw error;
    }
  }

  // Bulk delete applications
  async bulkDeleteApplications(applicationIds) {
    try {
      const response = await apiService.delete('/applications/bulk', {
        body: JSON.stringify({ applicationIds })
      });
      return response;
    } catch (error) {
      console.error('Bulk delete applications failed:', error);
      throw error;
    }
  }

  // ===================================
  // FORM CONFIGURATION
  // ===================================

  // Get public form configuration
  async getPublicFormConfig(userId) {
    try {
      const response = await apiService.get(`/applications/form/${userId}/config`);
      return response;
    } catch (error) {
      console.error('Get public form config failed:', error);
      throw error;
    }
  }

  // ===================================
  // VALIDATION HELPERS
  // ===================================

  // Validate application data
  validateApplicationData(data) {
    const errors = {};

    // Personal Information validation
    if (!data.personalInfo) {
      errors.personalInfo = 'Personal information is required';
    } else {
      if (!data.personalInfo.firstName?.trim()) {
        errors.firstName = 'First name is required';
      }
      if (!data.personalInfo.lastName?.trim()) {
        errors.lastName = 'Last name is required';
      }
      if (!data.personalInfo.email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!data.personalInfo.phone?.trim()) {
        errors.phone = 'Phone number is required';
      }
    }

    // Education validation
    if (!data.education || !Array.isArray(data.education) || data.education.length === 0) {
      errors.education = 'At least one education entry is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validate file uploads
  validateFiles(files) {
    const errors = {};
    
    Object.keys(files).forEach(key => {
      const file = files[key];
      if (file) {
        // File size validation (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          errors[key] = 'File size must be less than 5MB';
        }
        
        // File type validation
        if (!file.type.includes('pdf')) {
          errors[key] = 'Only PDF files are allowed';
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // ===================================
  // UTILITY METHODS
  // ===================================

  // Format application status for display
  formatStatus(status) {
    const statusMap = {
      'submitted': 'Submitted',
      'under_review': 'Under Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'on_hold': 'On Hold',
      'shortlisted': 'Shortlisted'
    };
    
    return statusMap[status] || status;
  }

  // Get status color for UI
  getStatusColor(status) {
    const colorMap = {
      'submitted': 'blue',
      'under_review': 'yellow',
      'approved': 'green',
      'rejected': 'red',
      'on_hold': 'gray',
      'shortlisted': 'purple'
    };
    
    return colorMap[status] || 'gray';
  }

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Calculate application processing time
  calculateProcessingTime(submittedAt, updatedAt) {
    const submitted = new Date(submittedAt);
    const updated = new Date(updatedAt);
    const diffTime = Math.abs(updated - submitted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`;
    return `${Math.ceil(diffDays / 30)} months`;
  }
}

// Create and export singleton instance
const applicationService = new ApplicationService();
export default applicationService;