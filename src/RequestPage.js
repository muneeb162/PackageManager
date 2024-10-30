import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";


const RequestPage = () => {
  const [requestType, setRequestType] = useState('');
  const [selectedSubType, setSelectedSubType] = useState('');
  const [selectedInstallerType, setSelectedInstallerType] = useState('');
  const [formData, setFormData] = useState({});

  // Define field configurations for different patch types
  const patchFields = {
    'Product Patch': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'previousVersion', label: 'Previous Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true }
    ],
	'Product Custom Patch': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'previousCustomVersion', label: 'Previous Custom Version', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
    'Product with Product Custom and Product Scheme Patch': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'previousVersion', label: 'Previous Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'previousCustomVersion', label: 'Previous Custom Version', required: true },
      { name: 'bank', label: 'Bank', required: true },
      { name: 'schemeRepo', label: 'Scheme Repo', required: true },
      { name: 'schemeTag', label: 'Scheme Tag', required: true },
      { name: 'schemeVersion', label: 'Scheme Version', required: true },
      { name: 'schemeBranch', label: 'Scheme Branch', required: true },
      { name: 'schemePreviousVersion', label: 'Scheme Previous Version', required: true }
    ],
    'Product with Platform tag Patch': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'previousVersion', label: 'Previous Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'bank', label: 'Bank', required: true },
      { name: 'platformRepo', label: 'Platform Repo', required: true },
      { name: 'platformBranch', label: 'Platform Branch', required: true },
      { name: 'platformTag', label: 'Platform Tag', required: true },
      { name: 'platformPreviousTag', label: 'Platform Previous Tag', required: true }
    ],
    'Product with Project tag Patch': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'previousVersion', label: 'Previous Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'projectRepo', label: 'Project Repo', required: true },
      { name: 'projectName', label: 'Project Name', required: true },
      { name: 'projectBranchName', label: 'Project Branch Name', required: true },
      { name: 'projectCurrentVersion', label: 'Project Current Version', required: true },
      { name: 'projectPreviousVersion', label: 'Project Previous Version', required: true }
    ]
    // Additional patch types...
  };

  const installerFields = {
    'Product Installer': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true }
    ],
	'Product Custom Installer': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
    'Product with Product Custom and Product Scheme Installer': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'bank', label: 'Bank', required: true },
      { name: 'schemeRepo', label: 'Scheme Repo', required: true },
      { name: 'schemeTag', label: 'Scheme Tag', required: true },
      { name: 'schemeVersion', label: 'Scheme Version', required: true },
      { name: 'schemeBranch', label: 'Scheme Branch', required: true }
    ],
    'Product with Platform Tag Installer': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'bank', label: 'Bank', required: true },
      { name: 'platformRepo', label: 'Platform Repo', required: true },
      { name: 'platformBranch', label: 'Platform Branch', required: true },
      { name: 'platformTag', label: 'Platform Tag', required: true }
    ],
    'Product with Project Tag Installer': [
      { name: 'tag', label: 'Tag', required: true },
      { name: 'version', label: 'Version', required: true },
      { name: 'branch', label: 'Branch', required: true },
      { name: 'masterPRNumber', label: 'Master PR Number', required: true },
      { name: 'repo', label: 'Repo', required: true },
      { name: 'projectRepo', label: 'Project Repo', required: true },
      { name: 'projectName', label: 'Project Name', required: true },
      { name: 'projectBranchName', label: 'Project Branch Name', required: true },
      { name: 'projectCurrentVersion', label: 'Project Current Version', required: true }
    
    ]
    // Additional installer types...
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-8 text-gray-100">Patch Manager</h2>
          <nav className="space-y-2">
            <div className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
              <span>Dashboard</span>
            </div>
            {/* Additional navigation items */}
          </nav>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Request Form</h1>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">New Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Request Type*
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={requestType}
                  onChange={(e) => {
                    setRequestType(e.target.value);
                    setSelectedSubType('');
                    setSelectedInstallerType('');
                    setFormData({});
                  }}
                  required
                >
                  <option value="">Select Request Type</option>
                  <option value="installer">Installer</option>
                  <option value="patch">Patch</option>
                  <option value="upgrader">Upgrader</option>
                </select>
              </div>

              {requestType === 'patch' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Patch Type*
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedSubType}
                    onChange={(e) => {
                      setSelectedSubType(e.target.value);
                      setFormData({});
                    }}
                    required
                  >
                    <option value="">Select Patch Type</option>
                    {Object.keys(patchFields).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {requestType === 'patch' && selectedSubType && patchFields[selectedSubType] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {patchFields[selectedSubType].map(field => (
                    <div key={field.name} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-200">
                        {field.label}{field.required && '*'}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {requestType === 'installer' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Installer Type*
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedInstallerType}
                    onChange={(e) => {
                      setSelectedInstallerType(e.target.value);
                      setFormData({});
                    }}
                    required
                  >
                    <option value="">Select Installer Type</option>
                    {Object.keys(installerFields).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {requestType === 'installer' && selectedInstallerType && installerFields[selectedInstallerType] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {installerFields[selectedInstallerType].map(field => (
                    <div key={field.name} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-200">
                        {field.label}{field.required && '*'}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {requestType && (
                (requestType === 'patch' && selectedSubType) ||
                (requestType === 'installer' && selectedInstallerType)
              ) && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );

};

export default RequestPage;
