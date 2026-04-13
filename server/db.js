const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });
// Ensure environment variables are loaded before creating the pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test connection
pool.getConnection()
    .then(connection => {
        console.log(`✅ Connected to MySQL Database: ${process.env.DB_NAME || 'safer_el3rabiat'}`);
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection stalled or failed:', err.message);
    });

module.exports = pool;
