import pool from './db.js';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    return res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Database Fetch Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch contacts', 
      details: error.message 
    });
  }
}
