// ProfilePage.tsx
// This page displays the user's profile, including their name, role, and courses.
// Students see their enrolled courses, teachers/admins see all courses. All users can edit their profile or log out.

import React, { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  // State for all courses (for teachers/admins)
  const [courses, setCourses] = useState<any[]>([]);
  // State for enrolled courses (for students)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  // Username from sessionStorage
  const [username] = useState(() => sessionStorage.getItem('username') || '');
  // User ID from sessionStorage
  const userId = sessionStorage.getItem('studentId');
  // State for user role
  const [role, setRole] = useState<string | null>(null);
  // React Router navigation hook
  const navigate = useNavigate();

  // Fetch user role on mount
  useEffect(() => {
    if (!username || !userId) {
      // If no user info, redirect to register page
      navigate('/register');
      return;
    }
    // Fetch user data from backend
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  fetch(`${API_BASE}/api/students/${userId}/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setRole(data?.Role || null))
      .catch(() => setRole(null));
  }, [username, userId, navigate]);

  // Fetch courses based on user role
  useEffect(() => {
    if (role === 'teacher' || role === 'admin') {
      // Teachers/Admins: fetch all courses
  fetch(`${API_BASE}/api/courses/`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(() => setCourses([]));
    } else if (role === 'student') {
      // Students: fetch enrolled courses
  fetch(`${API_BASE}/api/students/${userId}/enrollments/`)
        .then(res => res.json())
        .then(data => {
          const ids = (data.Enrollments || '').split(',').map((id: string) => id.trim()).filter(Boolean);
          if (ids.length === 0) {
            setEnrolledCourses([]);
            return;
          }
          // Fetch course details for each enrolled course
          Promise.all(ids.map((id: string) =>
            fetch(`${API_BASE}/api/courses/${id}/`).then(res => res.ok ? res.json() : null)
          )).then(courses => setEnrolledCourses(courses.filter(Boolean)));
        })
        .catch(() => setEnrolledCourses([]));
    }
  }, [role, userId]);

  /**
   * Logs out the user by clearing sessionStorage and navigating to home.
   */
  const handleLogout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  /**
   * Navigates to the enrollments page for a given course (for teachers/admins).
   */
  const handleViewEnrollsPage = (courseId: number, courseName: string) => {
    navigate(`/courses/${courseId}/enrollments`, { state: { courseName } });
  };

  // Render the profile page UI
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
      {/* User info and actions */}
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
          {/* User avatar and name */}
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
        {/* Edit profile and logout buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', flex: '0 0 auto', width: '100%', maxWidth: 180 }}>
          <button
            onClick={() => navigate('/edit-profile')}
            style={{
              background: '#4f8cff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.6rem 1.4rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background 0.2s',
              marginTop: 8,
              width: '100%',
              maxWidth: 180,
            }}
          >
            Edit Profile
          </button>
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
              marginTop: 0,
              width: '100%',
              maxWidth: 180,
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      {/* Courses section for teachers/admins */}
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
          {/* Courses section for students */}
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
