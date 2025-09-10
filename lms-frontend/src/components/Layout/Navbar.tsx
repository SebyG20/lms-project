// Navbar.tsx
// This component renders the top navigation bar for Cyber College.
// It provides quick links to the main sections of the app: Home, Dashboard, and Register.

// Import Link from react-router-dom to enable navigation between pages
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


// React functional component for the navigation bar
const Navbar = () => {
  // State to trigger re-render when sessionStorage changes
  const [hasProfile, setHasProfile] = useState(() => typeof window !== 'undefined' && !!sessionStorage.getItem('username'));

  useEffect(() => {
    const checkProfile = () => setHasProfile(!!sessionStorage.getItem('username'));
    window.addEventListener('storage', checkProfile);
    // Also check on mount and after registration
    checkProfile();
    return () => window.removeEventListener('storage', checkProfile);
  }, []);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: '#23293a',
        padding: '20px 16px 10px 16px',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        minHeight: 60,
        position: 'relative',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 20, minWidth: 0 }}>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.15em', marginRight: 20, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Home</Link>
        <Link to="/dashboard" style={{ marginRight: 20, color: '#bfcfff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Dashboard</Link>
        {!hasProfile && <Link to="/register" style={{ marginRight: 20, color: '#bfcfff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Register</Link>}
        {hasProfile && <Link to="/profile" style={{ marginRight: 20, color: '#bfcfff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Profile</Link>}
      </div>
      <div style={{ marginLeft: 4, flexShrink: 0 }}>
        <Link to="/support" style={{ fontWeight: 600, color: '#5b8cff', fontSize: '1.08em', textDecoration: 'none', marginLeft: 0, whiteSpace: 'nowrap' }}>Support</Link>
      </div>

      {/* Responsive styles for mobile */}
      <style>{`
        @media (max-width: 600px) {
          nav {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 12px 2vw 6px 2vw !important;
          }
          nav > div {
            justify-content: flex-start !important;
            gap: 10px !important;
          }
          nav a {
            font-size: 15px !important;
            margin: 0 0 0 0 !important;
            padding: 6px 4px !important;
            display: inline-block !important;
          }
          nav > div:last-child {
            margin-right: 0 !important;
            margin-left: 0 !important;
            align-self: flex-end !important;
          }
        }
      `}</style>
    </nav>
  );
};

// Export the Navbar component so it can be used in the app layout
export default Navbar;
