const Database = require('better-sqlite3');
const db = new Database('./db/database.sqlite');

// Create cases table
db.prepare(`
  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caseNumber TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    nextHearingDate TEXT,
    judgmentDate TEXT,
    notes TEXT,
    magistrateComments TEXT,
    magistrateEmail TEXT,
    accusedEmail TEXT,
    reporterEmail TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    name TEXT,
    surname TEXT,
    dob TEXT,
    phone TEXT,
    createdAt TEXT NOT NULL
  )
`).run();

module.exports = db;
