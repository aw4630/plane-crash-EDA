import React from 'react';
import Link from 'next/link';

function DataAnalysisPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Data Analysis Page</h1>
      
      {/* Embed Power BI Dashboard */}
      <iframe
        title="planecrasheda"
        width="1200"
        height="600"
        src="https://app.powerbi.com/reportEmbed?reportId=a2c6767a-d2e2-48a5-bdfe-b3d374224b84&autoAuth=true&embeddedDemo=true"
        frameBorder="0"
        allowFullScreen="true"
      ></iframe>

      {/* Back to Home Link */}
      <div style={{ marginTop: '20px' }}>
        <Link href="/" style={{ fontSize: '18px', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default DataAnalysisPage;
