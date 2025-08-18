import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import Button from '../common/Button';

const ApplicationDetail = ({ application, onClose, onStatusUpdate, onSendEmail }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [statusForm, setStatusForm] = useState({
    status: application.status,
    remarks: application.currentRemarks || ''
  });
  const [updating, setUpdating] = useState(false);

  if (!application) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await onStatusUpdate(application._id, statusForm.status, statusForm.remarks);
      // Close modal or show success message
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'status', label: 'Status & Actions', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{application.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{application.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{application.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-gray-900">{application.category}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900">
                      {formatDate(application.dob)} (Age: {calculateAge(application.dob)})
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900">{application.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Professional Exam</label>
                    <p className="text-gray-900">{application.professionalExam || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{application.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Application ID</label>
                  <p className="text-gray-900 font-mono">{application.applicationId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Submission Time</label>
                  <p className="text-gray-900">{formatDate(application.submissionTime)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Status</label>
                  <div className="mt-1">
                    <StatusBadge status={application.status} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Application Date</label>
                  <p className="text-gray-900">{formatDate(application.applicationDate)}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Educational Qualifications</h3>
            {application.educationalQualifications?.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Institution</label>
                    <p className="text-gray-900">{edu.institute}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Examination</label>
                    <p className="text-gray-900">{edu.examPassed}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Examination Name</label>
                    <p className="text-gray-900">{edu.nameOfExamination}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Year of Passing</label>
                    <p className="text-gray-900">{edu.yearOfPassing}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Marks/Percentage</label>
                    <p className="text-gray-900">{edu.marksPercentage}%</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Qualifying Degree */}
            <div className="border-t pt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Qualifying Degree</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Degree</label>
                    <p className="text-gray-900">{application.qualifyingDegree}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Specialization</label>
                    <p className="text-gray-900">{application.degreeMajorSpecialization}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
            {application.experience?.map((exp, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Company</label>
                    <p className="text-gray-900">{exp.companyName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Salary</label>
                    <p className="text-gray-900">{exp.salary}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="text-gray-900">{formatDate(exp.startDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="text-gray-900">
                      {exp.isCurrentlyWorking ? (
                        <span className="text-green-600 font-medium">Currently Working</span>
                      ) : (
                        formatDate(exp.endDate)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Documents & Publications</h3>
            
            {/* Publication Document */}
            {application.publicationDocument?.filename && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Publication Document</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">{application.publicationDocument.originalName}</p>
                    <p className="text-sm text-gray-500">
                      Size: {(application.publicationDocument.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded: {formatDate(application.publicationDocument.uploadDate)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700"
                  >
                    📄 Download
                  </Button>
                </div>
              </div>
            )}

            {/* Publication Details */}
            {application.publicationDetails && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Publication Details</h4>
                <p className="text-gray-900 whitespace-pre-wrap">{application.publicationDetails}</p>
              </div>
            )}
          </div>
        );

      case 'status':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Status Management</h3>
            
            {/* Current Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-md font-semibold text-gray-900">Current Status</h4>
                  <StatusBadge status={application.status} size="lg" />
                </div>
              </div>
              
              {application.currentRemarks && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-500">Current Remarks</label>
                  <p className="text-gray-900 bg-white p-3 rounded border mt-1">
                    {application.currentRemarks}
                  </p>
                </div>
              )}
            </div>

            {/* Update Status */}
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Update Status</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={statusForm.status}
                    onChange={(e) => setStatusForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    Remarks (Optional)
                  </label>
                  <textarea
                    value={statusForm.remarks}
                    onChange={(e) => setStatusForm(prev => ({ ...prev, remarks: e.target.value }))}
                    rows={3}
                    placeholder="Add remarks about this status change..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                
                <Button
                  onClick={handleStatusUpdate}
                  disabled={updating || statusForm.status === application.status}
                  variant="primary"
                  className="bg-gray-700 hover:bg-gray-800"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSendEmail && onSendEmail(application)}
                  className="border-blue-300 text-blue-700"
                >
                  📧 Send Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700"
                >
                  📄 Export PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-700"
                >
                  📋 Add Note
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{application.name}</h2>
            <p className="text-sm text-gray-500">Application ID: {application.applicationId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-700 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;