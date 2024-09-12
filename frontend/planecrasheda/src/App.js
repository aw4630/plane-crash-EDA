import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DatabasePage from './pages/DatabasePage';
import DataAnalysisPage from './pages/DataAnalysisPage';

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Root Route: HomePage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Database Route */}
        <Route path="/database" element={<DatabasePage />} />
        
        {/* Data Analysis Route */}
        <Route path="/analysis" element={<DataAnalysisPage />} />
        
        {/* Add more routes here as needed */}
      </Routes>
    </Router>

    
  );
}

export default App;
