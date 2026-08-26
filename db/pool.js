const { Pool } = require("pg");
require('dotenv').config();

console.log("PGHOST:", process.env.PGHOST);
console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("PGUSER:", process.env.PGUSER);
console.log("PASSWORD TYPE:", typeof process.env.PGPASSWORD);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
 });

module.exports = pool;