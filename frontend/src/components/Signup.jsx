import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const initialState = {
  name: '',
  surname: '',
  email: '',
  dob: '',
  phone: '',
  password: '',
};

const validateForm = form => {
  const errors = {};
  if (!form.name || form.name.length < 3) {
    errors.name = 'Name must be at least 3 letters.';
  }
  if (!form.surname || form.surname.length < 3) {
    errors.surname = 'Surname must be at least 3 letters.';
  }
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.password || form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  if (!form.phone || !/^\d{1,12}$/.test(form.phone)) {
    errors.phone = 'Phone number must be numbers only and not exceed 12 digits.';
  }
  return errors;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await axios.post('http://localhost:5000/api/users/register', {
        email: form.email,
        password: form.password,
        role: 'public',
        name: form.name,
        surname: form.surname,
        dob: form.dob,
        phone: form.phone,
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 1500); // Redirect after 1.5s
      setForm(initialState);
      setFieldErrors({});
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh', background: '#f7f7f7' }}>
      <form
        className="signup-form bg-white rounded shadow p-5"
        style={{ width: '100%', maxWidth: 500 }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-success" style={{ fontWeight: 700 }}>Public User Sign Up</h2>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control${fieldErrors.name ? ' is-invalid' : ''}`}
            value={form.name}
            onChange={handleChange}
            required
          />
          {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Surname</label>
          <input
            type="text"
            name="surname"
            className={`form-control${fieldErrors.surname ? ' is-invalid' : ''}`}
            value={form.surname}
            onChange={handleChange}
            required
          />
          {fieldErrors.surname && <div className="invalid-feedback">{fieldErrors.surname}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control${fieldErrors.email ? ' is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
            required
          />
          {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className={`form-control${fieldErrors.phone ? ' is-invalid' : ''}`}
            value={form.phone}
            onChange={handleChange}
            required
          />
          {fieldErrors.phone && <div className="invalid-feedback">{fieldErrors.phone}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control${fieldErrors.password ? ' is-invalid' : ''}`}
            value={form.password}
            onChange={handleChange}
            required
          />
          {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
        </div>
        <button type="submit" className="btn btn-success w-100 mt-2">
          Sign Up
        </button>
        <span className="d-block mt-3" style={{ cursor: 'pointer', color: '#008040' }} onClick={() => navigate('/')}>
          Already have an account? Login
        </span>
      </form>
    </div>
  );
};

export default SignUp;
