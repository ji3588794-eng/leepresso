const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  //port: process.env.DB_PORT || 4000,
  port: process.env.DB_PORT || 3306, //LOCALHOST

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:
      process.env.NODE_ENV === 'production'
        ? {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: false
          }
        : undefined
  });


module.exports = pool;