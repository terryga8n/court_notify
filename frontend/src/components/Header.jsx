import React from 'react';
import jscLogo from '../assets/jsc.jpg';

const Header = () => (
  <header className="d-flex align-items-center justify-content-between px-4 py-2" style={{
    background: '#008040',
    color: '#fff',
    width: '100%',
    minHeight: '64px',
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'
  }}>
    <h1 className="m-0" style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '1px' }}>
      Court Notification System
    </h1>
    <img
      src={jscLogo}
      alt="JSC Logo"
      style={{
        height: '48px',
        width: '48px',
        objectFit: 'contain',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)'
      }}
    />
  </header>
);

export default Header;