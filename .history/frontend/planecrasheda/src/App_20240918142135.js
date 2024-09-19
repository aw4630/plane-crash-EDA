import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DatabasePage from '../pages/DatabasePage';
import DataAnalysisPage from '../pages/DataAnalysisPage';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage />} />
        <Route path="/analysis" element={<DataAnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;