const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false } // IMPORTANTE para Railway
});

pool.getConnection()
  .then(connection => {
    console.log('Conexión a MySQL exitosa');
    connection.release();
  })
  .catch(err => {
    console.error('Error de conexión a MySQL:', err.message);
  });

module.exports = pool;
