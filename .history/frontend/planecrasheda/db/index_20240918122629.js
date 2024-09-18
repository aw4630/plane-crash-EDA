const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC__URL,  // Single connection string from Vercel Postgres
  ssl: {
    rejectUnauthorized: false 
});

module.exports = pool;
