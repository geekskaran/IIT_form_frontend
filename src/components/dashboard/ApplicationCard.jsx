import React from 'react';
import StatusBadge from './StatusBadge';
import Button from '../common/Button';

const ApplicationCard = ({ 
  application, 
  onView, 
  onStatusChange, 
  onSelect,
  isSelected = false 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  const handleStatusChange = (newStatus) => {
    onStatusChange(application._id, newStatus);
  };

  return (
    <div className={`bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow ${
      isSelected ? 'ring-2 ring-gray-700 border-gray-300' : 'border-gray-200'
    }`}>
      {/* Header with Checkbox and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(application._id, e.target.checked)}
            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.name}
            </h3>
            <p className="text-sm text-gray-500">
              ID: {application.applicationId}
            </p>
          </div>
        </div>
        
        <StatusBadge status={application.status} />
      </div>

      {/* Application Details */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Email:</span>
            <span className="text-gray-900">{application.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Phone:</span>
            <span className="text-gray-900">{application.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Category:</span>
            <span className="text-gray-900">{application.category}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Age:</span>
            <span className="text-gray-900">{calculateAge(application.dob)} years</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Gender:</span>
            <span className="text-gray-900">{application.gender}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-20">Submitted:</span>
            <span className="text-gray-900">{formatDate(application.submissionTime)}</span>
          </div>
        </div>
      </div>

      {/* Education Summary */}
      {application.educationalQualifications && application.educationalQualifications.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Education</h4>
          <div className="text-sm text-gray-600">
            <div>{application.educationalQualifications[0].examPassed}</div>
            <div>{application.educationalQualifications[0].institute}</div>
            <div>Year: {application.educationalQualifications[0].yearOfPassing}</div>
          </div>
        </div>
      )}

      {/* Experience Summary */}
      {application.experience && application.experience.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Current/Latest Experience</h4>
          <div className="text-sm text-gray-600">
            <div className="font-medium">{application.experience[0].companyName}</div>
            {application.experience[0].isCurrentlyWorking ? (
              <div className="text-green-600">Currently Working</div>
            ) : (
              <div>Ended: {formatDate(application.experience[0].endDate)}</div>
            )}
          </div>
        </div>
      )}

      {/* Publications Indicator */}
      {(application.publicationDetails || application.publicationDocument?.filename) && (
        <div className="mb-4 flex items-center text-sm">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
            📄 Has Publications
          </span>
        </div>
      )}

      {/* Current Status with Remarks */}
      {application.currentRemarks && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-1">Remarks</h4>
          <p className="text-sm text-yellow-700">{application.currentRemarks}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onView(application)}
          className="bg-gray-700 hover:bg-gray-800"
        >
          👁️ View Details
        </Button>

        {/* Quick Status Actions */}
        {application.status === 'submitted' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('under_review')}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              📋 Review
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('approved')}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              ✅ Approve
            </Button>
          </>
        )}

        {application.status === 'under_review' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('approved')}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              ✅ Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('shortlisted')}
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              ⭐ Shortlist
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('rejected')}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              ❌ Reject
            </Button>
          </>
        )}

        {(application.status === 'approved' || application.status === 'shortlisted') && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusChange('under_review')}
            className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            📋 Back to Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;