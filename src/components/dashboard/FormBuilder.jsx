import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Eye, 
  Save, 
  Upload, 
  X, 
  Plus,
  Copy,
  ExternalLink,
  Image,
  FileText,
  Edit3,
  Trash2,
  AlertCircle,
  CheckCircle,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

// Banner Upload Component
const BannerUpload = ({ currentBanner, onBannerUpload, onBannerRemove }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert('Please upload an image or PDF file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    // Simulate upload - replace with actual API call
    setTimeout(() => {
      const mockBanner = {
        filename: `banner_${Date.now()}.${file.name.split('.').pop()}`,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        uploadDate: new Date().toISOString(),
        path: URL.createObjectURL(file) // This would be the actual file URL from server
      };
      onBannerUpload(mockBanner);
      setUploading(false);
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Advertisement Banner</h3>
      
      {currentBanner ? (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {currentBanner.mimeType.startsWith('image/') ? (
                  <Image className="h-6 w-6 text-blue-600" />
                ) : (
                  <FileText className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{currentBanner.originalName}</p>
                <p className="text-xs text-gray-500">
                  {(currentBanner.size / 1024 / 1024).toFixed(2)} MB • 
                  Uploaded {new Date(currentBanner.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={onBannerRemove}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          {currentBanner.mimeType.startsWith('image/') && (
            <div className="mt-4">
              <img
                src={currentBanner.path}
                alt="Banner preview"
                className="max-w-full h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop a banner file here, or click to select
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="hidden"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer"
              >
                Choose File
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Images or PDF files only, max 5MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Custom Heading Component
const CustomHeading = ({ heading, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(heading.text);
  const [position, setPosition] = useState(heading.position);

  const handleSave = () => {
    onUpdate(heading.id, { text, position });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(heading.text);
    setPosition(heading.position);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter heading text..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="top">Top of Form</option>
              <option value="middle">Middle of Form</option>
              <option value="bottom">Bottom of Form</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-medium text-gray-900">{heading.text}</p>
          <p className="text-sm text-gray-500 capitalize">Position: {heading.position}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(heading.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Form Preview Component
const FormPreview = ({ formConfig, deviceView = 'desktop' }) => {
  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  const topHeadings = formConfig.customHeadings.filter(h => h.position === 'top');
  const middleHeadings = formConfig.customHeadings.filter(h => h.position === 'middle');
  const bottomHeadings = formConfig.customHeadings.filter(h => h.position === 'bottom');

  return (
    <div className={`${getDeviceClass()} bg-white border border-gray-200 rounded-lg shadow-sm`}>
      {/* Form Header */}
      <div className="bg-gray-700 text-white p-6 rounded-t-lg">
        <h1 className="text-2xl font-bold">{formConfig.title}</h1>
        {formConfig.description && (
          <p className="text-gray-300 mt-2">{formConfig.description}</p>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Advertisement Banner */}
        {formConfig.advertisement && (
          <div className="text-center">
            {formConfig.advertisement.mimeType.startsWith('image/') ? (
              <img
                src={formConfig.advertisement.path}
                alt="Advertisement"
                className="max-w-full h-32 object-cover rounded border mx-auto"
              />
            ) : (
              <div className="border border-gray-200 rounded p-4">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{formConfig.advertisement.originalName}</p>
              </div>
            )}
          </div>
        )}

        {/* Top Headings */}
        {topHeadings.map((heading, index) => (
          <div key={index} className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{heading.text}</h2>
          </div>
        ))}

        {/* Sample Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              placeholder="Enter your full name"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              placeholder="Enter your email"
              disabled
            />
          </div>
        </div>

        {/* Middle Headings */}
        {middleHeadings.map((heading, index) => (
          <div key={index} className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{heading.text}</h2>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" disabled>
            <option>Select Category</option>
            <option>Student</option>
            <option>Faculty</option>
            <option>Professional</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            rows="3"
            placeholder="Describe your experience..."
            disabled
          />
        </div>

        {/* Bottom Headings */}
        {bottomHeadings.map((heading, index) => (
          <div key={index} className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{heading.text}</h2>
          </div>
        ))}

        <div className="text-center">
          <button className="px-6 py-3 bg-gray-400 text-white rounded-md cursor-not-allowed">
            Submit Application (Preview Mode)
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Form Builder Component
const FormBuilder = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formConfig, setFormConfig] = useState({
    title: 'Application Form',
    description: 'Please fill out this application form',
    customHeadings: [],
    advertisement: null,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deviceView, setDeviceView] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Get user data from localStorage (replace with context/auth)
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const formUrl = `${window.location.origin}/form/${user.userId || 'USER_123'}`;

  useEffect(() => {
    loadFormConfig();
  }, []);

  const loadFormConfig = async () => {
    try {
      // TODO: Replace with actual API call
      // const token = localStorage.getItem('authToken');
      // const response = await fetch('/api/users/form-config', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      
      // Simulate API call with mock data
      const mockConfig = {
        title: 'Research Position Application',
        description: 'Apply for research positions in our university',
        customHeadings: [
          {
            id: 1,
            text: 'Welcome to our Research Program',
            position: 'top'
          }
        ],
        advertisement: null,
        isActive: true
      };
      
      setFormConfig(mockConfig);
    } catch (error) {
      console.error('Error loading form config:', error);
    }
  };

  const handleConfigChange = (field, value) => {
    setFormConfig(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      // TODO: Replace with actual API call
      // const token = localStorage.getItem('authToken');
      // const response = await fetch('/api/users/form-config', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formConfig)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasUnsavedChanges(false);
      // Show success message (you can add a toast component here)
      console.log('Form configuration saved successfully');
    } catch (error) {
      console.error('Error saving form config:', error);
    } finally {
      setSaving(false);
    }
  };

  const addCustomHeading = () => {
    const newHeading = {
      id: Date.now(),
      text: 'New Heading',
      position: 'top'
    };
    setFormConfig(prev => ({
      ...prev,
      customHeadings: [...prev.customHeadings, newHeading]
    }));
    setHasUnsavedChanges(true);
  };

  const updateCustomHeading = (id, updates) => {
    setFormConfig(prev => ({
      ...prev,
      customHeadings: prev.customHeadings.map(heading =>
        heading.id === id ? { ...heading, ...updates } : heading
      )
    }));
    setHasUnsavedChanges(true);
  };

  const deleteCustomHeading = (id) => {
    setFormConfig(prev => ({
      ...prev,
      customHeadings: prev.customHeadings.filter(heading => heading.id !== id)
    }));
    setHasUnsavedChanges(true);
  };

  const handleBannerUpload = (banner) => {
    setFormConfig(prev => ({ ...prev, advertisement: banner }));
    setHasUnsavedChanges(true);
  };

  const handleBannerRemove = () => {
    setFormConfig(prev => ({ ...prev, advertisement: null }));
    setHasUnsavedChanges(true);
  };

  const copyFormUrl = () => {
    navigator.clipboard.writeText(formUrl);
    // Show success message (you can add a toast component here)
    console.log('Form URL copied to clipboard');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Settings', icon: Settings },
    { id: 'headings', label: 'Custom Headings', icon: Edit3 },
    { id: 'banner', label: 'Advertisement', icon: Image },
    { id: 'share', label: 'Share & Publish', icon: ExternalLink }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Form Builder</h1>
                <p className="mt-2 text-gray-600">Customize your application form</p>
              </div>
              <div className="flex items-center space-x-4">
                {hasUnsavedChanges && (
                  <div className="flex items-center text-yellow-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Unsaved changes</span>
                  </div>
                )}
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                  <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                </button>
                <button
                  onClick={handleSaveConfig}
                  disabled={saving || !hasUnsavedChanges}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white shadow rounded-lg">
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

              <div className="p-6">
                {/* Basic Settings Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form Title
                      </label>
                      <input
                        type="text"
                        value={formConfig.title}
                        onChange={(e) => handleConfigChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter form title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form Description
                      </label>
                      <textarea
                        value={formConfig.description}
                        onChange={(e) => handleConfigChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        rows="3"
                        placeholder="Enter form description..."
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Form Status
                        </label>
                        <p className="text-xs text-gray-500">
                          Controls whether the form accepts new applications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formConfig.isActive}
                          onChange={(e) => handleConfigChange('isActive', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-700"></div>
                      </label>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Form Status: {formConfig.isActive ? 'Active' : 'Inactive'}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {formConfig.isActive 
                              ? 'Your form is live and accepting applications.'
                              : 'Your form is inactive and not accepting applications.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Headings Tab */}
                {activeTab === 'headings' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Custom Headings</h3>
                        <p className="text-sm text-gray-600">
                          Add custom headings to your form for better organization
                        </p>
                      </div>
                      <button
                        onClick={addCustomHeading}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Heading</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formConfig.customHeadings.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <Edit3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No custom headings added yet</p>
                          <p className="text-sm text-gray-400">Click "Add Heading" to get started</p>
                        </div>
                      ) : (
                        formConfig.customHeadings.map((heading) => (
                          <CustomHeading
                            key={heading.id}
                            heading={heading}
                            onUpdate={updateCustomHeading}
                            onDelete={deleteCustomHeading}
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Banner Tab */}
                {activeTab === 'banner' && (
                  <BannerUpload
                    currentBanner={formConfig.advertisement}
                    onBannerUpload={handleBannerUpload}
                    onBannerRemove={handleBannerRemove}
                  />
                )}

                {/* Share Tab */}
                {activeTab === 'share' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Share Your Form</h3>
                      <p className="text-sm text-gray-600">
                        Share this URL with applicants to receive applications
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form URL
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={formUrl}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600"
                        />
                        <button
                          onClick={copyFormUrl}
                          className="px-4 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-800 flex items-center space-x-2"
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <ExternalLink className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900">
                            Form Link Information
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            This unique link allows applicants to submit applications directly to your form. 
                            You can share this link via email, social media, or embed it on your website.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Applications Received</h4>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-500">Total applications</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Form Status</h4>
                        <p className={`text-2xl font-bold ${formConfig.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {formConfig.isActive ? 'Active' : 'Inactive'}
                        </p>
                        <p className="text-sm text-gray-500">Current status</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Open Form</span>
                      </a>
                      <button
                        onClick={() => window.open(`mailto:?subject=Application Form&body=Please fill out this application form: ${formUrl}`)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        <span>📧</span>
                        <span>Share via Email</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Form Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setDeviceView('desktop')}
                      className={`p-2 rounded ${deviceView === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeviceView('tablet')}
                      className={`p-2 rounded ${deviceView === 'tablet' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Tablet className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeviceView('mobile')}
                      className={`p-2 rounded ${deviceView === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <FormPreview formConfig={formConfig} deviceView={deviceView} />
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    This is how your form will appear to applicants
                  </p>
                </div>
              </div>

              {/* Form Analytics */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Form Analytics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-sm text-blue-600">Views Today</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">0</p>
                    <p className="text-sm text-green-600">Submissions Today</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">0%</p>
                    <p className="text-sm text-purple-600">Conversion Rate</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">0</p>
                    <p className="text-sm text-yellow-600">Total Views</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Analytics data will be available once your form starts receiving traffic
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">View Applications</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">📧</span>
                      </div>
                      <span className="font-medium text-gray-900">Email Templates</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Settings className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">Form Settings</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Confirmation Modal */}
        {saving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Saving Changes</h3>
                  <p className="text-sm text-gray-600">Please wait while we save your form configuration...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;