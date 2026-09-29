// server.js
const express = require('express');
const { pool } = require('./db');
const path = require('path');

const app = express();
app.use(express.json());
app.use(require('cors')());

// GET /pengeluaran
app.get('/pengeluaran', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, judul, nominal, tanggal, kategori.nama AS kategori FROM pengeluaran LEFT JOIN kategori ON pengeluaran.id_kategori = kategori.id ORDER BY tanggal DESC, id DESC'
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ pesan: 'Gagal mengambil pengeluaran' });
  }
});

// GET /pengeluaran/:id
app.get('/pengeluaran/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT pengeluaran.*, kategori.nama AS kategori FROM pengeluaran LEFT JOIN kategori ON pengeluaran.id_kategori = kategori.id WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ pesan: 'Pengeluaran tidak ditemukan' });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ pesan: 'Gagal mengambil pengeluaran' });
  }
});

// POST /pengeluaran
app.post('/pengeluaran', async (req, res) => {
  const { judul, nominal, id_kategori } = req.body;
  if (!judul || !nominal) return res.status(400).json({ pesan: 'Judul dan nominal wajib diisi' });
  try {
    const [result] = await pool.query(
      'INSERT INTO pengeluaran (judul, nominal, id_kategori) VALUES (?, ?, ?)',
      [judul, nominal, id_kategori || null]
    );
    const [rows] = await pool.query('SELECT id, judul, nominal FROM pengeluaran WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ pesan: 'Gagal menambah pengeluaran' });
  }
});

// PUT /pengeluaran/:id
try {
  app.put('/pengeluaran/:id', async (req, res) => {
    const { judul, nominal } = req.body;
    if (!judul || !nominal) return res.status(400).json({ pesan: 'Judul dan nominal wajib diisi' });
    try {
      const [result] = await pool.query(
        'UPDATE pengeluaran SET judul = ?, nominal = ? WHERE id = ?',
        [judul, nominal, req.params.id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ pesan: 'Pengeluaran tidak ditemukan' });
      const [rows] = await pool.query('SELECT id, judul, nominal FROM pengeluaran WHERE id = ?', [req.params.id]);
      res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ pesan: 'Gagal mengubah pengeluaran' });
    }
  });
} catch (e) {
  console.error('Gagal mendefinisikan PUT /pengeluaran/:id:', e);
}

// DELETE /pengeluaran/:id
try {
  app.delete('/pengeluaran/:id', async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM pengeluaran WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ pesan: 'Pengeluaran tidak ditemukan' });
      res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ pesan: 'Gagal menghapus pengeluaran' });
    }
  });
} catch (e) {
  console.error('Gagal mendefinisikan DELETE /pengeluaran/:id:', e);
}

// GET /kategori
app.get('/kategori', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nama FROM kategori ORDER BY nama');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ pesan: 'Gagal mengambil kategori' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});