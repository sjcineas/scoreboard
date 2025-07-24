const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Add promise support
const poolPromise = pool.promise();

// Test the connection using the pool's built-in test
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error testing MySQL connection:', err);
        return;
    }
    console.log('!!! MySQL Connection Pool Initialized Successfully !!!');
    connection.release();
});

// Create a wrapper that supports both callback and promise styles
const db = {
    pool,
    promise: poolPromise,
    
    // Callback-based methods for backward compatibility
    getConnection: (callback) => {
        if (typeof callback === 'function') {
            return pool.getConnection(callback);
        } else {
            return poolPromise.getConnection();
        }
    },
    
    query: (sql, values, callback) => {
        // Handle (sql, callback)
        if (typeof values === 'function') {
            return pool.query(sql, values);
        }

        // Handle (sql, values, callback)
        if (typeof callback === 'function') {
            return pool.query(sql, values, callback);
        }

        // Handle (sql) or (sql, values) with promises
        return poolPromise.query(sql, values);

    }
};


module.exports = db;