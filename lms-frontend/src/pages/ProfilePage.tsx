import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [username] = useState(() => sessionStorage.getItem('username') || '');
  const userId = sessionStorage.getItem('studentId');
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !userId) {
      navigate('/register');
      return;
    }
    fetch(`http://localhost:8000/api/students/${userId}/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setRole(data?.Role || null))
      .catch(() => setRole(null));
  }, [username, userId, navigate]);

  useEffect(() => {
    if (role === 'teacher' || role === 'admin') {
      fetch(`http://localhost:8000/api/courses/`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(() => setCourses([]));
    } else if (role === 'student') {
      // Fetch enrolled courses for student
      fetch(`http://localhost:8000/api/students/${userId}/enrollments/`)
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
    }
  }, [role, userId]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  // Teacher: go to enrolls page for course
  const handleViewEnrollsPage = (courseId: number, courseName: string) => {
    navigate(`/courses/${courseId}/enrollments`, { state: { courseName } });
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
  {(role === 'teacher' || role === 'admin') ? (
        <>
          <h3 style={{ color: '#4f8cff', marginBottom: '1.5rem', fontWeight: 700 }}>All Courses</h3>
          {courses.length === 0 ? (
            <p style={{ color: '#ccc', fontSize: '1.1rem' }}>No courses found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {courses.map((course: any) => (
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
                    onClick={() => handleViewEnrollsPage(course.CourseID, course.Title)}
                    style={{
                      minWidth: 140,
                      width: '100%',
                      maxWidth: 200,
                      background: '#4f8cff',
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
                    View Enrolls
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : role === 'student' ? (
        <>
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
                    onClick={() => navigate(`/courses/${course.CourseID}`)}
                    style={{
                      minWidth: 140,
                      width: '100%',
                      maxWidth: 200,
                      background: '#4f8cff',
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
                    View Course
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Unknown user role.</p>
      )}
    </div>
  );
};

export default ProfilePage;
