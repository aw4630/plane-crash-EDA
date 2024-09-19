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

  let searchConditions = []; // Array for search conditions

  // Sorting logic
  let sortQuery;
  switch (sort) {
    case 'date-asc':
      sortQuery = sql`ORDER BY "Date" ASC`;
      break;
    case 'fatalities-desc':
      sortQuery = sql`ORDER BY "Fatalities" DESC`;
      break;
    case 'fatalities-asc':
      sortQuery = sql`ORDER BY "Fatalities" ASC`;
      break;
    default:
      sortQuery = sql`ORDER BY "Date" DESC`; // Default sorting
  }

  // Filtering logic (each condition gets added to `searchConditions`)
  if (keyword) {
    searchConditions.push(sql`LOWER("Narrative") LIKE LOWER(${`%${keyword}%`})`);
  }
  if (type) {
    searchConditions.push(sql`LOWER("Type") LIKE LOWER(${`%${type}%`})`);
  }
  if (ownerOperator) {
    searchConditions.push(sql`LOWER("Owner/operator") LIKE LOWER(${`%${ownerOperator}%`})`);
  }
  if (location) {
    searchConditions.push(sql`LOWER("Location") LIKE LOWER(${`%${location}%`})`);
  }
  if (phase) {
    searchConditions.push(sql`LOWER("Phase") LIKE LOWER(${`%${phase}%`})`);
  }
  if (nature) {
    searchConditions.push(sql`LOWER("Nature") LIKE LOWER(${`%${nature}%`})`);
  }
  if (departure) {
    searchConditions.push(sql`LOWER("Departure airport") LIKE LOWER(${`%${departure}%`})`);
  }
  if (destination) {
    searchConditions.push(sql`LOWER("Destination airport") LIKE LOWER(${`%${destination}%`})`);
  }
  if (primaryCause) {
    searchConditions.push(sql`"Primary cause" = ${primaryCause}`);
  }

  try {
    // If there are search conditions, create WHERE clause, otherwise no WHERE clause
    const whereClause = searchConditions.length > 0
      ? sql`WHERE ${sql.join(searchConditions, sql` AND `)}`
      : sql``;

    // Execute the final query, ensuring ORDER BY is placed after WHERE if present
    const result = await sql`
      SELECT * FROM postgres
      ${whereClause}  -- Adds WHERE clause if there are any conditions
      ${sortQuery}    -- Always adds ORDER BY clause
    `;

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying incidents:', error);
    res.status(500).json({ error: 'Error querying incidents' });
  }
}
