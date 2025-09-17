import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

type Course = {
  CourseID: number;
  Title: string;
  Description: string;
};

const API_URL = 'http://localhost:8000/api/courses/';

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_URL}${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Course not found');
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!course) return;
    const stored = sessionStorage.getItem('enrolledCourses');
    let enrolled = stored ? JSON.parse(stored) : [];
    setIsEnrolled(enrolled.some((c: any) => c.CourseID === course.CourseID));
  }, [course]);

  const username = sessionStorage.getItem('username');

  const handleEnroll = () => {
    if (!username) return;
    setEnrolling(true);
    setTimeout(() => {
      const stored = sessionStorage.getItem('enrolledCourses');
      let enrolled = stored ? JSON.parse(stored) : [];
      if (course && !enrolled.some((c: any) => c.CourseID === course.CourseID)) {
        enrolled.push({ CourseID: course.CourseID, Title: course.Title, Description: course.Description });
        sessionStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      }
      setIsEnrolled(true);
      setEnrolling(false);
    }, 400);
  };

  if (loading) return <section><h2>Loading...</h2></section>;
  if (error || !course) return <section><h2>Course Not Found</h2></section>;

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2vw' }}>
      <div
        style={{
          background: '#232a3b',
          borderRadius: 16,
          boxShadow: '0 4px 24px #0002',
          padding: '2rem 1.2rem 1.5rem 1.2rem',
          maxWidth: 420,
          width: '100%',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: 38, marginBottom: 8 }}>📚</span>
          <h2 style={{ color: '#4f8cff', fontWeight: 700, fontSize: '1.7rem', marginBottom: 10, textAlign: 'center', width: '100%' }}>{course.Title}</h2>
        </div>
        <div style={{ width: '100%', marginBottom: 28 }}>
          <span style={{ whiteSpace: 'pre-line', color: '#fff', fontSize: '0.92rem', lineHeight: 1.5 }}>
            {course.Description || 'No description available.'}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {!username ? (
            <div style={{
              background: '#181c23',
              color: '#ff4d4f',
              borderRadius: 6,
              padding: '1rem',
              marginBottom: 12,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}>
              You need to register or login into your account before you can enroll
            </div>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={isEnrolled || enrolling}
              style={{
                background: enrolling
                  ? 'linear-gradient(90deg, #00ff00 50%, #000 50%)'
                  : isEnrolled
                  ? '#aaa'
                  : '#4f8cff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.7rem 0',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: isEnrolled ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                minWidth: 120,
                boxShadow: '0 1px 4px #0002',
                width: '100%',
                marginBottom: 0,
              }}
            >
              {enrolling ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll'}
            </button>
          )}
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: '#181c23',
              color: '#fff',
              border: '2px solid #4f8cff',
              borderRadius: 6,
              padding: '0.7rem 0',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 120,
              boxShadow: '0 1px 4px #0002',
              width: '100%',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
