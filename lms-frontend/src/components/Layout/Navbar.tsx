// Navbar.tsx
// This component renders the top navigation bar for Cyber College.
// It provides quick links to the main sections of the app: Home, Dashboard, Register, Profile, and Support.

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * Navbar component
 * Displays navigation links and updates when user logs in/out.
 * Responsive for mobile and desktop.
 */
const Navbar = () => {
  // State to trigger re-render when sessionStorage changes
  const [hasProfile, setHasProfile] = useState(() => typeof window !== 'undefined' && !!sessionStorage.getItem('username'));

  useEffect(() => {
    // Listen for sessionStorage changes and update hasProfile
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
        width: '100vw',
        background: '#23293a',
        padding: '20px 16px 10px 16px',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        minHeight: 60,
        position: 'relative',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        overflowX: 'auto',
      }}
    >
      {/* Main navigation links including Support */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 20, minWidth: 0, flexWrap: 'wrap' }}>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.15em', marginRight: 20, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Home</Link>
        <Link to="/dashboard" style={{ marginRight: 20, color: '#bfcfff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Dashboard</Link>
        {!hasProfile && <Link to="/register" style={{ marginRight: 20, color: '#bfcfff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Register</Link>}
        {hasProfile && <Link to="/profile" style={{ marginRight: 20, color: '#bfcfff', textDecoration: 'none', whiteSpace: 'nowrap' }}>Profile</Link>}
        <Link to="/support" style={{ fontWeight: 600, color: '#5b8cff', fontSize: '1.08em', textDecoration: 'none', marginLeft: 0, whiteSpace: 'nowrap' }}>Support</Link>
      </div>
      {/* Responsive styles for mobile and hover effect for nav links */}
      <style>{`
        nav a {
          transition: color 0.18s;
        }
        nav a:hover {
          color: #4f8cff !important;
        }
        @media (max-width: 600px) {
          nav {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 12px 2vw 6px 2vw !important;
            width: 100vw !important;
            min-width: 0 !important;
            overflow-x: hidden !important;
          }
          nav > div {
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            gap: 10px !important;
            width: 100vw !important;
            min-width: 0 !important;
          }
          nav a {
            font-size: 15px !important;
            margin: 0 0 0 0 !important;
            padding: 6px 4px !important;
            display: inline-block !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </nav>
  );
};

// Export the Navbar component for use in the app layout
export default Navbar;
