

// Login.tsx
// This component renders the login form for users to enter their credentials.
// It displays an error message for invalid login attempts and provides a button to navigate to registration.

import React, { useState } from 'react';

/**
 * Login component
 * Handles user login, error display, and navigation to registration.
 */
const Login = () => {
  // State to control the visibility of the error message
  const [showError, setShowError] = useState(false);

  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles login form submission and authentication.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password })
      });
      if (!response.ok) {
        setShowError(true);
        return;
      }
      const data = await response.json();
      // Save username and student info to sessionStorage
      sessionStorage.setItem('username', data.Name);
      sessionStorage.setItem('studentId', data.StudentID);
      window.location.replace('/profile');
    } catch {
      setShowError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Heading for the login form */}
      <h2>Login</h2>

      {/* Email input field */}
      <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />

      {/* Password input field with show/hide button */}
      <div style={{ position: 'relative', marginBottom: 12, width: '100%' }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            paddingRight: 60,
            height: 40,
            borderRadius: 6,
            border: '1px solid #222',
            background: '#181c23',
            color: '#fff',
            fontSize: 16,
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(v => !v)}
          style={{
            position: 'absolute',
            right: 16,
            top: 0,
            height: '100%',
            background: 'none',
            color: '#5b8cff',
            border: 'none',
            borderRadius: 0,
            padding: 0,
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: 'none',
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >{showPassword ? 'Hide' : 'Show'}</button>
      </div>

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
