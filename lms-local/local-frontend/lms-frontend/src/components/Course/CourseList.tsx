// CourseList.tsx
// This component displays a list of all available courses.
// Teachers and admins can delete courses from here.

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Type for course data from backend
type Course = {
  CourseID: number;
  Title: string;
  Description: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_URL = `${API_BASE}/api/courses/`;

interface CourseListProps {
  useShortDescriptions?: boolean;
}

const CourseList: React.FC<CourseListProps> = () => {
  // State for current user's role
  const [role, setRole] = useState<string | null>(null);
  // State for all courses
  const [courses, setCourses] = useState<Course[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error message
  const [error, setError] = useState<string | null>(null);
  // State for delete modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // State for course to delete
  const [deleteCourseId, setDeleteCourseId] = useState<number | null>(null);
  const [deleteCourseTitle, setDeleteCourseTitle] = useState<string>('');

  // Fetch current user's role on mount
  useEffect(() => {
    const sid = sessionStorage.getItem('studentId');
    if (sid) {
  fetch(`${API_BASE}/api/students/${sid}/`)
        .then(res => res.ok ? res.json() : null)
        .then(data => setRole(data?.Role || null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, []);

  // Fetch all courses on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /**
   * Opens the delete modal for a course.
   */
  const handleDeleteClick = (courseId: number, title: string) => {
    setDeleteCourseId(courseId);
    setDeleteCourseTitle(title);
    setShowDeleteModal(true);
  };

  /**
   * Confirms course deletion and removes course from backend and UI.
   */
  const handleConfirmDelete = async () => {
    if (deleteCourseId == null) return;
    const sid = sessionStorage.getItem('studentId');
  const res = await fetch(`${API_BASE}/api/courses/${deleteCourseId}/delete/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ TeacherID: sid })
    });
    if (res.ok) {
      setCourses(courses.filter(c => c.CourseID !== deleteCourseId));
      setShowDeleteModal(false);
    } else {
      alert('Failed to delete course.');
    }
  };

  // Render loading/error states and course list
  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="course-list">
      {/* Page title */}
      <h2 className="course-list-title">Available Courses</h2>
      <div className="course-grid">
        {courses.length === 0 ? (
          <div>No courses found.</div>
        ) : (
          courses.map(course => (
            <div className="course-card" key={course.CourseID}>
              <h3>{course.Title}</h3>
              {/* Link to course details */}
              <Link className="course-link" to={`/courses/${course.CourseID}`}>View Course</Link>
              {/* Delete button for teachers/admins */}
              {(role === 'teacher' || role === 'admin') && (
                <button
                  style={{
                    background: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0.5rem 1rem',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: 10,
                  }}
                  onClick={() => handleDeleteClick(course.CourseID, course.Title)}
                >Delete</button>
              )}
            </div>
          ))
        )}
      </div>
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#232a3b',
            borderRadius: 12,
            padding: '2rem 2.5rem',
            boxShadow: '0 4px 24px #0004',
            color: '#fff',
            minWidth: 320,
            textAlign: 'center',
          }}>
            <h3 style={{ marginBottom: 16 }}>Delete Course</h3>
            <p style={{ marginBottom: 24 }}>
              Are you sure you want to delete <span style={{ fontWeight: 700 }}>{deleteCourseTitle}</span>?
              <br />This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button
                style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                onClick={handleConfirmDelete}
              >Delete</button>
              <button
                style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => setShowDeleteModal(false)}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component for use in dashboard/pages
export default CourseList;
