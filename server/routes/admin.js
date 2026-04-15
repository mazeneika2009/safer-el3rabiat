const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/stats', async (req, res) => {
  try {
    const [[usersRows], [carsRows], [soldRows], [sellersRows]] = await Promise.all([
      pool.query('SELECT COUNT(*) AS count FROM users'),
      pool.query("SELECT COUNT(*) AS count FROM cars WHERE status = 'Available'"),
      pool.query("SELECT COUNT(*) AS count FROM cars WHERE status = 'Sold'"),
      pool.query('SELECT COUNT(DISTINCT user_id) AS count FROM cars WHERE user_id IS NOT NULL')
    ]);

    res.json({
      status: 'OK',
      data: {
        totalUsers: parseInt(usersRows[0].count),
        carsForSale: parseInt(carsRows[0].count),
        soldCars: parseInt(soldRows[0].count),
        totalSellers: parseInt(sellersRows[0].count)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.get('/cars', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, brand AS make, model, year, price, fuel_type, transmission,
              image_url, description, status, user_id, created_at
       FROM cars ORDER BY created_at DESC`
    );
    res.json({ status: 'OK', data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ status: 'OK', data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

module.exports = router;
