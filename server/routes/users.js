const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'safer_el3rbiat_secret_2024';

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ status: 'ERROR', message: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role || 'user']
    );
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [result.insertId]
    );
    const user = rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ status: 'OK', data: { user, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ status: 'ERROR', message: 'Invalid credentials' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ status: 'ERROR', message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user;
    res.json({ status: 'OK', data: { user: safeUser, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ status: 'ERROR', message: 'User not found' });
    }
    res.json({ status: 'OK', data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.get('/:id/cars', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, brand AS make, model, year, price, fuel_type, transmission,
              image_url, description, status, user_id, created_at
       FROM cars WHERE user_id = ? ORDER BY created_at DESC`,
      [req.params.id]
    );
    res.json({ status: 'OK', data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name=?, email=? WHERE id=?',
      [name, email, req.params.id]
    );
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    res.json({ status: 'OK', data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
});

module.exports = router;
