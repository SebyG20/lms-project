// EditProfilePage.tsx
// This page allows any user to edit their profile information (name, email, password).
// It fetches the current user data, handles form state, password visibility toggle, error handling, and saves changes to the backend.

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const EditProfilePage: React.FC = () => {
  // Get current user's ID from sessionStorage
  const userId = sessionStorage.getItem('studentId');
  // State for form fields
  const [form, setForm] = useState({ Name: '', Email: '', Password: '' });
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error message display
  const [error, setError] = useState<string | null>(null);
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  // React Router navigation hook
  const navigate = useNavigate();

  // Fetch current user info on mount
  useEffect(() => {
    if (!userId) {
      // If no user ID, redirect to register page
      navigate('/register');
      return;
    }
    // Fetch user data from backend
    fetch(`http://localhost:8000/api/students/${userId}/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setForm({ Name: data.Name || '', Email: data.Email || '', Password: data.Password || '' });
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch user info');
        setLoading(false);
      });
  }, [userId, navigate]);

  /**
   * Handles input changes for all form fields.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission to update user profile in backend.
   * On success, navigates back to profile page. Otherwise, displays error.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:8000/api/students/${userId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate('/profile');
      } else {
        setError('Failed to update profile');
      }
    } catch {
      setError('Failed to update profile');
    }
  };

  // Render the edit profile form and navigation buttons
  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', color: '#fff', background: '#232a3b', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 2rem', width: '95vw', minWidth: 0 }}>
      {/* Page title */}
      <h2 style={{ color: '#4f8cff', fontWeight: 700, marginBottom: 24 }}>Edit Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Name input field */}
          <input
            name="Name"
            value={form.Name}
            onChange={handleChange}
            placeholder="Name"
            style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181c23', color: '#fff' }}
            required
          />
          {/* Email input field */}
          <input
            name="Email"
            value={form.Email}
            onChange={handleChange}
            placeholder="Email"
            style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181c23', color: '#fff' }}
            required
          />
          {/* Password input field with show/hide toggle */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              name="Password"
              value={form.Password}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              style={{
                width: '100%',
                padding: '8px 56px 8px 8px',
                borderRadius: 6,
                border: '1px solid #444',
                background: '#181c23',
                color: '#fff',
                boxSizing: 'border-box',
                fontSize: '1em',
              }}
              required
            />
            {/* Show/Hide password button */}
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#4f8cff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1em',
                padding: 0,
                minWidth: 40,
                height: 28,
                lineHeight: 1,
              }}
            >{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          {/* Error message display */}
          {error && <p style={{ color: '#ff4d4f', marginTop: 0 }}>{error}</p>}
          {/* Save and Cancel buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
            <button type="submit" style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Save</button>
            <button type="button" style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }} onClick={() => navigate('/profile')}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfilePage;
