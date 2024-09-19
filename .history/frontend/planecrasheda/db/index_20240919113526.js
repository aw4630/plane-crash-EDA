const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC__URL_NON_POOLING,
  ssl: {
    rejectUnauthorized: false  // Necessary for secure connections on Vercel
  }
});

module.exports = pool;
