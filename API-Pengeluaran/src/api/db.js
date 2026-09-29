// db.js
const mysql = require('mysql2/promise');
require('dotenv/config');

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// uji koneksi saat server dinyalakan
try {
  const conn = await pool.getConnection();
  console.log('Terhubung ke basis data');
  conn.release();
} catch (e) {
  console.error('Gagal terhubung ke basis data:', e.message);
}