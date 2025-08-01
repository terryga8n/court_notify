import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cases/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Failed to load case.'));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.put(`http://localhost:5000/api/cases/update/${id}`, form);
      setSuccess('Case updated successfully!');
      setTimeout(() => navigate('/dashboard/my-cases'), 1200);
    } catch (err) {
      setError('Update failed.');
    }
  };

  if (!form) return <div className="container py-4"><div className="alert alert-info">Loading...</div></div>;

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 className="mb-4 text-warning" style={{ fontWeight: 700 }}>Edit Case</h2>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Case Number</label>
            <input
              type="text"
              name="caseNumber"
              className="form-control"
              value={form.caseNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
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
              name="nextHearingDate"
              className="form-control"
              value={form.nextHearingDate || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Judgment Date</label>
            <input
              type="date"
              name="judgmentDate"
              className="form-control"
              value={form.judgmentDate || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Magistrate Email</label>
            <input
              type="email"
              name="magistrateEmail"
              className="form-control"
              value={form.magistrateEmail || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Accused Email</label>
            <input
              type="email"
              name="accusedEmail"
              className="form-control"
              value={form.accusedEmail || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Reporter Email</label>
            <input
              type="email"
              name="reporterEmail"
              className="form-control"
              value={form.reporterEmail || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              className="form-control"
              rows={3}
              value={form.notes || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-warning btn-lg">
              Update Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCase;