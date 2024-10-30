import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Inbox, 
  Settings, 
  Users, 
  BarChart,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Alert, AlertDescription } from "./components/ui/Alert";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const PatchManagerDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [patches] = useState({
    inProgress: [
      { id: 1, name: "Security Patch 2.3", requestDate: "2024-10-24", estimatedDelivery: "2024-10-28", status: "building", requester: "John Doe" },
      { id: 2, name: "Feature Update 1.5", requestDate: "2024-10-25", estimatedDelivery: "2024-10-29", status: "testing", requester: "Jane Smith" }
    ],
    completed: [
      { id: 3, name: "Hotfix 1.2", requestDate: "2024-10-20", deliveryDate: "2024-10-23", status: "completed", requester: "Mike Johnson" }
    ],
    backlog: [
      { id: 4, name: "Performance Patch 3.0", requestDate: "2024-10-26", estimatedDelivery: "2024-11-02", status: "queued", requester: "Sarah Williams" }
    ]
  });

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-8 text-gray-100">Patch Manager</h2>
          <nav className="space-y-2">
            <div 
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <BarChart className="mr-2" size={20} />
              <span>Dashboard</span>
            </div>
            <div 
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => navigate('/requests')}
            >
              <Inbox className="mr-2" size={20} />
              <span>Requests</span>
            </div>
            <div 
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => navigate('/schedule')}
            >
              <Calendar className="mr-2" size={20} />
              <span>Schedule</span>
            </div>
            <div className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
              <Users className="mr-2" size={20} />
              <span>Teams</span>
            </div>
            <div className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
              <Settings className="mr-2" size={20} />
              <span>Settings</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Dashboard Overview</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">In Progress</CardTitle>
              <Clock className="text-yellow-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{patches.inProgress.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Completed</CardTitle>
              <CheckCircle className="text-emerald-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{patches.completed.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Backlog</CardTitle>
              <AlertTriangle className="text-orange-400" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{patches.backlog.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Section */}
        <Alert className="mb-8 bg-red-900 border-red-800 text-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Build failed for Release Patch 2.3. CI/CD team has been notified.
          </AlertDescription>
        </Alert>

        {/* Patch Lists */}
        <div className="space-y-6">
          {/* In Progress Patches */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">In Progress Patches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patches.inProgress.map(patch => (
                  <div key={patch.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-100">{patch.name}</h3>
                      <p className="text-sm text-gray-400">Requested by: {patch.requester}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Requested: {patch.requestDate}</p>
                      <p className="text-sm text-gray-300">Expected: {patch.estimatedDelivery}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Patches */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Completed Patches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patches.completed.map(patch => (
                  <div key={patch.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-100">{patch.name}</h3>
                      <p className="text-sm text-gray-400">Requested by: {patch.requester}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Delivered: {patch.deliveryDate}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-900 text-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Backlog Patches */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Backlog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patches.backlog.map(patch => (
                  <div key={patch.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-100">{patch.name}</h3>
                      <p className="text-sm text-gray-400">Requested by: {patch.requester}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Requested: {patch.requestDate}</p>
                      <p className="text-sm text-gray-300">Expected: {patch.estimatedDelivery}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-900 text-orange-200">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Queued
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatchManagerDashboard;
