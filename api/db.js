import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 21434,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
