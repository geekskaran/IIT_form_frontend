// ===================================
// src/pages/DashboardPage.jsx
// Enhanced Multi-User Dashboard with Statistics and Quick Actions
// ===================================
import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import applicationService from '../services/applicationService';
import { 
  Users, 
  FileText, 
  Mail, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ExternalLink,
  Plus,
  Eye,
  Share2
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    formViews: 0,
    emailsSent: 0
  });
  
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
  }, []);

const fetchDashboardData = async () => {
  try {
    setLoading(true);
    
    // Get applications from localStorage for now (since backend routes don't exist)
    const savedApplications = localStorage.getItem('applications') || '[]';
    const applications = JSON.parse(savedApplications);
    
    // Calculate stats from saved applications
    const stats = {
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'submitted').length,
      approvedApplications: applications.filter(app => app.status === 'approved').length,
      rejectedApplications: applications.filter(app => app.status === 'rejected').length,
      formViews: 0,
      emailsSent: 0
    };
    
    setStats(stats);
    setRecentApplications(applications.slice(0, 5)); // Show last 5 applications
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Use fallback data
    setStats({
      totalApplications: 0,
      pendingApplications: 0,
      approvedApplications: 0,
      rejectedApplications: 0,
      formViews: 0,
      emailsSent: 0
    });
    setRecentApplications([]);
  } finally {
    setLoading(false);
  }
};

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      under_review: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.submitted;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const quickActions = [
    {
      title: 'View Applications',
      description: 'Review and manage submitted applications',
      href: '/dashboard/applications',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Form Builder',
      description: 'Customize your application form',
      href: '/form-builder',
      icon: Settings,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Email Templates',
      description: 'Manage email templates and send bulk emails',
      href: '/emails',
      icon: Mail,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'View Public Form',
      description: 'See how your form appears to applicants',
      href: user?.userId ? `/form/${user.userId}` : '#',
      icon: ExternalLink,
      color: 'bg-gray-500 hover:bg-gray-600',
      external: true
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your application form today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Applications
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalApplications}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/applications" className="font-medium text-blue-600 hover:text-blue-500">
                  View all
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Review
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.pendingApplications}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/applications?status=submitted" className="font-medium text-yellow-600 hover:text-yellow-500">
                  Review now
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Approved
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.approvedApplications}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className="text-green-600 font-medium">
                  {stats.totalApplications > 0 ? 
                    Math.round((stats.approvedApplications / stats.totalApplications) * 100) : 0}% approval rate
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Emails Sent
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.emailsSent}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/emails" className="font-medium text-blue-600 hover:text-blue-500">
                  Manage templates
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.href}
                  target={action.external ? '_blank' : '_self'}
                  rel={action.external ? 'noopener noreferrer' : ''}
                  className={`${action.color} text-white p-6 rounded-lg shadow hover:shadow-md transition-all duration-200 transform hover:scale-105`}
                >
                  <div className="flex items-center mb-3">
                    <Icon className="h-6 w-6 mr-3" />
                    <h3 className="font-medium">{action.title}</h3>
                    {action.external && <ExternalLink className="h-4 w-4 ml-auto" />}
                  </div>
                  <p className="text-sm opacity-90">{action.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
              <a
                href="/dashboard/applications"
                className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              >
                View All
              </a>
            </div>
          </div>
          <div className="px-6 py-4">
            {recentApplications.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Share your form link to start receiving applications.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      const formUrl = `${window.location.origin}/form/${user?.userId}`;
                      navigator.clipboard.writeText(formUrl);
                      alert('Form link copied to clipboard!');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Form Link
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.slice(0, 5).map((application, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {application.personalInfo?.firstName} {application.personalInfo?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {application.personalInfo?.email}
                          </p>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </span>
                      <a
                        href={`/dashboard/applications/${application.applicationId}`}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Link Section */}
        {user?.userId && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900">Your Application Form</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Share this link with candidates to receive applications
                </p>
                <div className="mt-3">
                  <div className="flex items-center space-x-2">
                    <code className="bg-white px-3 py-2 rounded border text-sm font-mono text-gray-800">
                      {window.location.origin}/form/{user.userId}
                    </code>
                    <button
                      onClick={() => {
                        const formUrl = `${window.location.origin}/form/${user.userId}`;
                        navigator.clipboard.writeText(formUrl);
                        alert('Form link copied to clipboard!');
                      }}
                      className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Copy Link
                    </button>
                    <a
                      href={`/form/${user.userId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors inline-flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;