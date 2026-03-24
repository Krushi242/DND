const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple health check to verify DB connection on startup
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, company, city, inquiryType, message } = req.body;

  if (!name || !phone || !email || !company || !city || !inquiryType || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, phone, email, company, city, inquiry_type, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, phone, email, company, city, inquiryType, message]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Database Insert Error:', error);
    res.status(500).json({ 
      error: 'Failed to save contact data', 
      details: error.message,
      code: error.code 
    });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
