// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';  // Adjust path if necessary
import PatchManagerDashboard from './PatchManagerDashboard';
import RequestPage from './RequestPage';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/dashboard" element={<PatchManagerDashboard />} />
          <Route path="/" element={<PatchManagerDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
