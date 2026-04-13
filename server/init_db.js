const pool = require('./db');
const fs = require('fs');
const path = require('path');

const initDatabase = async () => {
    try {
        console.log('🚀 Initializing Database...');
        
        // Read schema from file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split by semicolon to get individual queries (basic approach)
        const queries = schema
            .split(';')
            .map(q => q.trim())
            .filter(q => q.length > 0 && !q.startsWith('--') && !q.startsWith('select'));

        // Use a connection to run queries
        const connection = await pool.getConnection();
        
        try {
            // First select the database
            await connection.query(`CREATE DATABASE IF NOT EXISTS safer_el3rabiat`);
            await connection.query(`USE safer_el3rabiat`);

            for (const query of queries) {
                console.log(`📡 Executing: ${query.substring(0, 50)}...`);
                await connection.query(query);
            }

            // Seed a default admin user if none exists
            const [existingAdmin] = await connection.query('SELECT id FROM users WHERE email = ?', ['admin@safer.com']);
            if (existingAdmin.length === 0) {
                console.log('🌱 Seeding default admin user...');
                await connection.query(`
                    INSERT INTO users (name, email, password, role) 
                    VALUES ('Elite Admin', 'admin@safer.com', 'admin123', 'admin')
                `);
            }

            console.log('✅ Database Initialization Complete');
        } finally {
            connection.release();
        }

    } catch (err) {
        console.error('❌ Database Initialization Failed:', err.message);
    } finally {
        process.exit();
    }
};

initDatabase();
