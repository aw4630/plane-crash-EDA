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
  let searchQuery = [];
  let queryParams = []; // Array to store query parameters for parameterized queries

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
    searchQuery.push(`LOWER("Narrative") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${keyword}%`);
  }

  // Filtering by Aircraft type
  if (type) {
    searchQuery.push(`LOWER("Type") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${type}%`);
  }

  // Filtering by Owner/Operator
  if (ownerOperator) {
    searchQuery.push(`LOWER("Owner/operator") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${ownerOperator}%`);
  }

  // Filtering by Location
  if (location) {
    searchQuery.push(`LOWER("Location") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${location}%`);
  }

  // Filtering by Phase
  if (phase) {
    searchQuery.push(`LOWER("Phase") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${phase}%`);
  }

  // Filtering by Nature
  if (nature) {
    searchQuery.push(`LOWER("Nature") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${nature}%`);
  }

  // Filtering by Departure/Destination airports
  if (departure) {
    searchQuery.push(`LOWER("Departure airport") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${departure}%`);
  }

  if (destination) {
    searchQuery.push(`LOWER("Destination airport") LIKE LOWER($${queryParams.length + 1})`);
    queryParams.push(`%${destination}%`);
  }

  // Filtering by Primary Cause
  if (primaryCause) {
    searchQuery.push(`"Primary cause" = $${queryParams.length + 1}`);
    queryParams.push(primaryCause); // Exact match for primary cause
  }

  try {
    // Construct the SQL query dynamically
    const whereClause = searchQuery.length > 0 ? `WHERE ${searchQuery.join(' AND ')}` : '';
    const query = `
      SELECT * FROM database 
      ${whereClause} 
      ${sortQuery}
    `;

    // Execute the query using the @vercel/postgres sql tag
    const result = await sql(query, ...queryParams);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying incidents:', error);
    res.status(500).json({ error: 'Error querying incidents' });
  }
}
