import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

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
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // States for pagination
  const [offset, setOffset] = useState(0);
  const [limit] = useState(100); // Load 100 incidents at a time
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      if (loading) return; // Prevent multiple requests

      setLoading(true);
      try {
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
            limit,
            offset,
            timestamp: new Date().getTime()
          }
        });

        // Append new incidents to the current list
        setIncidents((prevIncidents) => [...prevIncidents, ...response.data]);

        // Update offset for next batch
        setOffset(offset + limit);

        // Check if there are more incidents to load
        if (response.data.length < limit) {
          setHasMore(false); // No more data to load
        }

        setSearchSubmitted(false);
      } catch (err) {
        console.error('Error fetching incidents:', err);
      } finally {
        setLoading(false);
      }
    };

    if (searchSubmitted || sortOption) {
      setIncidents([]); // Clear previous data when submitting new search
      setOffset(0); // Reset offset
      setHasMore(true); // Reset hasMore for new search
      fetchIncidents(); // Fetch the first batch
    }
  }, [sortOption, searchSubmitted, keyword, type, ownerOperator, location, phase, nature, departure, destination, primaryCause]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchSubmitted(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setSearchSubmitted(true); // Trigger load more
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div style={{ padding: '0.5px' }}>
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
        
        <h1 style={{ textAlign: 'center', color: '#6f42c1' }}><strong>Database Page</strong></h1>
        <h3 style={{ textAlign: 'center', color: '#000' }}>
          <i>Includes all recorded fatal commercial jetliner incidents, user can search and sort by filters below</i>
        </h3>

        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          {/* All filters go here */}
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
        <thead>
          <tr>
            {/* Table Headers */}
          </tr>
        </thead>
        <tbody>
          {incidents && incidents.map((incident, index) => (
            <tr key={index}>
              <td>{formatDate(incident.Date)}</td>
              <td>{incident.Time}</td>
              <td>{incident.Type}</td>
              <td>{incident['Owner/operator']}</td>
              <td>{incident['Total airframe hrs']}</td>
              <td>{incident.Fatalities}</td>
              <td>{incident.Location}</td>
              <td>{incident.Phase}</td>
              <td>{incident.Nature}</td>
              <td>{incident['Departure airport']}</td>
              <td>{incident['Destination airport']}</td>
              <td>{incident.Narrative}</td>
              <td>{incident['Primary cause']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* "Load More" Button */}
      {hasMore && !loading && (
        <button onClick={handleLoadMore} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
          Load More
        </button>
      )}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data to load.</p>}
    </div>
  );
}

export default DatabasePage;
