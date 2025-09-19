import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCoursePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setSaving(true);
    setError('');
    try {
      const sid = sessionStorage.getItem('studentId');
      const res = await fetch('http://localhost:8000/api/courses/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Title: title, Description: description, TeacherID: sid })
      });
      if (res.ok) {
        navigate('/dashboard');
      } else {
        setError('Failed to create course.');
      }
    } catch {
      setError('Failed to create course.');
    }
    setSaving(false);
  };

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2vw' }}>
      <div style={{ background: '#232a3b', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '2rem 1.2rem 1.5rem 1.2rem', maxWidth: 420, width: '100%', color: '#fff' }}>
        <h2 style={{ color: '#4f8cff', fontWeight: 700, fontSize: '1.7rem', marginBottom: 18, textAlign: 'center' }}>Create Course</h2>
        <label style={{ fontWeight: 600, marginBottom: 8 }}>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: 16, borderRadius: 6, border: '1px solid #4f8cff', fontSize: '1rem' }} />
        <label style={{ fontWeight: 600, marginBottom: 8 }}>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.5rem', minHeight: 100, borderRadius: 6, border: '1px solid #4f8cff', fontSize: '1rem', marginBottom: 18 }} />
        <button onClick={handleCreate} disabled={saving} style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '100%' }}>
          {saving ? 'Creating...' : 'Create Course'}
        </button>
        {error && <div style={{ color: '#ff4d4f', fontSize: '0.95em', marginTop: 8 }}>{error}</div>}
      </div>
    </section>
  );
};

export default CreateCoursePage;
