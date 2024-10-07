import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function HomePage() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
      minHeight: '100vh',
      padding: '10px 0',
      fontFamily: "'Roboto', sans-serif",
      color: '#333'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '38px',
          fontWeight: '700',
          color: '#34495e',
          marginBottom: '10px',
          letterSpacing: '2px',
          animation: 'fadeInDown 1s ease-out'
        }}>
          Welcome to my Plane Crash Database & Exploratory Data Analysis
        </h1>

        <p style={{ fontSize: '20px', fontWeight: '500', marginBottom: '20px', animation: 'fadeInUp 1s ease-out' }}>
          Full-stack web app designed by <strong>Alan Wu</strong> &nbsp;
          <a href="https://github.com/aw4630/plane-crash-EDA" style={{ fontSize: '16px', fontWeight: 'bold', color: '#3498db' }} target="_blank" rel="noopener noreferrer">
            (GitHub)
          </a>
        </p>

        <p style={{ fontSize: '12px', color: '#7f8c8d' }}>All images are public domain</p>
        
        {/* Film photograph style images */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '30px', animation: 'fadeIn 1.2s ease-out' }}>
          <div className="photo-frame">
            <Image src="/asndb.png" alt="Image 1" width={285} height={230} style={{ display: 'block' }}/>
          </div>
          <div className="photo-frame">
            <Image src="/ntsb.jpeg" alt="Image 2" width={285} height={230} style={{ display: 'block' }}/>
          </div>
          <div className="photo-frame">
            <Image src="/crash.jpeg" alt="Image 3" width={285} height={230} style={{ display: 'block' }}/>
          </div>
          <div className="photo-frame">
            <Image src="/twa.jpg.avif" alt="Image 4" width={285} height={230} style={{ display: 'block' }}/>
          </div>
        </div>

        <p style={{ fontSize: '24px', fontWeight: '600', marginTop: '30px', color: '#2c3e50' }}>Choose an option below:</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '0px' }}>
          {/* Data Analysis Page */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <Link href="/analysis">
              <span className="highlight-box" style={{
                fontSize: '40px',
                fontWeight: '600',
                color: '#2980b9',
                padding: '20px',
                display: 'block',
                transition: 'all 0.3s ease',
              }}>
                Data Analysis Page
              </span>
            </Link>
            <p style={{ marginTop: '5px', fontSize: '18px', color: '#black' }}>
              <strong>Analyze fatal commercial jetliner incidents</strong> <br/>
              
              <i>What are the main causes of fatal plane crashes?</i> <br />
              <i>Are certain airliner manufacturers statistically deadlier?</i> <br />
              <i>Is there a correlation between aircraft age and fatal incidents?</i> <br />
              <i>Is commercial aviation getting safer over time?</i> <br /> <br />
              These are questions that will be answered with statistical methods and visualized with Microsoft PowerBI.
            </p>

          </div>

          {/* Database Page */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <Link href="/database">
              <span className="highlight-box" style={{
                fontSize: '40px',
                fontWeight: '600',
                color: '#2980b9',
                padding: '20px',
                display: 'block',
                transition: 'all 0.3s ease',
              }}>
                Database Page
              </span>
            </Link>
            <p style={{ marginTop: '5px', fontSize: '18px', color: '#black' }}>
              <strong>Explore recorded incidents</strong>
            </p>
            <ul style={{ textAlign: 'left', display: 'inline-block', margin: '0 auto', padding: '0', fontSize: '18px' }}>
              <li>Date</li>
              <li>Airline operator</li>
              <li>Aircraft type</li>
              <li>Number of fatalities</li>
              <li>Cause of incident</li>
              <li>and more...</li>
            </ul>

          </div>
        </div>

        {/* Internal Style for Hover Effect and Animations */}
        <style jsx>{`

          .photo-frame {
            position: relative;
            border: 15px solid white; /* Simulating photo border */
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); /* Depth shadow for photo effect */
            border-radius: 0px;
          }

          
          .highlight-box:hover {
            background-color: #aaa7ad;
            color: white;
            border-radius: 12px;
          }

          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default HomePage;
