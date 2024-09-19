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
    page = 1,
    pageSize = 50
  } = req.query;

  const client = createClient();

  try {
    await client.connect();

    let query = 'SELECT DISTINCT ON ("Date", "Time", "Type", "Owner/operator") *';
    let countQuery = 'SELECT COUNT(DISTINCT "Date", "Time", "Type", "Owner/operator")';
    const baseQuery = ' FROM database';
    const searchConditions = [];
    const queryParams = [];

    // Sorting logic
    let sortQuery;
    switch (sort) {
      case 'date-asc':
        sortQuery = 'ORDER BY "Date" ASC, "Time" ASC';
        break;
      case 'fatalities-desc':
        sortQuery = 'ORDER BY "Fatalities" DESC, "Date" DESC, "Time" DESC';
        break;
      case 'fatalities-asc':
        sortQuery = 'ORDER BY "Fatalities" ASC, "Date" DESC, "Time" DESC';
        break;
      default:
        sortQuery = 'ORDER BY "Date" DESC, "Time" DESC';
    }

    // Filtering logic (each condition gets added to `searchConditions`)
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
      const whereClause = ' WHERE ' + searchConditions.join(' AND ');
      query += baseQuery + whereClause;
      countQuery += baseQuery + whereClause;
    } else {
      query += baseQuery;
      countQuery += baseQuery;
    }

    query += ` ${sortQuery} LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(pageSize, (page - 1) * pageSize);

    const [dataResult, countResult] = await Promise.all([
      client.query(query, queryParams),
      client.query(countQuery, queryParams.slice(0, -2))
    ]);

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      data: dataResult.rows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        pageSize: pageSize
      }
    });
  } catch (error) {
    console.error('Error querying incidents:', error);
    res.status(500).json({
      error: 'Error querying incidents',
      details: error.message,
    });
  } finally {
    await client.end();
  }
}