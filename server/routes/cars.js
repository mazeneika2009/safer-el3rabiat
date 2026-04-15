const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, brand AS make, model, year, price, fuel_type, transmission, color, mileage, phone,
              image_url, description, status, user_id, created_at
       FROM cars WHERE status = 'Available' ORDER BY created_at DESC`
    );
    res.json({ status: 'OK', data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, brand AS make, model, year, price, fuel_type, transmission, color, mileage, phone,
              image_url, description, status, user_id, created_at
       FROM cars WHERE id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ status: 'ERROR', message: 'Car not found' });
    }
    res.json({ status: 'OK', data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { make, model, year, price, description, image_url, user_id, color, mileage, phone } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO cars (brand, model, year, price, image_url, description, status, user_id, color, mileage, phone)
       VALUES (?, ?, ?, ?, ?, ?, 'Available', ?, ?, ?, ?)`,
      [make, model, year, price, image_url, description, user_id, color, mileage, phone]
    );
    const [rows] = await pool.query(
      `SELECT id, brand AS make, model, year, price, fuel_type, transmission, color, mileage, phone,
              image_url, description, status, user_id, created_at
       FROM cars WHERE id = ?`,
      [result.insertId]
    );
    res.status(201).json({ status: 'OK', data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { make, model, year, price, description, image_url, states, color, mileage, phone } = req.body;
  try {
    await pool.query(
      `UPDATE cars SET brand=?, model=?, year=?, price=?, description=?, image_url=?, status=?, color=?, mileage=?, phone=? WHERE id=?`,
      [make, model, year, price, description, image_url, states, color, mileage, phone, req.params.id]
    );
    const [rows] = await pool.query(
      `SELECT id, brand AS make, model, year, price, fuel_type, transmission, color, mileage, phone,
              image_url, description, status, user_id, created_at
       FROM cars WHERE id = ?`,
      [req.params.id]
    );
    res.json({ status: 'OK', data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM cars WHERE id = ?', [req.params.id]);
    res.json({ status: 'OK', message: 'Car deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

module.exports = router;
