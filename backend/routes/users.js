const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcryptjs');

// Register User (Accessible by Clerk or Admin)
router.post('/register', async (req, res) => {
  const { email, password, role, name, surname, dob, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    db.prepare(
      'INSERT INTO users (email, password, role, name, surname, dob, phone, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(
      email,
      hashedPassword,
      role,
      name,
      surname,
      dob,
      phone,
      new Date().toISOString()
    );
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data.' });
  }
});

// Get All Users (Admin Access)
router.get('/', (req, res) => {
  const users = db.prepare('SELECT id, email, role, createdAt FROM users').all();
  res.json(users);
});

// Delete User (Admin Access)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  if (result.changes) {
    res.json({ message: 'User deleted.' });
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
});

module.exports = router;
