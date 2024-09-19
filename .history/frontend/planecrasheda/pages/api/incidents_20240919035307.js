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

  let sortQuery = sql`ORDER BY "Date" DESC`; // Default sorting
  const searchConditions = []; // Array for search conditions

  // Sorting logic
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
  }

  // Filtering by keyword in Narrative
  if (keyword) {
    searchConditions.push(sql`LOWER("Narrative") LIKE LOWER(${`%${keyword}%`})`);
  }

  // Filtering by Aircraft type
  if (type) {
    searchConditions.push(sql`LOWER("Type") LIKE LOWER(${`%${type}%`})`);
  }

  // Filtering by Owner/Operator
  if (ownerOperator) {
    searchConditions.push(sql`LOWER("Owner/operator") LIKE LOWER(${`%${ownerOperator}%`})`);
  }

  // Filtering by Location
  if (location) {
    searchConditions.push(sql`LOWER("Location") LIKE LOWER(${`%${location}%`})`);
  }

  // Filtering by Phase
  if (phase) {
    searchConditions.push(sql`LOWER("Phase") LIKE LOWER(${`%${phase}%`})`);
  }

  // Filtering by Nature
  if (nature) {
    searchConditions.push(sql`LOWER("Nature") LIKE LOWER(${`%${nature}%`})`);
  }

  // Filtering by Departure airport
  if (departure) {
    searchConditions.push(sql`LOWER("Departure airport") LIKE LOWER(${`%${departure}%`})`);
  }

  // Filtering by Destination airport
  if (destination) {
    searchConditions.push(sql`LOWER("Destination airport") LIKE LOWER(${`%${destination}%`})`);
  }

  // Filtering by Primary Cause
  if (primaryCause) {
    searchConditions.push(sql`"Primary cause" = ${primaryCause}`);
  }

  // Combine all search conditions into the WHERE clause
  const whereClause = searchConditions.length > 0
    ? sql`WHERE ${sql.join(searchConditions, sql` AND `)}`
    : sql``;

  try {
    // Execute the final query
    const result = await sql`
      SELECT * FROM database
      ${whereClause}
      ${sortQuery}
    `;

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying incidents:', error);
    res.status(500).json({ error: 'Error querying incidents' });
  }
}
