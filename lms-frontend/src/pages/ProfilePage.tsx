// ProfilePage.tsx
// This page displays the student's profile and a list of their enrolled courses (mock data for now).
import React, { useState } from "react";

// Import the course data array to get short descriptions





import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  // Get enrolled courses from localStorage
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [username] = useState(() => sessionStorage.getItem('username') || '');
  const studentId = sessionStorage.getItem('studentId');

  // Redirect to register if not registered
  const navigate = useNavigate();
  useEffect(() => {
    if (!username || !studentId) {
      navigate('/register');
      return;
    }
    setEnrolledCourses([]); // Clear enrollments on user change
    fetchEnrollments(); // Fetch enrollments for the current user
  }, [username, studentId, navigate]);

  // Listen for changes to enrolled courses (in case user enrolls in another tab)
  const fetchEnrollments = () => {
    if (!studentId) return;
    fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`)
      .then(res => res.json())
      .then(data => {
        const ids = (data.Enrollments || '').split(',').map((id: string) => id.trim()).filter(Boolean);
        if (ids.length === 0) {
          setEnrolledCourses([]);
          return;
        }
        Promise.all(ids.map((id: string) =>
          fetch(`http://localhost:8000/api/courses/${id}/`).then(res => res.ok ? res.json() : null)
        )).then(courses => setEnrolledCourses(courses.filter(Boolean)));
      })
      .catch(() => setEnrolledCourses([]));
  };

  useEffect(() => {
    fetchEnrollments();
  }, [studentId]);



  // Handler to cancel enrollment
  const handleCancel = async (CourseID: number) => {
    if (!studentId) return;
    const updated = enrolledCourses.filter((c: any) => c.CourseID !== CourseID);
    const updatedIds = updated.map((c: any) => c.CourseID).join(',');
    await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Enrollments: updatedIds })
    });
    fetchEnrollments();
  };

  // Handler for logout
  const handleLogout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <div
      className="profile-container"
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        color: "#fff",
        background: '#232a3b',
        borderRadius: 12,
        boxShadow: '0 4px 24px #0002',
        padding: '2.5rem 2rem',
        width: '95vw',
        minWidth: 0,
      }}
    >
      {/* User avatar, username, and logout button in a clean row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2.5rem',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '1 1 200px',
            minWidth: 0,
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <img
            src="https://api.dicebear.com/7.x/thumbs/svg?seed="
            style={{ width: 72, height: 72, borderRadius: '50%', background: '#232a3b', border: '3px solid #4f8cff', minWidth: 72 }}
            alt="User Avatar"
          />
          <h2
            style={{
              margin: 0,
              color: '#4f8cff',
              fontWeight: 700,
              fontSize: '2rem',
              wordBreak: 'break-word',
              minWidth: 0,
            }}
          >
            {username}
          </h2>
        </div>
        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            background: '#232a3b',
            color: '#fff',
            border: '2px solid #4f8cff',
            borderRadius: 6,
            padding: '0.6rem 1.4rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background 0.2s',
            marginTop: 8,
            flex: '0 0 auto',
            width: '100%',
            maxWidth: 180,
          }}
        >
          Log Out
        </button>
      </div>
      <h3 style={{ color: '#4f8cff', marginBottom: '1.5rem', fontWeight: 700 }}>Enrolled Courses</h3>
      {enrolledCourses.length === 0 ? (
        <p style={{ color: '#ccc', fontSize: '1.1rem' }}>You haven't enrolled in any courses yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {enrolledCourses.map((course: any) => (
            <div
              key={course.CourseID}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                background: '#181c23',
                borderRadius: 8,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 2px 8px #0001',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ fontSize: '1.15rem', color: '#fff', wordBreak: 'break-word' }}>{course.Title}</strong>
              </div>
              <button
                onClick={() => handleCancel(course.CourseID)}
                style={{
                  minWidth: 140,
                  width: '100%',
                  maxWidth: 200,
                  background: '#ff4d4f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.7rem 0',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px #0002',
                  transition: 'background 0.2s',
                  marginLeft: 0,
                  marginTop: 8,
                  alignSelf: 'flex-end',
                }}
              >
                Cancel Enrollment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;