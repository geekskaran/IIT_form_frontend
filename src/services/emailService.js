// ===================================
// src/services/emailService.js
// Email Management API Service Layer
// ===================================
import apiService from './api';

class EmailService {

  // ===================================
  // EMAIL TEMPLATE MANAGEMENT
  // ===================================

  // Get all email templates for current user
  async getEmailTemplates() {
    try {
      const response = await apiService.get('/email/templates');
      return response;
    } catch (error) {
      console.error('Get email templates failed:', error);
      throw error;
    }
  }

  // Get single email template by ID
  async getEmailTemplate(templateId) {
    try {
      const response = await apiService.get(`/email/templates/${templateId}`);
      return response;
    } catch (error) {
      console.error('Get email template failed:', error);
      throw error;
    }
  }

  // Create new email template
  async createEmailTemplate(templateData) {
    try {
      const response = await apiService.post('/email/templates', {
        name: templateData.name,
        subject: templateData.subject,
        content: templateData.content,
        type: templateData.type || 'general',
        isDefault: templateData.isDefault || false
      });
      
      return response;
    } catch (error) {
      console.error('Create email template failed:', error);
      throw error;
    }
  }

  // Update existing email template
  async updateEmailTemplate(templateId, templateData) {
    try {
      const response = await apiService.put(`/email/templates/${templateId}`, {
        name: templateData.name,
        subject: templateData.subject,
        content: templateData.content,
        type: templateData.type,
        isDefault: templateData.isDefault
      });
      
      return response;
    } catch (error) {
      console.error('Update email template failed:', error);
      throw error;
    }
  }

  // Delete email template
  async deleteEmailTemplate(templateId) {
    try {
      const response = await apiService.delete(`/email/templates/${templateId}`);
      return response;
    } catch (error) {
      console.error('Delete email template failed:', error);
      throw error;
    }
  }

  // Duplicate email template
  async duplicateEmailTemplate(templateId, newName) {
    try {
      const response = await apiService.post(`/email/templates/${templateId}/duplicate`, {
        name: newName
      });
      
      return response;
    } catch (error) {
      console.error('Duplicate email template failed:', error);
      throw error;
    }
  }

  // ===================================
  // BULK EMAIL SENDING
  // ===================================

  // Send bulk emails to selected candidates
  async sendBulkEmails(emailData) {
    try {
      const response = await apiService.post('/email/send-bulk', {
        templateId: emailData.templateId,
        applicationIds: emailData.applicationIds,
        subject: emailData.subject,
        content: emailData.content,
        customContent: emailData.customContent,
        scheduleFor: emailData.scheduleFor
      });
      
      return response;
    } catch (error) {
      console.error('Send bulk emails failed:', error);
      throw error;
    }
  }

  // Send single email to candidate
  async sendSingleEmail(applicationId, emailData) {
    try {
      const response = await apiService.post(`/email/send/${applicationId}`, {
        templateId: emailData.templateId,
        subject: emailData.subject,
        content: emailData.content,
        attachments: emailData.attachments
      });
      
      return response;
    } catch (error) {
      console.error('Send single email failed:', error);
      throw error;
    }
  }

  // Preview email before sending
  async previewEmail(templateId, applicationId) {
    try {
      const response = await apiService.post('/email/preview', {
        templateId,
        applicationId
      });
      
      return response;
    } catch (error) {
      console.error('Preview email failed:', error);
      throw error;
    }
  }

  // ===================================
  // EMAIL HISTORY & TRACKING
  // ===================================

  // Get email sending history
  async getEmailHistory(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const endpoint = `/email/history${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      console.error('Get email history failed:', error);
      throw error;
    }
  }

  // Get email statistics
  async getEmailStats() {
    try {
      const response = await apiService.get('/email/stats');
      return response;
    } catch (error) {
      console.error('Get email stats failed:', error);
      
      // Return mock stats if API fails
      return {
        totalSent: 0,
        totalDelivered: 0,
        totalFailed: 0,
        deliveryRate: 0
      };
    }
  }

  // Track email opens (if tracking is enabled)
  async trackEmailOpen(emailId) {
    try {
      const response = await apiService.post(`/email/track/open/${emailId}`);
      return response;
    } catch (error) {
      console.error('Track email open failed:', error);
      // Don't throw error for tracking failures
      return { success: false };
    }
  }

  // ===================================
  // EMAIL SCHEDULING
  // ===================================

  // Schedule email for later sending
  async scheduleEmail(emailData, scheduleTime) {
    try {
      const response = await apiService.post('/email/schedule', {
        ...emailData,
        scheduleFor: scheduleTime.toISOString()
      });
      
      return response;
    } catch (error) {
      console.error('Schedule email failed:', error);
      throw error;
    }
  }

  // Get scheduled emails
  async getScheduledEmails() {
    try {
      const response = await apiService.get('/email/scheduled');
      return response;
    } catch (error) {
      console.error('Get scheduled emails failed:', error);
      throw error;
    }
  }

  // Cancel scheduled email
  async cancelScheduledEmail(emailId) {
    try {
      const response = await apiService.delete(`/email/scheduled/${emailId}`);
      return response;
    } catch (error) {
      console.error('Cancel scheduled email failed:', error);
      throw error;
    }
  }

  // ===================================
  // EMAIL TEMPLATES - PREDEFINED
  // ===================================

  // Get default email templates
  getDefaultTemplates() {
    return [
      {
        id: 'welcome',
        name: 'Welcome Email',
        subject: 'Thank you for your application',
        content: `Dear {{firstName}} {{lastName}},

Thank you for submitting your application. We have received it and will review it shortly.

Application Details:
- Application ID: {{applicationId}}
- Submitted: {{submittedDate}}
- Status: {{status}}

We will contact you soon with updates.

Best regards,
{{organizationName}}`,
        type: 'welcome'
      },
      {
        id: 'approved',
        name: 'Application Approved',
        subject: 'Congratulations! Your application has been approved',
        content: `Dear {{firstName}} {{lastName}},

Congratulations! We are pleased to inform you that your application has been approved.

Application Details:
- Application ID: {{applicationId}}
- Approved Date: {{approvedDate}}

Next Steps:
Please check your email for further instructions.

Best regards,
{{organizationName}}`,
        type: 'approval'
      },
      {
        id: 'rejected',
        name: 'Application Rejected',
        subject: 'Update on your application',
        content: `Dear {{firstName}} {{lastName}},

Thank you for your interest and for taking the time to submit your application.

After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.

Application Details:
- Application ID: {{applicationId}}
- Decision Date: {{decisionDate}}

We appreciate your interest and wish you the best in your future endeavors.

Best regards,
{{organizationName}}`,
        type: 'rejection'
      },
      {
        id: 'interview',
        name: 'Interview Invitation',
        subject: 'Interview Invitation - {{organizationName}}',
        content: `Dear {{firstName}} {{lastName}},

We are pleased to invite you for an interview regarding your application.

Interview Details:
- Date: [Please specify]
- Time: [Please specify]
- Location/Link: [Please specify]
- Duration: [Please specify]

Please confirm your availability by replying to this email.

Application Details:
- Application ID: {{applicationId}}

We look forward to meeting with you.

Best regards,
{{organizationName}}`,
        type: 'interview'
      }
    ];
  }

  // ===================================
  // EMAIL VALIDATION & HELPERS
  // ===================================

  // Validate email template
  validateEmailTemplate(template) {
    const errors = {};

    if (!template.name?.trim()) {
      errors.name = 'Template name is required';
    }

    if (!template.subject?.trim()) {
      errors.subject = 'Email subject is required';
    }

    if (!template.content?.trim()) {
      errors.content = 'Email content is required';
    }

    if (template.name && template.name.length > 100) {
      errors.name = 'Template name must be less than 100 characters';
    }

    if (template.subject && template.subject.length > 200) {
      errors.subject = 'Subject must be less than 200 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Replace template variables with actual data
  processEmailTemplate(template, applicationData, userData) {
    let processedContent = template.content;
    let processedSubject = template.subject;

    // Application data variables
    if (applicationData) {
      const variables = {
        '{{firstName}}': applicationData.personalInfo?.firstName || '',
        '{{lastName}}': applicationData.personalInfo?.lastName || '',
        '{{email}}': applicationData.personalInfo?.email || '',
        '{{phone}}': applicationData.personalInfo?.phone || '',
        '{{applicationId}}': applicationData.applicationId || '',
        '{{submittedDate}}': this.formatDate(applicationData.submittedAt),
        '{{status}}': applicationData.status || '',
        '{{approvedDate}}': applicationData.updatedAt ? this.formatDate(applicationData.updatedAt) : '',
        '{{decisionDate}}': applicationData.updatedAt ? this.formatDate(applicationData.updatedAt) : ''
      };

      Object.keys(variables).forEach(key => {
        processedContent = processedContent.replace(new RegExp(key, 'g'), variables[key]);
        processedSubject = processedSubject.replace(new RegExp(key, 'g'), variables[key]);
      });
    }

    // User/Organization data variables
    if (userData) {
      const orgVariables = {
        '{{organizationName}}': userData.organization || 'Our Organization',
        '{{senderName}}': `${userData.firstName} ${userData.lastName}` || 'Team',
        '{{senderEmail}}': userData.email || ''
      };

      Object.keys(orgVariables).forEach(key => {
        processedContent = processedContent.replace(new RegExp(key, 'g'), orgVariables[key]);
        processedSubject = processedSubject.replace(new RegExp(key, 'g'), orgVariables[key]);
      });
    }

    return {
      subject: processedSubject,
      content: processedContent
    };
  }

  // Format date for email templates
  formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Get email status badge configuration
  getEmailStatusConfig(status) {
    const statusConfig = {
      'sent': { color: 'blue', label: 'Sent' },
      'delivered': { color: 'green', label: 'Delivered' },
      'failed': { color: 'red', label: 'Failed' },
      'pending': { color: 'yellow', label: 'Pending' },
      'scheduled': { color: 'gray', label: 'Scheduled' }
    };

    return statusConfig[status] || statusConfig.pending;
  }

  // Check if email sending is available
  async checkEmailServiceStatus() {
    try {
      const response = await apiService.get('/email/status');
      return response.available || false;
    } catch (error) {
      console.error('Check email service status failed:', error);
      return false;
    }
  }
}

// Create and export singleton instance
const emailService = new EmailService();
export default emailService;