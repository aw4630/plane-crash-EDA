const express = require('express');
const cors = require('cors');
const pool = require('../../db');  // Correct path from incidents.js to the db directory containing 'index.js' connection to PostgreSQL server
const router = express.Router();

router.use(cors());
router.use(express.json()); // Middleware to parse JSON bodies

// Disable caching for API responses
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Define a route to get all incidents with sorting, searching, and filtering
router.get('/api/incidents', async (req, res) => {
  const sortOption = req.query.sort || 'date-desc';
  const keyword = req.query.keyword || '';
  const type = req.query.type || ''; // aircraft type filer
  const ownerOperator = req.query.ownerOperator || '';  // Owner/Operator filter
  const location = req.query.location || '';  // Location filter
  const phase = req.query.phase || '';  // Phase filter
  const nature = req.query.nature || '';  // Nature filter
  const departure = req.query.departure || ''; // Departure airport filter
  const destination = req.query.destination || ''; // Destintaion airport filter
  const primaryCause = req.query.primaryCause || '';  // Primary Cause filter

  let sortQuery = '';
  let searchQuery = 'WHERE 1=1';  // Default WHERE clause that is always true, simplifies query concatenation

  // Sorting logic
  switch (sortOption) {
    case 'date-desc':
      sortQuery = 'ORDER BY "Date" DESC';
      break;
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
      sortQuery = 'ORDER BY "Date" DESC'; // Let default sort from newest-oldest incidents
  }

  // Search keyword in Narrative column
  if (keyword) {
    searchQuery += ` AND LOWER("Narrative") LIKE LOWER('%${keyword}%')`;
  }

  // Filtering by Aircraft type
  if (type) {
    searchQuery += ` AND LOWER("Type") LIKE LOWER ('%${type}%')`;
  }

  // Filtering by Owner/Operator
  if (ownerOperator) {
    searchQuery += ` AND LOWER("Owner/operator") LIKE LOWER('%${ownerOperator}%')`;
  }

  // Filtering by Location
  if (location) {
    searchQuery += ` AND LOWER("Location") LIKE LOWER('%${location}%')`;
  }

  // Filtering by Phase
  if (phase) {
    searchQuery += ` AND LOWER("Phase") LIKE LOWER('%${phase}%')`;  
  }

  // Filtering by Nature
  if (nature) {
    searchQuery += ` AND LOWER("Nature") LIKE LOWER('%${nature}%')`;  
  }

  // Filtering by Departure/Destination airports
  if (departure) {
    searchQuery += ` AND LOWER("Departure airport") LIKE LOWER ('%${departure}%') `
  }

  if (destination) {
    searchQuery += ` AND LOWER("Destination airport") LIKE LOWER ('%${destination}%') `
  }

  // Filtering by Primary Cause
  if (primaryCause) {
    searchQuery += ` AND "Primary cause" = '${primaryCause}'`;  // Use exact match for primary cause
  }

  try {
    const allIncidents = await pool.query(`SELECT * FROM database ${searchQuery} ${sortQuery}`);
    res.json(allIncidents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
