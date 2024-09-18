import React from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Use next/image for optimized images
import image1 from './assets/asndb.png';
import image2 from './assets/ntsb.jpeg';
import image3 from './assets/crash.jpeg';

function HomePage() {
  return (
    <div style={{
      backgroundColor: '#ffffff',  // Correct background color to white
      minHeight: '100vh',           // Full viewport height
      padding: '0px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to my plane crash exploratory data analysis</h1>
        <p>Full-stack web app designed by Alan Wu 
          <Link href="https://github.com/aw4630/plane-crash-EDA">
            <a style={{ fontSize: '12px', fontWeight: 'bold' }}>(Github)</a>
          </Link>
        </p>

        <p style={{ fontSize: '10px' }}>All images are public domain</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '5px' }}>
          <Image src={image1} alt="Image 1" height={300} width={300} />
          <Image src={image2} alt="Image 2" height={300} width={300} />
          <Image src={image3} alt="Image 3" height={300} width={300} />
        </div>

        <p style={{ fontSize: '20px' }}>Choose an option below:</p>
        
        {/* Flex container to hold both sections side by side */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px' }}>
          {/* Data Analysis Section */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <Link href="/analysis">
              <a
                style={{
                  fontSize: '50px',
                  fontWeight: 'bold',
                  color: '#000',
                  padding: '20px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
                className="highlight-box"
              >
                Data Analysis Page
              </a>
            </Link>
            <p style={{ marginTop: '7px', fontSize: '20px' }}>
              <strong>Data analysis of all fatal commercial jetliner incidents</strong>
            </p>
            <p style={{ marginTop: '7px', fontSize: '15px' }}>
              <i>What are the main causes of fatal plane crashes?</i> <br />
              <i>Are certain airliner models or manufacturers statistically deadlier?</i> <br />
              <i>Is there a correlation between aircraft age and fatal incidents?</i> <br />
              <i>Is commercial aviation getting safer over time?</i> <br /> <br />
              These are questions that will be answered with statistical methods and visualized with Microsoft PowerBI.
            </p>
          </div>

          {/* Database Section */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <Link href="/database">
              <a
                style={{
                  fontSize: '50px',
                  fontWeight: 'bold',
                  color: '#000',
                  padding: '20px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
                className="highlight-box"
              >
                Database Page
              </a>
            </Link>
            <p style={{ marginTop: '7px', fontSize: '20px' }}>
              <strong>Explore all the recorded fatal commercial jetliner incidents</strong>
            </p>
            <p style={{ marginTop: '7px', fontSize: '15px' }}>
              Ability to search and sort through database for specific incidents by:
            </p>
            <ul style={{ textAlign: 'left', display: 'inline-block', margin: '0 auto', padding: '0', fontSize: '15px' }}>
              <li>Date</li>
              <li>Airline operator</li>
              <li>Aircraft type</li>
              <li>Number of fatalities</li>
              <li>Cause of incident</li>
              <li>and more...</li>
            </ul>
          </div>
        </div>

        {/* Internal style for hover effect */}
        <style jsx>{`
          .highlight-box:hover {
            background-color: #dddddd;
            color: white;
            border-radius: 10px;
          }
        `}</style>
      </div>
    </div>
  );
}

export default HomePage;
