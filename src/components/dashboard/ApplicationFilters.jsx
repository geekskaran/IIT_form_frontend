import React, { useState } from 'react';
import Button from '../common/Button';

const ApplicationFilters = ({ 
  onFilterChange, 
  onSearchChange, 
  totalCount = 0,
  activeFilters = {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const statusOptions = [
    { value: 'all', label: 'All Status', count: totalCount },
    { value: 'submitted', label: 'Submitted', count: 0 },
    { value: 'under_review', label: 'Under Review', count: 0 },
    { value: 'approved', label: 'Approved', count: 0 },
    { value: 'rejected', label: 'Rejected', count: 0 },
    { value: 'shortlisted', label: 'Shortlisted', count: 0 }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'GENERAL', label: 'General' },
    { value: 'OBC', label: 'OBC' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
    { value: 'PwD', label: 'PwD' },
    { value: 'EWS', label: 'EWS' }
  ];

  const handleSearchSubmit = () => {
    onSearchChange(searchTerm);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onFilterChange({ ...activeFilters, status: status === 'all' ? '' : status });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ ...activeFilters, category: category === 'all' ? '' : category });
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onFilterChange({ ...activeFilters, ...newDateRange });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setDateRange({ from: '', to: '' });
    onFilterChange({});
    onSearchChange('');
  };

  const hasActiveFilters = selectedStatus !== 'all' || selectedCategory !== 'all' || 
                          dateRange.from || dateRange.to || searchTerm;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or application ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <Button onClick={handleSearchSubmit} variant="primary" className="bg-gray-700 hover:bg-gray-800">
            🔍 Search
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === option.value
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
              {option.count !== undefined && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedStatus === option.value
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => handleDateRangeChange('from', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => handleDateRangeChange('to', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearAllFilters}
            className="border-gray-300 text-gray-700"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationFilters;