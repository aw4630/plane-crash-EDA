const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC__URL,
  ssl: {
    rejectUnauthorized: false  // Necessary for secure connections on Vercel
  }
});

module.exports = pool;

import { createClient } from '@vercel/postgres';
const client = createClient();
export default client;