import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
  const statusConfig = {
    submitted: {
      label: 'Submitted',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '📝'
    },
    under_review: {
      label: 'Under Review',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '👀'
    },
    approved: {
      label: 'Approved',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '✅'
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '❌'
    },
    shortlisted: {
      label: 'Shortlisted',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: '⭐'
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const config = statusConfig[status] || statusConfig.submitted;

  return (
    <span className={`
      inline-flex items-center rounded-full border font-medium
      ${config.color} ${sizeClasses[size]}
    `}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </span>
  );
};

export default StatusBadge;