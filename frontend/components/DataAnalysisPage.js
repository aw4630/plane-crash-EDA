import React from 'react';
import Link from 'next/link';

function DataAnalysisPage() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '0px',
      fontFamily: "'Roboto', sans-serif",
      background: '#ecf0f1',
      minHeight: '100vh',
      padding: '5px'
    }}>
      <h1 style={{ fontSize: '40px', fontWeight: '700', color: '#2c3e50' }}>
        Data Analysis Page
      </h1>

      <div>
        <p> User must sign into Power BI to view my interactive data visualization dashboard</p>
      </div>
      
      {/* Embed Power BI Dashboard */}
      <iframe
        title="planecrasheda"
        width="1200"
        height="600"
        src="https://app.powerbi.com/reportEmbed?reportId=a2c6767a-d2e2-48a5-bdfe-b3d374224b84&autoAuth=true&embeddedDemo=true"
        frameBorder="0"
        allowFullScreen="true"
        style={{
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          marginTop: '20px'
        }}
      ></iframe>

      {/* Back to Home Link */}
      <div style={{ marginTop: '40px' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: '500', color: '#2980b9', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DataAnalysisPage;
