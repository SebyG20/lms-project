import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/courses/';

const EditCoursePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const sid = sessionStorage.getItem('studentId');
      // Send TeacherID for teacher, AdminID for admin (both use StudentID)
      const payload = { Title: title, Description: description, TeacherID: sid };
      const res = await fetch(`http://localhost:8000/api/courses/${id}/edit/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        navigate(`/courses/${id}`);
      } else {
        setError('Failed to save changes.');
      }
    } catch {
      setError('Failed to save changes.');
    }
    setSaving(false);
  };

  if (loading) return <section><h2>Loading...</h2></section>;
  if (error) return <section><h2>{error}</h2></section>;

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2vw' }}>
      <div style={{ background: '#232a3b', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: '2rem 1.2rem 1.5rem 1.2rem', maxWidth: 420, width: '100%', color: '#fff' }}>
        <h2 style={{ color: '#ffb347', fontWeight: 700, fontSize: '1.7rem', marginBottom: 18, textAlign: 'center' }}>Edit Course</h2>
        <label style={{ fontWeight: 600, marginBottom: 8 }}>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: 16, borderRadius: 6, border: '1px solid #4f8cff', fontSize: '1rem' }} />
        <label style={{ fontWeight: 600, marginBottom: 8 }}>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.5rem', minHeight: 100, borderRadius: 6, border: '1px solid #4f8cff', fontSize: '1rem', marginBottom: 18 }} />
        <button onClick={handleSave} disabled={saving} style={{ background: '#ffb347', color: '#232a3b', border: 'none', borderRadius: 6, padding: '0.7rem 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '100%' }}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        {error && <div style={{ color: '#ff4d4f', fontSize: '0.95em', marginTop: 8 }}>{error}</div>}
      </div>
    </section>
  );
};

export default EditCoursePage;
