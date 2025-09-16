

// Register.tsx
// This component renders a registration form for new users.
// It includes password validation, an autofill button for testing, and a button to navigate to the login page.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Register functional component
const Register = () => {
  // React Router's navigation hook
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password validation: at least 8 chars, one number, one special char, one uppercase
  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  // Error message for password
  const passwordError =
    password.length === 0
      ? ''
      : passwordValid
      ? ''
      : 'Password must be at least 8 characters, include a number, a special character, and a capital letter.';

  // Handler to auto-fill for register tests
  const handleAutoFill = () => {
    setName('Test');
    setEmail('Test@gmail.com');
    setPassword('Test123!');
  };

  // Handler for form submission
  // Saves username to sessionStorage and navigates to profile
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('username', name); // Save username for profile
    window.dispatchEvent(new Event('storage')); // Update Navbar
    navigate('/profile'); // Redirect to profile page
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {/* Heading for the registration form */}
      <h2>Register</h2>

      {/* Name input field */}
      <input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ border: passwordError ? '2px solid #ff4d4f' : undefined }}
      />

      {/* Password error message */}
      {passwordError && (
        <div style={{ color: '#ff4d4f', fontSize: '0.95em', marginBottom: 8 }}>{passwordError}</div>
      )}

      {/* Register button */}
      <button type="submit" disabled={!passwordValid}>Register</button>

      {/* Auto Fill button for test data */}
      <button
        type="button"
        style={{ marginLeft: '1rem', background: '#e0e0e0', color: '#232a3b', border: '1px solid #ccc', fontWeight: 500 }}
        onClick={handleAutoFill}
      >
        Auto Fill
      </button>

      {/* Button to navigate to login page */}
      <button
        type="button"
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
          marginTop: 24,
          transition: 'background 0.2s',
        }}
        onClick={() => navigate('/login')}
      >
        Already have an account? Log in!
      </button>
    </form>
  );
};

// Export the Register component as default
export default Register;
