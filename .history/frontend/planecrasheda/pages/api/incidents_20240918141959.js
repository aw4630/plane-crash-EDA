import pool from '../../../db';  // PostgreSQL connection pool

// Disable caching for API responses (Next.js automatically handles headers)
export default async function handler(req, res) {
  const sortOption = req.query.sort || 'date-desc';
  const keyword = req.query.keyword || '';
  const type = req.query.type || '';  // Aircraft type filter
  const ownerOperator = req.query.ownerOperator || '';  // Owner/Operator filter
  const location = req.query.location || '';  // Location filter
  const phase = req.query.phase || '';  // Phase filter
  const nature = req.query.nature || '';  // Nature filter
  const departure = req.query.departure || '';  // Departure airport filter
  const destination = req.query.destination || '';  // Destination airport filter
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
      sortQuery = 'ORDER BY "Date" DESC'; // Default: sort newest to oldest
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
    searchQuery += ` AND LOWER("Departure airport") LIKE LOWER ('%${departure}%')`;
  }

  if (destination) {
    searchQuery += ` AND LOWER("Destination airport") LIKE LOWER ('%${destination}%')`;
  }

  // Filtering by Primary Cause
  if (primaryCause) {
    searchQuery += ` AND "Primary cause" = '${primaryCause}'`;  // Exact match for primary cause
  }

  try {
    // Query the PostgreSQL database using the constructed searchQuery and sortQuery
    const allIncidents = await pool.query(`SELECT * FROM database ${searchQuery} ${sortQuery}`);
    res.status(200).json(allIncidents.rows);
  } catch (err) {
    console.error('Error fetching incidents:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
