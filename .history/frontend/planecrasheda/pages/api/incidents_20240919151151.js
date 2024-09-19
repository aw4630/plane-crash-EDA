import { createClient } from '@vercel/postgres';

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
    limit = 50  // Default limit to 50 results per "Load More"
  } = req.query;

  const client = createClient();  // Create the database client

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
        sortQuery = 'ORDER BY "Date" DESC';  // Default sorting
    }

    // Filtering logic
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

    query += ` ${sortQuery} LIMIT $${queryParams.length + 1}`;  // Add LIMIT

    queryParams.push(limit);  // Add limit to the query params

    // Execute the query
    const { rows } = await client.query(query, queryParams);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying incidents:', error);  // Detailed logging
    res.status(500).json({
      error: 'Error querying incidents',
      details: error.message  // Include error details in the response
    });
  } finally {
    await client.end();  // Close the connection
  }
}
