

// Login.tsx
// This component renders the login form for users to enter their credentials.
// It displays an error message for invalid login attempts and provides a button to navigate to registration.

import React, { useState } from 'react';

// Login functional component
const Login = () => {
  // State to control the visibility of the error message
  const [showError, setShowError] = useState(false);

  // Handler for form submission
  // Always shows error since accounts are not persisted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true); // Show error message
    setTimeout(() => setShowError(false), 1500); // Hide after 1.5s
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Heading for the login form */}
      <h2>Login</h2>

      {/* Email input field */}
      <input type="email" placeholder="Email" required />

      {/* Password input field */}
      <input type="password" placeholder="Password" required />

      {/* Login button */}
      <button type="submit">Login</button>

      {/* Error message for invalid login */}
      {showError && (
        <div style={{ color: '#ff3b3b', marginTop: 12, fontWeight: 500, fontSize: 16, transition: 'opacity 0.3s' }}>
          Invalid details
        </div>
      )}

      {/* Button to navigate to registration page */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <a
          href="/register"
          style={{
            display: 'inline-block',
            background: '#5b8cff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 500,
            fontSize: 15,
            textDecoration: 'none',
            cursor: 'pointer',
            marginTop: 8,
            transition: 'background 0.2s',
          }}
        >
          Don't have an account? Make one
        </a>
      </div>
    </form>
  );
};

// Export the Login component as default
export default Login;
