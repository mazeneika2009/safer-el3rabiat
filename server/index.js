const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');

const carsRouter = require('./routes/cars');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/cars', carsRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Safer El3rbiat API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
