import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatchManagerDashboard from './PatchManagerDashboard';
import RequestPage from './RequestPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/requests" element={<RequestPage />} />
        <Route path="/dashboard" element={<PatchManagerDashboard />} />  {/* Add /dashboard route */}
        <Route path="/" element={<PatchManagerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
