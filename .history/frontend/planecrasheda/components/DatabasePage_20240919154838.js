import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
//import image from './assets/b747.jpeg';


function DatabasePage() {
  const [incidents, setIncidents] = useState([]);
  const [sortOption, setSortOption] = useState('date-desc');
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [ownerOperator, setOwnerOperator] = useState('');
  const [location, setLocation] = useState('');
  const [phase, setPhase] = useState('');
  const [nature, setNature] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [primaryCause, setPrimaryCause] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state for sorting
  const [searchSubmitted, setSearchSubmitted] = useState(false);  // State to handle form submissions

  // Fetch incidents when filters or sorting change
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);  // Set loading to true when fetching starts
        const response = await axios.get('/api/incidents', {
          params: {
            sort: sortOption,
            keyword,
            type,
            ownerOperator,
            location,
            phase,
            nature,
            departure,
            destination,
            primaryCause,
            timestamp: new Date().getTime(),
          },
        });
        setIncidents(response.data);
      } catch (err) {
        console.error('Error fetching incidents:', err);
      } finally {
        setLoading(false);  // Hide the spinner after fetching data
        setSearchSubmitted(false);  // Reset the search submitted state
      }
    };

    fetchIncidents();
  }, [sortOption, keyword, type, ownerOperator, location, phase, nature, departure, destination, primaryCause]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchSubmitted(true);  // Trigger search on form submission
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };


  return (
    <div style={{ padding: '0.5px' }}>
      {/* Loading spinner */}
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div style={{
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/1/1e/Boeing_747-438_-_Qantas_%28VH-OJR%29_%282%29.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5px',
        marginBottom: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backgroundBlendMode: 'overlay'
      }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#6f42c1' }}>
            Back to Home
        </Link>

   

  {/* Internal style tag for custom hover effect */}
  <style>
    {`
      .header {
        background-color: #6f42c1;
        color: white;
      }

      .header:hover {
        position: relative;
        background-color: #5a34a1;
        cursor: pointer;
        
      }

       /* Tooltip container */
      .header .tooltip-text {
        visibility: hidden;
        width: 110px;
        background-color: rgba(0, 0, 0, 0.75);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 110%; /* Position below the header */
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.25s ease;
      }

    

      /* Show the tooltip when hovering */
      .header:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    `}
  </style>
   
        <h1 style={{ textAlign: 'center', color: '#6f42c1' }}><strong>Database Page</strong></h1>
        <h3 style={{ textAlign: 'center', color: '#000' }}>
          <i>Includes all recorded fatal commercial jetliner incidents, user can search and sort by filters below</i>
        </h3>
      
      

      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
        <div>
          <label><strong>SORT BY (Date/Fatalities): </strong></label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="date-desc">Date (Most recent-Oldest)</option>
            <option value="date-asc">Date (Oldest-Most recent)</option>
            <option value="fatalities-desc">Fatalities (Highest-Lowest)</option>
            <option value="fatalities-asc">Fatalities (Lowest-Highest)</option>
          </select>
        </div>

        <div>
          <label>Search by keyword (in Narrative): </label>
          <input
            type="text"
            placeholder="ex: hijack, bird strike, turbulence"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '200px' }}
          />
        </div>

        <div>
          <label>Search by Aircraft Type: </label>
          <input
            type="text"
            placeholder="ex: 737 MAX, Airbus, DC-10, Boeing 747, Tupolev, A320"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>

        <div>
          <label>Search by Owner/Operator: </label>
          <input
            type="text"
            placeholder="ex: Aeroflot, Pan Am, TWA, Air France, Soviet Air Force"
            value={ownerOperator}
            onChange={(e) => setOwnerOperator(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>

        <div>
          <label>Search by Location: </label>
          <input
            type="text"
            placeholder="ex: United States, India, Tokyo, Pacific Ocean"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>

        <div>
          <label>Search by Phase: </label>
          <select value={phase} onChange={(e) => setPhase(e.target.value)}>
            <option value="">Any</option>
            <option value="Standing">Standing</option>
            <option value="Taxi">Taxi</option>
            <option value="Take off">Take off</option>
            <option value="Initial climb">Initial climb</option>
            <option value="En route">En route</option>
            <option value="Approach">Approach</option>
            <option value="Landing">Landing</option>
            <option value="Manoeuvring">Manoeuvring (airshow, firefighting, ag.ops.)</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label>Search by Nature: </label>
          <select value={nature} onChange={(e) => setNature(e.target.value)}>
            <option value="">Any</option>
            <option value="Passenger - Scheduled">Passenger - Scheduled</option>
            <option value="Passenger - Non-Scheduled/charter/Air taxi">Passenger - Non-Scheduled/charter/Air taxi</option>
            <option value="Military">Military</option>
            <option value="Demo">Demo/Airshow/Display</option>
            <option value="Cargo">Cargo</option>
            <option value="Ferry/positioning">Ferry/positioning</option>
            <option value="Test">Test</option>
            <option value="Fire fighting">Fire fighting</option>
            <option value="Calibration/Inspection">Calibration/Inspection</option>
            <option value="Training">Training</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label>Search by Departure airport: </label>
          <input
            type="text"
            placeholder="ex: JFK, BOM, Tokyo-Haneda"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            style={{ width: '200px' }}
          />
        </div>

        <div>
          <label>Search by Destination airport: </label>
          <input
            type="text"
            placeholder="ex: LAX, LHR, Hong Kong"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ width: '200px' }}
          />
        </div>

        <div>
          <label>Search by Primary Cause: </label>
          <select value={primaryCause} onChange={(e) => setPrimaryCause(e.target.value)}>
            <option value="">Any</option>
            <option value="Pilot error">Pilot error</option>
            <option value="Mechanical failure">Mechanical failure</option>
            <option value="ATC error">ATC error</option>
            <option value="Weather">Weather</option>
            <option value="Sabotage">Sabotage</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </form>
    </div>
    
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
        <thead>
          <tr>
          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Date
          <div className="tooltip-text">The date the incident occurred</div>

          </th>          
          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Time
          <div className="tooltip-text">The time the incident occurred from 0:00 to 23:59 hours</div>
          </th>          

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Type
          <div className="tooltip-text">The aircraft type including manufacturer and model variant (e.g. Airbus A320-231)</div>
          </th>

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Owner/operator
          <div className="tooltip-text">The owner/operator of the aircraft involved</div>
          </th>  

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Total airframe hrs
          <div className="tooltip-text">The total airframe hours, or total aircraft flight time at time of incident</div>
          </th>

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Fatalities
          <div className="tooltip-text">The number of deaths that occurred during the incident</div>
          </th>  
                 
          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Location
          <div className="tooltip-text">The approx. geographic location of the incident including city, province/state, country</div>
          </th>

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Phase
          <div className="tooltip-text">The phase of flight when incident occurred</div>
          </th>   

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Nature
          <div className="tooltip-text">The nature, or purpose, of the flight</div>
          </th>

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Departure airport
          <div className="tooltip-text">The flight's departure airport</div>
          </th> 

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Destination airport
          <div className="tooltip-text">The flight's destination airport</div>
          </th>    

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px'}}>
              Narrative
              <div className="tooltip-text">The narrative description of the incident from the database</div>
          </th>

          <th className="header" style={{ border: '2px solid #ddd', padding: '8px' }}>
          Primary cause
          <div className="tooltip-text">The primary cause of the aircraft incident</div>
          </th>                   
          </tr>
        </thead>
        <tbody>
          {incidents && incidents.map((incident, index) => (
            <tr key={index}>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{formatDate(incident.Date)}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident.Time}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident.Type}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident['Owner/operator']}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident['Total airframe hrs']}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident.Fatalities}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident.Location}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident.Phase}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident.Nature}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident['Departure airport']}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident['Destination airport']}</td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px', maxHeight: '100px', overflowY: 'scroll', whiteSpace: 'pre-wrap' }}>
                <div style={{ maxHeight: '100px', overflowY: 'scroll' }}>{incident.Narrative}</div>
              </td>
              <td style={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '8px' }}>{incident['Primary cause']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* CSS elements*/}
      <style jsx>{`
        .spinner-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);  /* Translucent background */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;  /* On top of everything */
        }
        .spinner {
          border: 6px solid rgba(0, 0, 0, 0.1);
          border-left-color: #6f42c1;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default DatabasePage;
