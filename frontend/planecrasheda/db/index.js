const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables


const pool = new Pool({
  user: 'postgres',
  host: 'planecrasheda.claaskamsdc4.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Planecrasheda123!',
  port: 5432,
});

module.exports = pool;
