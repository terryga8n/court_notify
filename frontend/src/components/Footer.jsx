import React from 'react';
import './Login.css';

const Footer = () => (
  <footer className="footer-green text-white pt-4 pb-2 mt-auto">
    <div className="container">
      <div className="row">
        {/* Left */}
        <div className="col-md-4 mb-3">
          <div className="footer-section-title">Court Notify</div>
          <div style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Court Notify is a notification and management system for the Judicial Service Commission, enabling users to receive, track, and manage court notifications efficiently and securely.
          </div>
        </div>
        {/* Center */}
        <div className="col-md-4 mb-3">
          <div className="footer-section-title">Navigation</div>
          <ul className="list-unstyled" style={{ fontSize: '0.97rem', lineHeight: 2 }}>
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/login" className="footer-link">Login</a></li>
            <li><a href="/signup" className="footer-link">Sign Up</a></li>
            <li><a href="/notifications" className="footer-link">Notifications</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
          </ul>
        </div>
        {/* Right */}
        <div className="col-md-4 mb-3 footer-contact">
          <div className="footer-section-title">Contact Us</div>
          <span className="contact-label">Address</span>
          <span className="contact-value">12 Josiah Chinamano Avenue<br />Harare, Zimbabwe</span>
          <div className="footer-divider"></div>
          <span className="contact-label">Contact Phone Numbers</span>
          <span className="contact-value">(024) 270 4118<br />(024) 270 0200</span>
        </div>
      </div>
    </div>
    <div className="footer-bottom text-center mt-3" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
   &copy;  JOY SVUURE  &nbsp; | &nbsp; Terms & Conditions &nbsp; | &nbsp; Privacy Policy
    </div>
  </footer>
);

export default Footer;