import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { BarChart, Inbox, Calendar, Users, Settings, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import axios from 'axios';


const RequestPage = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const [selectedProject, setSelectedProject] = useState('');
    const [requestType, setRequestType] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [formData, setFormData] = useState({});

  // Previous configurations remain the same...
  const projectConfigs = {
    'IRIS': ['installer', 'patch', 'upgrader'],
    'Sparrow': ['installer', 'patch', 'upgrader']
  };

  const patchFields = {
    'Product Patch': [
      { name: 'productTag', label: 'Product Tag', required: true },
      { name: 'productVersion', label: 'Product Version', required: true },
      { name: 'productPreviousVersion', label: 'Product Previous Version', required: true },
      { name: 'productBranch', label: 'Product Branch', required: true },
      { name: 'productMasterPRNumber', label: 'Product Master PR Number', required: true },
      { name: 'productRepo', label: 'Product Repo', required: true }
    ],
    'Custom Patch': [
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'previousCustomVersion', label: 'Previous Custom Version', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
    'Scheme Patch': [
      { name: 'schemeTag', label: 'Scheme Tag', required: true },
      { name: 'schemeVersion', label: 'Scheme Version', required: true },
      { name: 'previousSchemeVersion', label: 'Previous Scheme Version', required: true },
      { name: 'schemeBranch', label: 'Scheme Branch', required: true },
      { name: 'schemeRepo', label: 'Scheme Repo', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
    'Platform Patch': [
      { name: 'platformTag', label: 'Platform Tag', required: true },
      { name: 'platformVersion', label: 'Platform Version', required: true },
      { name: 'previousplatformVersion', label: 'Previous Platform Version', required: true },
      { name: 'platformBranch', label: 'Platform Branch', required: true },
      { name: 'platformRepo', label: 'Platform Repo', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
    'Project Patch': [
      { name: 'projectTag', label: 'Project Tag', required: true },
      { name: 'projectVersion', label: 'Project Version', required: true },
      { name: 'previousprojectVersion', label: 'Previous Project Version', required: true },
      { name: 'projectBranch', label: 'Project Branch', required: true },
      { name: 'projectRepo', label: 'Project Repo', required: true },
      { name: 'projectCollection', label: 'Project Collection', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
  };

  const installerFields = {
    'Product Installer': [
      { name: 'productTag', label: 'Product Tag', required: true },
      { name: 'productVersion', label: 'Product Version', required: true },
      { name: 'productPreviousVersion', label: 'Product Previous Version', required: true },
      { name: 'productBranch', label: 'Product Branch', required: true },
      { name: 'productMasterPRNumber', label: 'Product Master PR Number', required: true },
      { name: 'productRepo', label: 'Product Repo', required: true }
      ],
    'Custom Installer': [
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true }
    ],
    'Platform Installer': [
      { name: 'platformTag', label: 'Platform Tag', required: true },
      { name: 'platformVersion', label: 'Platform Version', required: true },
      { name: 'platformBranch', label: 'Platform Branch', required: true },
      { name: 'platformRepo', label: 'Platform Repo', required: true }
    ],
    'Scheme Installer': [
        { name: 'schemeTag', label: 'Scheme Tag', required: true },
        { name: 'schemeVersion', label: 'Scheme Version', required: true },
        { name: 'previousSchemeVersion', label: 'Previous Scheme Version', required: true },
        { name: 'schemeBranch', label: 'Scheme Branch', required: true },
        { name: 'schemeRepo', label: 'Scheme Repo', required: true },
        { name: 'bank', label: 'Bank', required: true }
      ],
    'Project Installer': [
      { name: 'projectTag', label: 'Project Tag', required: true },
      { name: 'projectVersion', label: 'Project Version', required: true },
      { name: 'previousprojectVersion', label: 'Previous Project Version', required: true },
      { name: 'projectBranch', label: 'Project Branch', required: true },
      { name: 'projectRepo', label: 'Project Repo', required: true },
      { name: 'projectCollection', label: 'Project Collection', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],

  };

  const upgraderFields = {
    'Product Upgrader': [
      { name: 'productTag', label: 'Product Tag', required: true },
      { name: 'productVersion', label: 'Product Version', required: true },
      { name: 'productPreviousVersion', label: 'Product Previous Version', required: true },
      { name: 'productBranch', label: 'Product Branch', required: true },
      { name: 'productMasterPRNumber', label: 'Product Master PR Number', required: true },
      { name: 'productRepo', label: 'Product Repo', required: true }
      ],
    'Custom Upgrader': [
      { name: 'customTag', label: 'Custom Tag', required: true },
      { name: 'customVersion', label: 'Custom Version', required: true },
      { name: 'customBranch', label: 'Custom Branch', required: true },
      { name: 'customRepo', label: 'Custom Repo', required: true }
    ],
    'Platform Upgrader': [
      { name: 'platformTag', label: 'Platform Tag', required: true },
      { name: 'platformVersion', label: 'Platform Version', required: true },
      { name: 'platformBranch', label: 'Platform Branch', required: true },
      { name: 'platformRepo', label: 'Platform Repo', required: true }
    ],
    'Scheme Upgrader': [
        { name: 'schemeTag', label: 'Scheme Tag', required: true },
        { name: 'schemeVersion', label: 'Scheme Version', required: true },
        { name: 'previousSchemeVersion', label: 'Previous Scheme Version', required: true },
        { name: 'schemeBranch', label: 'Scheme Branch', required: true },
        { name: 'schemeRepo', label: 'Scheme Repo', required: true },
        { name: 'bank', label: 'Bank', required: true }
      ],
    'Project Upgrader': [
      { name: 'projectTag', label: 'Project Tag', required: true },
      { name: 'projectVersion', label: 'Project Version', required: true },
      { name: 'previousprojectVersion', label: 'Previous Project Version', required: true },
      { name: 'projectBranch', label: 'Project Branch', required: true },
      { name: 'projectRepo', label: 'Project Repo', required: true },
      { name: 'projectCollection', label: 'Project Collection', required: true },
      { name: 'bank', label: 'Bank', required: true }
    ],
  };

  

  // Previous functions remain the same...
  const getAvailableTypes = () => {
    if (!selectedProject || !requestType) return {};
    
    if (selectedProject === 'Sparrow') {
      if (requestType === 'patch') {
        return { 'Product Patch': patchFields['Product Patch'] };
      } else if (requestType === 'installer') {
        return { 'Product Installer': installerFields['Product Installer'] };
      } else if (requestType === 'upgrader') {
        return { 'Product Upgrader': upgraderFields['Product Upgrader'] };
      }
    }
    
    return requestType === 'patch'
    ? patchFields
    : requestType === 'installer'
    ? installerFields
    : upgraderFields;
  
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
    setFormData({});
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setRequestType('');
    setSelectedTypes([]);
    setFormData({});
  };

  const handleRequestTypeChange = (e) => {
    setRequestType(e.target.value);
    setSelectedTypes([]);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      project: selectedProject,
      requestType,
      selectedTypes,
      formData,
    };
  
    try {
      // Sending POST request to the backend API
      const response = await axios.post('https://your-backend-api.com/endpoint', requestData, {
        headers: {
          'Content-Type': 'application/json',  // Make sure the content type is JSON
        },
      });
  
      // Handle success (e.g., show a success message)
      console.log('Form submitted successfully:', response.data);
      
      // Optionally, reset the form or navigate to another page
      setSelectedProject('');
      setRequestType('');
      setSelectedTypes([]);
      setFormData({});
      navigate('/dashboard'); // Redirect to a success page, for example
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

   // Theme-based style classes
   const themeClasses = {
    mainBackground: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    sidebar: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    card: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    input: isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500' 
      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500',
    inputLabel: isDarkMode ? 'text-gray-200' : 'text-gray-700',
    navItem: isDarkMode 
      ? 'text-gray-300 hover:bg-gray-700' 
      : 'text-gray-600 hover:bg-gray-100',
    button: isDarkMode 
      ? 'bg-blue-500 text-white hover:bg-blue-600' 
      : 'bg-blue-600 text-white hover:bg-blue-700',
  };

  return (
    <div className={`flex h-screen ${themeClasses.mainBackground}`}>
      {/* Sidebar Navigation */}
      <div className={`w-64 border-r transition-colors duration-200 ${themeClasses.sidebar}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-xl font-bold ${themeClasses.text}`}>Patch Manager</h2>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${themeClasses.navItem}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <nav className="space-y-2">
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${themeClasses.navItem}`}
              onClick={() => navigate('/dashboard')}
            >
              <BarChart className="mr-2" size={20} />
              <span>Dashboard</span>
            </div>
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${themeClasses.navItem}`}
              onClick={() => navigate('/requests')}
            >
              <Inbox className="mr-2" size={20} />
              <span>Requests</span>
            </div>
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${themeClasses.navItem}`}
              onClick={() => navigate('/schedule')}
            >
              <Calendar className="mr-2" size={20} />
              <span>Schedule</span>
            </div>
            <div className={`flex items-center p-2 rounded cursor-pointer ${themeClasses.navItem}`}>
              <Users className="mr-2" size={20} />
              <span>Teams</span>
            </div>
            <div className={`flex items-center p-2 rounded cursor-pointer ${themeClasses.navItem}`}>
              <Settings className="mr-2" size={20} />
              <span>Settings</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 overflow-auto ${themeClasses.mainBackground}`}>
        <h1 className={`text-2xl font-bold mb-6 ${themeClasses.text}`}>Request Form</h1>
        
        <Card className={themeClasses.card}>
          <CardHeader>
            <CardTitle className={themeClasses.text}>New Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Selection */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${themeClasses.inputLabel}`}>
                  Product
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input}`}
                  value={selectedProject}
                  onChange={handleProjectChange}
                  required
                >
                  <option value="">Select Product</option>
                  {Object.keys(projectConfigs).map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              {/* Request Type Selection */}
              {selectedProject && (
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${themeClasses.inputLabel}`}>
                    Request Type
                  </label>
                  <select
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input}`}
                    value={requestType}
                    onChange={handleRequestTypeChange}
                    required
                  >
                    <option value="">Select Request Type</option>
                    {projectConfigs[selectedProject].map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Type Checkboxes */}
              {requestType && (
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${themeClasses.inputLabel}`}>
                    {requestType === 'patch' ? 'Patch Types' : 'Installer Types'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(getAvailableTypes()).map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          name="types"
                          value={type}
                          checked={selectedTypes.includes(type)}
                          onChange={handleTypeChange}
                          className="mr-2 text-blue-500 focus:ring-blue-500"
                        />
                        <label className={themeClasses.textMuted}>{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              {selectedTypes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedTypes.flatMap(type => {
                    const fields = getAvailableTypes()[type];
                    return fields.map(field => (
                      <div key={`${type}-${field.name}`} className="space-y-2">
                        <label className={`block text-sm font-medium ${themeClasses.inputLabel}`}>
                          {field.label}{field.required && '*'}
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${themeClasses.input}`}
                        />
                      </div>
                    ));
                  })}
                </div>
              )}

              {/* Submit Button */}
              {selectedTypes.length > 0 && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md ${themeClasses.button}`}
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