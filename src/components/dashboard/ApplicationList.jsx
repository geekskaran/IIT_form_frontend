import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Clock, 
  Star,
  Download,
  Mail,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users
} from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    submitted: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: Clock,
      label: 'Submitted'
    },
    under_review: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: AlertCircle,
      label: 'Under Review'
    },
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: CheckCircle,
      label: 'Approved'
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: XCircle,
      label: 'Rejected'
    },
    shortlisted: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      icon: Star,
      label: 'Shortlisted'
    }
  };

  const config = statusConfig[status] || statusConfig.submitted;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

// Application Detail Modal Component
const ApplicationDetailModal = ({ application, isOpen, onClose, onStatusUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [statusRemark, setStatusRemark] = useState('');
  const [newStatus, setNewStatus] = useState(application?.status || 'submitted');

  if (!isOpen || !application) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'education', label: 'Education', icon: CheckCircle },
    { id: 'experience', label: 'Experience', icon: Clock },
    { id: 'documents', label: 'Documents', icon: Download },
    { id: 'status', label: 'Status Management', icon: AlertCircle }
  ];

  const handleStatusUpdate = () => {
    if (newStatus !== application.status) {
      onStatusUpdate(application._id, newStatus, statusRemark);
      setStatusRemark('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-700 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Application Details</h2>
            <p className="text-gray-300 text-sm">ID: {application.applicationId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-gray-700 text-gray-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {application.name}</div>
                    <div><strong>Email:</strong> {application.email}</div>
                    <div><strong>Phone:</strong> {application.phone || 'N/A'}</div>
                    <div><strong>Category:</strong> {application.category}</div>
                    <div><strong>Current Status:</strong> <StatusBadge status={application.status} /></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Submission Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Submitted:</strong> {formatDate(application.submissionTime)}</div>
                    <div><strong>Last Updated:</strong> {formatDate(application.updatedAt || application.submissionTime)}</div>
                    <div><strong>IP Address:</strong> {application.ipAddress || 'N/A'}</div>
                    <div><strong>Application ID:</strong> {application.applicationId}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Educational Background</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Qualification:</strong> {application.qualification || 'N/A'}</div>
                    <div><strong>Institution:</strong> {application.institution || 'N/A'}</div>
                    <div><strong>Year:</strong> {application.graduationYear || 'N/A'}</div>
                    <div><strong>Percentage/CGPA:</strong> {application.percentage || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm space-y-2">
                  <div><strong>Experience:</strong> {application.experience || 'N/A'}</div>
                  <div><strong>Skills:</strong> {application.skills || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
              <div className="space-y-4">
                {application.publicationDocument ? (
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Publication Document</p>
                        <p className="text-sm text-gray-600">Uploaded publication file</p>
                      </div>
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No documents uploaded</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Management</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="shortlisted">Shortlisted</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remark (Optional)
                  </label>
                  <textarea
                    value={statusRemark}
                    onChange={(e) => setStatusRemark(e.target.value)}
                    placeholder="Add a remark for this status change..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    rows="3"
                  />
                </div>

                <button
                  onClick={handleStatusUpdate}
                  disabled={newStatus === application.status}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Update Status
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main ApplicationsList Component
const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
    shortlisted: 0
  });

  // Mock data for development - replace with actual API calls
  const mockApplications = [
    {
      _id: '1',
      applicationId: 'APP_001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      category: 'Student',
      status: 'submitted',
      qualification: 'Bachelor of Science',
      institution: 'University of Example',
      graduationYear: '2022',
      percentage: '8.5 CGPA',
      experience: '2 years in software development',
      skills: 'React, Node.js, MongoDB',
      publicationDocument: true,
      submissionTime: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      ipAddress: '192.168.1.1'
    },
    {
      _id: '2',
      applicationId: 'APP_002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      category: 'Professional',
      status: 'under_review',
      qualification: 'Master of Science',
      institution: 'Tech University',
      graduationYear: '2021',
      percentage: '9.0 CGPA',
      experience: '5 years in data science',
      skills: 'Python, Machine Learning, SQL',
      publicationDocument: true,
      submissionTime: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
      ipAddress: '192.168.1.2'
    },
    {
      _id: '3',
      applicationId: 'APP_003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1234567892',
      category: 'Faculty',
      status: 'approved',
      qualification: 'PhD in Computer Science',
      institution: 'Research Institute',
      graduationYear: '2019',
      percentage: '9.5 CGPA',
      experience: '8 years in research and teaching',
      skills: 'AI, Deep Learning, Publications',
      publicationDocument: true,
      submissionTime: '2024-01-13T09:20:00Z',
      updatedAt: '2024-01-16T14:30:00Z',
      ipAddress: '192.168.1.3'
    },
    {
      _id: '4',
      applicationId: 'APP_004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1234567893',
      category: 'Student',
      status: 'rejected',
      qualification: 'Bachelor of Arts',
      institution: 'Liberal Arts College',
      graduationYear: '2023',
      percentage: '7.8 CGPA',
      experience: '1 year internship',
      skills: 'Writing, Research, Communication',
      publicationDocument: false,
      submissionTime: '2024-01-12T11:15:00Z',
      updatedAt: '2024-01-17T10:00:00Z',
      ipAddress: '192.168.1.4'
    },
    {
      _id: '5',
      applicationId: 'APP_005',
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1234567894',
      category: 'Professional',
      status: 'shortlisted',
      qualification: 'MBA',
      institution: 'Business School',
      graduationYear: '2020',
      percentage: '8.8 CGPA',
      experience: '6 years in management',
      skills: 'Leadership, Strategy, Finance',
      publicationDocument: true,
      submissionTime: '2024-01-11T16:30:00Z',
      updatedAt: '2024-01-18T09:45:00Z',
      ipAddress: '192.168.1.5'
    }
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const token = localStorage.getItem('authToken');
      // const response = await fetch('/api/applications/user/list', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApplications(mockApplications);
      calculateStats(mockApplications);
      setError('');
    } catch (err) {
      setError('Failed to fetch applications. Please try again.');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (apps) => {
    const stats = {
      total: apps.length,
      submitted: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      shortlisted: 0
    };

    apps.forEach(app => {
      stats[app.status] = (stats[app.status] || 0) + 1;
    });

    setStats(stats);
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (applicationId, newStatus, remark) => {
    try {
      // TODO: Replace with actual API call
      // const token = localStorage.getItem('authToken');
      // const response = await fetch(`/api/applications/${applicationId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ status: newStatus, remark })
      // });

      // Simulate API call
      const updatedApplications = applications.map(app =>
        app._id === applicationId
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app
      );

      setApplications(updatedApplications);
      calculateStats(updatedApplications);
      
      if (selectedApplication && selectedApplication._id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }

      // Show success message (you can add a toast component here)
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status. Please try again.');
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedApplications.length === 0) return;

    try {
      // TODO: Implement bulk status update API call
      const updatedApplications = applications.map(app =>
        selectedApplications.includes(app._id)
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app
      );

      setApplications(updatedApplications);
      calculateStats(updatedApplications);
      setSelectedApplications([]);
      
      console.log('Bulk status update successful');
    } catch (error) {
      console.error('Error updating bulk status:', error);
      setError('Failed to update status for selected applications.');
    }
  };

  const toggleApplicationSelection = (applicationId) => {
    setSelectedApplications(prev =>
      prev.includes(applicationId)
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedApplications.length === paginatedApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(paginatedApplications.map(app => app._id));
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Applications Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage and review all applications</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Submitted</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.submitted}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Under Review</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.under_review}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.approved}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Shortlisted</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.shortlisted}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Filters & Search</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Applications
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Search by name, email, or application ID..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="shortlisted">Shortlisted</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={fetchApplications}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-blue-800">
                {selectedApplications.length} application(s) selected
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkStatusUpdate('approved')}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Approve Selected
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('rejected')}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Reject Selected
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('under_review')}
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => setSelectedApplications([])}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Applications ({filteredApplications.length} results)
              </h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">
                  <Mail className="w-4 h-4" />
                  <span>Bulk Email</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedApplications.length === paginatedApplications.length && paginatedApplications.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedApplications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>No applications found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                ) : (
                  paginatedApplications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(application._id)}
                          onChange={() => toggleApplicationSelection(application._id)}
                          className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {application.applicationId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {application.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {application.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.submissionTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleViewDetails(application)}
                            className="text-gray-600 hover:text-gray-900"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'approved', '')}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected', '')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600" title="More Options">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>
                    {' '}to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredApplications.length)}
                    </span>
                    {' '}of{' '}
                    <span className="font-medium">{filteredApplications.length}</span>
                    {' '}results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-gray-700 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        application={selectedApplication}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedApplication(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default ApplicationsList;