const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'yunish1234',
    database: 'ithelpdesk',
    
  });
  
  
  // Export the pool to be used in other modules
  module.exports = pool.promise();