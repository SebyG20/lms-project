// CreateCoursePage.tsx
// This page allows teachers and admins to create a new course by entering a title and description.
// It handles form state, API submission, error handling, and navigation back to the dashboard.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCoursePage: React.FC = () => {
  // State for course title input
  const [title, setTitle] = useState('');
  // State for course description input
  const [description, setDescription] = useState('');
  // State for error message display
  const [error, setError] = useState('');
  // State for loading indicator while saving
  const [saving, setSaving] = useState(false);
  // React Router navigation hook
  const navigate = useNavigate();

  /**
   * Handles course creation by sending a POST request to the backend API.
   * If successful, navigates back to dashboard. Otherwise, displays error.
   */
  const handleCreate = async () => {
    setSaving(true);
    setError('');
    try {
      // Get current user's ID from sessionStorage
      const sid = sessionStorage.getItem('studentId');
      // Prepare payload for backend (TeacherID is always studentId)
      const payload = { Title: title, Description: description, TeacherID: sid };
      // Send POST request to backend API
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const res = await fetch(`${API_BASE}/api/courses/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        // On success, go back to dashboard
        navigate('/dashboard');
      } else {
        setError('Failed to create course.');
      }
    } catch {
      setError('Failed to create course.');
    }
    setSaving(false);
  };

  // Render the course creation form and navigation button
  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2vw' }}>
      <div style={{ background: '#232a3b', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '2rem 1.2rem 1.5rem 1.2rem', maxWidth: 420, width: '100%', color: '#fff' }}>
        {/* Page title */}
        <h2 style={{ color: '#4f8cff', fontWeight: 700, fontSize: '1.7rem', marginBottom: 18, textAlign: 'center' }}>Create Course</h2>
        {/* Title input field */}
        <label style={{ fontWeight: 600, marginBottom: 8 }}>Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: 16, borderRadius: 6, border: '1px solid #4f8cff', fontSize: '1rem' }}
          placeholder="Enter course title"
        />
        {/* Description input field */}
        <label style={{ fontWeight: 600, marginBottom: 8 }}>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', minHeight: 100, borderRadius: 6, border: '1px solid #4f8cff', fontSize: '1rem', marginBottom: 18 }}
          placeholder="Enter course description"
        />
        {/* Create button */}
        <button
          onClick={handleCreate}
          disabled={saving}
          style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '100%' }}
        >
          {saving ? 'Creating...' : 'Create Course'}
        </button>
        {/* Error message display */}
        {error && <div style={{ color: '#ff4d4f', fontSize: '0.95em', marginTop: 8 }}>{error}</div>}
        {/* Back to dashboard button */}
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            background: '#888',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.7rem 0',
            fontWeight: 700,
            fontSize: '1.08rem',
            cursor: 'pointer',
            width: '100%',
            marginTop: 14
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </section>
  );
};

export default CreateCoursePage;
