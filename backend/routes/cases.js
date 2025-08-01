const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { sendCaseUpdateEmail } = require('../utils/mailer');

// Get All Cases
// GET /api/cases?role=magistrate&email=mag@example.com
router.get('/', (req, res) => {
  const { role, email } = req.query;
  let cases;
  if (role === 'magistrate') {
    cases = db.prepare('SELECT * FROM cases WHERE magistrateEmail = ?').all(email);
  } else if (role === 'public') {
    cases = db.prepare('SELECT * FROM cases WHERE accusedEmail = ? OR reporterEmail = ?').all(email, email);
  } else {
    cases = db.prepare('SELECT * FROM cases').all();
  }
  res.json(cases);
});

// Get Case by ID
router.get('/:id', (req, res) => {
  const caseData = db.prepare('SELECT * FROM cases WHERE id = ?').get(req.params.id);
  if (caseData) {
    res.json(caseData);
  } else {
    res.status(404).json({ message: 'Case not found' });
  }
});

// Public Search by Case Number (Limited Fields)
router.get('/search/:caseNumber', (req, res) => {
  const { caseNumber } = req.params;
  const found = db.prepare('SELECT caseNumber, title, status, nextHearingDate, judgmentDate FROM cases WHERE caseNumber = ?').get(caseNumber);
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ message: 'Case not found' });
  }
});

// Clerk Adds New Case
router.post('/add', (req, res) => {
  const {
    caseNumber,
    title,
    status,
    nextHearingDate,
    judgmentDate,
    notes,
    magistrateEmail,
    accusedEmail,
    reporterEmail
  } = req.body;
  try {
    const stmt = db.prepare(`
      INSERT INTO cases (
        caseNumber, title, status, nextHearingDate, judgmentDate, notes,
        magistrateComments, magistrateEmail, accusedEmail, reporterEmail,
        createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, '', ?, ?, ?, datetime('now'), datetime('now'))
    `);
    const info = stmt.run(
      caseNumber,
      title,
      status,
      nextHearingDate,
      judgmentDate,
      notes,
      magistrateEmail,
      accusedEmail,
      reporterEmail
    );
    res.status(201).json({ success: true, case: { id: info.lastInsertRowid, caseNumber, title, status } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Clerk Updates Existing Case
router.put('/update/:id', (req, res) => {
  const {
    caseNumber,
    title,
    status,
    nextHearingDate,
    judgmentDate,
    notes,
    magistrateEmail,
    accusedEmail,
    reporterEmail
  } = req.body;
  try {
    const stmt = db.prepare(`
      UPDATE cases SET
        caseNumber = ?, title = ?, status = ?, nextHearingDate = ?, judgmentDate = ?, notes = ?,
        magistrateEmail = ?, accusedEmail = ?, reporterEmail = ?, updatedAt = datetime('now')
      WHERE id = ?
    `);
    stmt.run(
      caseNumber,
      title,
      status,
      nextHearingDate,
      judgmentDate,
      notes,
      magistrateEmail,
      accusedEmail,
      reporterEmail,
      req.params.id
    );

    // Send notification emails to all parties
    const updateDetails = `Title: ${title}\nStatus: ${status}\nNext Hearing: ${nextHearingDate}\nJudgment Date: ${judgmentDate}\nNotes: ${notes}`;
    Promise.all([
      magistrateEmail && sendCaseUpdateEmail(magistrateEmail, caseNumber, updateDetails),
      accusedEmail && sendCaseUpdateEmail(accusedEmail, caseNumber, updateDetails),
      reporterEmail && sendCaseUpdateEmail(reporterEmail, caseNumber, updateDetails)
    ]).catch(err => console.error('Email error:', err));

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Magistrate Adds or Updates Comment
router.put('/magistrate-comment/:id', (req, res) => {
  const { magistrateComments } = req.body;
  const stmt = db.prepare(`
    UPDATE cases SET magistrateComments = ?, updatedAt = datetime('now') WHERE id = ?
  `);
  const result = stmt.run(magistrateComments, req.params.id);
  if (result.changes) {
    res.json({ success: true, message: 'Comment updated successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Case not found' });
  }
});

module.exports = router;