//import pool from '../../db';  // PostgreSQL connection pool
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { sort, keyword, type, ownerOperator, location, phase, nature, departure, destination, primaryCause } = req.query;

  let sortQuery = '';
  let searchQuery = 'WHERE 1=1'; // Default WHERE clause that is always true, simplifies query concatenation

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
    const result = await sql`
      SELECT * FROM database ${sql(searchQuery)} ${sql(sortQuery)}
    `;
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying incidents:', error);
    res.status(500).json({ error: 'Error querying incidents' });
  }
}