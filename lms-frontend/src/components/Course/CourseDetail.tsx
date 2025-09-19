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

  // Helper to check enrollment status from sessionStorage
  const checkEnrollment = React.useCallback(() => {
    if (!course) return;
    const stored = sessionStorage.getItem('enrolledCourses');
    let enrolled = stored ? JSON.parse(stored) : [];
    setIsEnrolled(enrolled.some((c: any) => c.CourseID === course.CourseID));
  }, [course]);

  // Check enrollment on mount and when course changes
  useEffect(() => {
    checkEnrollment();
  }, [course, checkEnrollment]);

  // Listen for sessionStorage changes (from other tabs/pages)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'enrolledCourses') {
        checkEnrollment();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [checkEnrollment]);

  const username = sessionStorage.getItem('username');
  const [studentId, setStudentId] = useState<string | null>(sessionStorage.getItem('studentId'));
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    // Fetch role from backend if logged in
    const sid = sessionStorage.getItem('studentId');
    if (sid) {
      fetch(`http://localhost:8000/api/students/${sid}/`)
        .then(res => res.ok ? res.json() : null)
        .then(data => setRole(data?.Role || null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, [studentId]);

  // Listen for login and update studentId from sessionStorage
  useEffect(() => {
    const sync = () => setStudentId(sessionStorage.getItem('studentId'));
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const [enrollError, setEnrollError] = useState('');
  const handleEnroll = async () => {
    setEnrollError('');
    const currentStudentId = sessionStorage.getItem('studentId');
    setStudentId(currentStudentId);
    if (!username || !currentStudentId || !course) {
      setEnrollError('You must be logged in to enroll.');
      return;
    }
    setEnrolling(true);
    let enrollments = '';
    try {
      const res = await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`);
      const data = await res.json();
      enrollments = data.Enrollments || '';
    } catch (err) {
      setEnrollError('Failed to fetch enrollments.');
      setEnrolling(false);
      return;
    }
    const ids = enrollments ? enrollments.split(',').map((id: string) => id.trim()).filter(Boolean) : [];
    if (!ids.includes(String(course.CourseID))) {
      ids.push(String(course.CourseID));
    }
    try {
      const res = await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Enrollments: ids.join(',') })
      });
      if (res.ok) {
        let enrolled = [];
        try {
          enrolled = JSON.parse(sessionStorage.getItem('enrolledCourses') || '[]');
        } catch {}
        if (course && !enrolled.some((c: any) => c.CourseID === course.CourseID)) {
          enrolled.push({ CourseID: course.CourseID, Title: course.Title, Description: course.Description });
          sessionStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
        }
        setIsEnrolled(true);
      } else {
        setEnrollError('Failed to enroll.');
      }
    } catch (err) {
      setEnrollError('Failed to enroll.');
    }
    setEnrolling(false);
  };

  const handleCancelEnrollment = async () => {
    setEnrollError('');
    const currentStudentId = sessionStorage.getItem('studentId');
    setStudentId(currentStudentId);
    if (!username || !currentStudentId || !course) {
      setEnrollError('You must be logged in to cancel enrollment.');
      return;
    }
    setEnrolling(true);
    let enrollments = '';
    try {
      const res = await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`);
      const data = await res.json();
      enrollments = data.Enrollments || '';
    } catch (err) {
      setEnrollError('Failed to fetch enrollments.');
      setEnrolling(false);
      return;
    }
    let ids = enrollments ? enrollments.split(',').map((id: string) => id.trim()).filter(Boolean) : [];
    ids = ids.filter((id: string) => id !== String(course.CourseID));
    try {
      const res = await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Enrollments: ids.join(',') })
      });
      if (res.ok) {
        let enrolled = [];
        try {
          enrolled = JSON.parse(sessionStorage.getItem('enrolledCourses') || '[]');
        } catch {}
        enrolled = enrolled.filter((c: any) => c.CourseID !== course.CourseID);
        sessionStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
        setIsEnrolled(false);
      } else {
        setEnrollError('Failed to cancel enrollment.');
      }
    } catch (err) {
      setEnrollError('Failed to cancel enrollment.');
    }
    setEnrolling(false);
  };

  // Fetch latest enrollments from backend for student
  useEffect(() => {
    if (!course || !studentId) return;
    fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`)
      .then(res => res.json())
      .then(data => {
        const ids = (data.Enrollments || '').split(',').map((id: string) => id.trim()).filter(Boolean);
        setIsEnrolled(ids.includes(String(course.CourseID)));
      })
      .catch(() => setIsEnrolled(false));
  }, [course, studentId]);

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
          ) : role === 'teacher' ? (
            <button
              onClick={() => navigate(`/courses/${course.CourseID}/edit`)}
              style={{
                background: '#ffb347',
                color: '#232a3b',
                border: 'none',
                borderRadius: 6,
                padding: '0.7rem 0',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                minWidth: 120,
                boxShadow: '0 1px 4px #0002',
                width: '100%',
                marginBottom: 0,
              }}
            >
              Edit Course
            </button>
          ) : (
            <>
              {isEnrolled ? (
                <button
                  onClick={handleCancelEnrollment}
                  disabled={enrolling}
                  style={{
                    background: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0.7rem 0',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    cursor: enrolling ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                    minWidth: 120,
                    boxShadow: '0 1px 4px #0002',
                    width: '100%',
                    marginBottom: 0,
                  }}
                >
                  {enrolling ? 'Cancelling...' : 'Cancel Enrollment'}
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  style={{
                    background: enrolling
                      ? 'linear-gradient(90deg, #00ff00 50%, #000 50%)'
                      : '#4f8cff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0.7rem 0',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    cursor: enrolling ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                    minWidth: 120,
                    boxShadow: '0 1px 4px #0002',
                    width: '100%',
                    marginBottom: 0,
                  }}
                >
                  {enrolling ? 'Enrolling...' : 'Enroll'}
                </button>
              )}
              {enrollError && (
                <div style={{ color: '#ff4d4f', fontSize: '0.95em', marginTop: 8 }}>{enrollError}</div>
              )}
            </>
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
