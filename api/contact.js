import pool from './db.js';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, company, city, inquiryType, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, phone, email, company, city, inquiry_type, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, phone, email, company, city, inquiryType, message]
    );
    
    console.log('✅ Contact saved (Serverless):', result.insertId);
    return res.status(201).json({ 
      message: 'Contact saved successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('❌ Database Insert Error:', error);
    return res.status(500).json({ 
      error: 'Failed to save contact data', 
      details: error.message 
    });
  }
}
