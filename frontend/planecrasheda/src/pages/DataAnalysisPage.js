import React from 'react';
import { Link } from 'react-router-dom';

function DataAnalysisPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Data Analysis Page</h1>
      {/* Your Data Analysis Content Here */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ fontSize: '18px', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DataAnalysisPage;
