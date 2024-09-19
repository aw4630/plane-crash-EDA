import React from 'react';
import Link from 'next/link';

function DataAnalysisPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Data Analysis Page</h1>
      {/*  Data Analysis Content Here */}
      <div style={{ marginTop: '20px' }}>
        <Link href="/">
          <a style={{ fontSize: '18px', textDecoration: 'none' }}>
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}

export default DataAnalysisPage;