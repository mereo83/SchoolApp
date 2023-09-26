const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Blessme@12',
  database: 'school_management',
  connectionLimit: 10, // Adjust this according to your needs
});

module.exports = pool.promise();
