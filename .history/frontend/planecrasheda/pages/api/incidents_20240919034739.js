import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
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

  let sortQuery = '';
  let searchQuery = 'WHERE 1=1'; // Default WHERE clause that is always true, simplifies query concatenation
  const queryParams = []; // Array to store query parameters for parameterized queries

  // Sorting logic
  switch (sort) {
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
    searchQuery += ` AND LOWER("Narrative") LIKE LOWER($1)`;
    queryParams.push(`%${keyword}%`);
  }

  // Filtering by Aircraft type
  if (type) {
    searchQuery += ` AND LOWER("Type") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${type}%`);
  }

  // Filtering by Owner/Operator
  if (ownerOperator) {
    searchQuery += ` AND LOWER("Owner/operator") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${ownerOperator}%`);
  }

  // Filtering by Location
  if (location) {
    searchQuery += ` AND LOWER("Location") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${location}%`);
  }

  // Filtering by Phase
  if (phase) {
    searchQuery += ` AND LOWER("Phase") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${phase}%`);
  }

  // Filtering by Nature
  if (nature) {
    searchQuery += ` AND LOWER("Nature") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${nature}%`);
  }

  // Filtering by Departure/Destination airports
  if (departure) {
    searchQuery += ` AND LOWER("Departure airport") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${departure}%`);
  }

  if (destination) {
    searchQuery += ` AND LOWER("Destination airport") LIKE LOWER($${queryParams.length + 1})`;
    queryParams.push(`%${destination}%`);
  }

  // Filtering by Primary Cause
  if (primaryCause) {
    searchQuery += ` AND "Primary cause" = $${queryParams.length + 1}`;
    queryParams.push(primaryCause); // Exact match for primary cause
  }

  try {
    // Query the database with the search and sort criteria
    const result = await sql`
      SELECT * FROM database
      ${sql.raw(searchQuery)}
      ${sql.raw(sortQuery)}
      ${queryParams.length ? sql(queryParams) : sql``}
    `;
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying incidents:', error);
    res.status(500).json({ error: 'Error querying incidents' });
  }
}
