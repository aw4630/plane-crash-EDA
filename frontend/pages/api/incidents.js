import express from 'express';
import { createClient } from '@vercel/postgres';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/api/incidents', async (req, res) => {
  const {
    sort = 'date-desc',
    keyword,
    type,
    ownerOperator,
    location,
    phase,
    nature,
    departure,
    destination,
    primaryCause,
  } = req.query;

  // Create a new PostgreSQL client for this request
  const client = createClient();

  try {
    await client.connect();  // Connect to the database

    let query = 'SELECT DISTINCT * FROM database';
    const searchConditions = [];
    const queryParams = [];

    // Sorting logic
    let sortQuery;
    switch (sort) {
      case 'date-asc':
        sortQuery = 'ORDER BY "Date" ASC';
        break;
      case 'fatalities-desc':
        sortQuery = 'ORDER BY "Fatalities" DESC';
        break;
      case 'fatalities-asc':
        sortQuery = 'ORDER BY "Fatalities" ASC';
        break;
      default:
        sortQuery = 'ORDER BY "Date" DESC';  
    }

    if (keyword) {
      searchConditions.push(`LOWER("Narrative") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${keyword}%`);
    }
    if (type) {
      searchConditions.push(`LOWER("Type") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${type}%`);
    }
    if (ownerOperator) {
      searchConditions.push(`LOWER("Owner/operator") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${ownerOperator}%`);
    }
    if (location) {
      searchConditions.push(`LOWER("Location") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${location}%`);
    }
    if (phase) {
      searchConditions.push(`LOWER("Phase") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${phase}%`);
    }
    if (nature) {
      searchConditions.push(`LOWER("Nature") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${nature}%`);
    }
    if (departure) {
      searchConditions.push(`LOWER("Departure airport") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${departure}%`);
    }
    if (destination) {
      searchConditions.push(`LOWER("Destination airport") LIKE LOWER($${queryParams.length + 1})`);
      queryParams.push(`%${destination}%`);
    }
    if (primaryCause) {
      searchConditions.push(`"Primary cause" = $${queryParams.length + 1}`);
      queryParams.push(primaryCause);
    }

    if (searchConditions.length > 0) {
      query += ' WHERE ' + searchConditions.join(' AND ');
    }

    query += ` ${sortQuery}`; 

    // Execute the query
    const { rows } = await client.query(query, queryParams);
    res.status(200).json(rows);  
  } catch (error) {
    console.error('Error querying incidents:', error);  
    res.status(500).json({
      error: 'Error querying incidents',
      details: error.message,  
    });
  } finally {
    try {
      await client.end();
    } catch (e) {
      console.error('Error closing database client:', e);
    }
  }
});

// Export the handler for Vercel
export default (req, res) => app(req, res);

