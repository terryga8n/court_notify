import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import jscLogo from '../assets/jsc.jpg';
import './Login.css';

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data.user);
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-bg d-flex flex-column min-vh-100"style={{ background: '#fff' }}>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            {/* Left: Login Form */}
            <div className="col-lg-5 col-md-7 d-flex align-items-center justify-content-center">
              <div className="login-card">
                <h4 className="fw-bold mb-4 text-start" style={{ color: '#222' }}>Sign In Form</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <span className="input-icon">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="Email or EC Number"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <span className="input-icon">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control ps-5"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-2">
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    onClick={() => navigate('/signup')}
                  >
                    Create Account
                  </button>
                </form>
                <div className="mt-3 text-start">
                  <span className="form-text">
                    Forgot your password?{' '}
                    <a href="#" style={{ color: '#008040', textDecoration: 'underline' }}>
                      Recover it Now.
                    </a>
                  </span>
                </div>
              </div>
            </div>
            {/* Right: Logo */}
            <div className="col-lg-5 col-5 d-flex align-items-center justify-content-center login-logo-col p-0" style={{ background: '#fff', minHeight: '100vh', minWidth: '100vh' }}>
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <img
                  src={jscLogo}
                  alt="JSC Logo"
                  className="img-fluid"
                  style={{
                    width: '70%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
