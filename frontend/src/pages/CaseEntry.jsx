import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  caseNumber: '',
  title: '',
  status: '',
  nextHearingDate: '',
  judgmentDate: '',
  notes: '',
  magistrateEmail: '',
  accusedEmail: '',
  reporterEmail: ''
};

const CaseEntry = () => {
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('http://localhost:5000/api/cases/add', form);
      setSuccess('Case added successfully.');
      setForm(initialState);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add case.');
    }
  };

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 className="mb-4 text-success" style={{ fontWeight: 700 }}>New Case Entry</h2>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Case Number</label>
            <input
              type="text"
              className="form-control"
              name="caseNumber"
              value={form.caseNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Judgment Delivered">Judgment Delivered</option>
              <option value="Public">Public</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Next Hearing Date</label>
            <input
              type="date"
              className="form-control"
              name="nextHearingDate"
              value={form.nextHearingDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Judgment Date</label>
            <input
              type="date"
              className="form-control"
              name="judgmentDate"
              value={form.judgmentDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Magistrate Email</label>
            <input
              type="email"
              className="form-control"
              name="magistrateEmail"
              value={form.magistrateEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Accused Email</label>
            <input
              type="email"
              className="form-control"
              name="accusedEmail"
              value={form.accusedEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Reporter Email</label>
            <input
              type="email"
              className="form-control"
              name="reporterEmail"
              value={form.reporterEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              Add Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseEntry;