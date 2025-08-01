const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const casesRoutes = require('./routes/cases');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/api/cases', casesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const bcrypt = require('bcryptjs');
const db = require('./db/database');

const ensureAdmin = async () => {
  const existingAdmin = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@example.com');
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('adminpass', 10);
    db.prepare('INSERT INTO users (email, password, role, createdAt) VALUES (?, ?, ?, ?)').run(
      'admin@example.com',
      hashedPassword,
      'admin',
      new Date().toISOString()
    );
    console.log('✅ Default admin user created: admin@example.com / adminpass');
  } else {
    console.log('✅ Admin user already exists.');
  }
};

ensureAdmin();


app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
