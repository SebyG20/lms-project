// EditCoursePage.tsx
// This page allows teachers and admins to edit an existing course's title and description.
// It fetches the course data, handles form state, error handling, and saves changes to the backend.

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_URL = `${API_BASE}/api/courses/`;

const EditCoursePage: React.FC = () => {
  // Get course ID from URL params
  const { id } = useParams();
  // React Router navigation hook
  const navigate = useNavigate();
  // State for course title input
  const [title, setTitle] = useState('');
  // State for course description input
  const [description, setDescription] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error message display
  const [error, setError] = useState('');
  // State for saving indicator
  const [saving, setSaving] = useState(false);

  // Fetch course data on mount
  useEffect(() => {
    if (!id) return;
    setLoading(true);
  fetch(`${API_URL}${id}/`)
      .then(res => res.ok ? res.json() : Promise.reject('Course not found'))
      .then(data => {
        setTitle(data.Title);
        setDescription(data.Description);
        setLoading(false);
      })
      .catch(() => {
        setError('Course not found');
        setLoading(false);
      });
  }, [id]);

  /**
   * Handles saving changes to the course by sending a PUT request to the backend API.
   * If successful, navigates back to the course detail page. Otherwise, displays error.
   */
  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      // Get current user's ID from sessionStorage
      const sid = sessionStorage.getItem('studentId');
      // Prepare payload for backend (TeacherID is always studentId)
      const payload = { Title: title, Description: description, TeacherID: sid };
      // Send PUT request to backend API
  const res = await fetch(`${API_BASE}/api/courses/${id}/edit/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        // On success, go back to course detail page
        navigate(`/courses/${id}`);
      } else {
        setError('Failed to save changes.');
      }
    } catch {
      setError('Failed to save changes.');
    }
    setSaving(false);
  };

  // Loading and error states
  if (loading) return <section><h2>Loading...</h2></section>;
  if (error) return <section><h2>{error}</h2></section>;

  // Render the edit course form
  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2vw' }}>
      <div style={{ background: '#232a3b', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '2rem 1.2rem 1.5rem 1.2rem', maxWidth: 420, width: '100%', color: '#fff' }}>
        {/* Page title */}
        <h2 style={{ color: '#ffb347', fontWeight: 700, fontSize: '1.7rem', marginBottom: 18, textAlign: 'center' }}>Edit Course</h2>
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
        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ background: '#ffb347', color: '#232a3b', border: 'none', borderRadius: 6, padding: '0.7rem 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '100%' }}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {/* Error message display */}
        {error && <div style={{ color: '#ff4d4f', fontSize: '0.95em', marginTop: 8 }}>{error}</div>}
      </div>
    </section>
  );
};

export default EditCoursePage;
