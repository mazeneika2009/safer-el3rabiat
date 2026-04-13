const path = require('path');
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const fs = require('fs');


const PORT = process.env.PORT || 5000;

// Middleware
const app = express();
app.use(cors({
    origin: 'http://localhost:5173' // Allow only your frontend to access the API
}));
app.use(express.json());

// Start Server and Sync
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();

app.get('/', (req, res) => {
    res.redirect('http://localhost:5173');
});

// API Routes
app.get('/api/data', (req, res) => {
    res.json({ message: "Connected successfully!" });
});

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1');
        res.json({ success: true, db: 'Connected', timestamp: new Date() });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Example route to fetch cars (assuming standard table name 'cars')
app.get('/api/cars', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cars');
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Route to fetch a single car by ID
app.get('/api/cars/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Admin Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const adminStats = await Promise.all([
            pool.query('SELECT COUNT(*) as count FROM users'),
            pool.query("SELECT COUNT(*) as count FROM cars WHERE status IN ('Available', 'Active')"),
            pool.query("SELECT COUNT(*) as count FROM cars WHERE status = 'Sold'"),
            pool.query('SELECT COUNT(DISTINCT user_id) as count FROM cars')
        ]);

        const [users, availableCars, soldCars, sellers] = adminStats.map(res => res[0][0]);

        res.json({
            success: true,
            data: {
                totalUsers: users.count,
                carsForSale: availableCars.count,
                soldCars: soldCars.count,
                totalSellers: sellers.count
            },
            timestamp: new Date()
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// User Profile Data
app.get('/api/users/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// User Listings (Cars belonging to a specific user)
app.get('/api/users/:id/cars', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cars WHERE user_id = ?', [req.params.id]);
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update User Profile
app.put('/api/users/:id', async (req, res) => {
    const { name, email } = req.body;
    try {
        await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id]);
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`🚨 Global Error: ${err.stack}`);
    res.status(500).json({
        success: false,
        message: 'An internal server error occurred.'
    });
});
