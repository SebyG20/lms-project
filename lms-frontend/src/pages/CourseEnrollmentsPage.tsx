
// CourseEnrollmentsPage.tsx
// This page displays all students enrolled in a specific course.
// Teachers and admins can terminate enrollments from here.

import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CourseEnrollmentsPage: React.FC = () => {
  // Get course ID from URL params
  const { course_id } = useParams<{ course_id: string }>();
  // Get course name from navigation state
  const location = useLocation();
  const navigate = useNavigate();
  const courseName = location.state?.courseName || '';
  // State for enrolled students
  const [students, setStudents] = useState<any[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for current user's role
  const [role, setRole] = useState<string | null>(null);

  // Fetch current user's role on mount
  useEffect(() => {
    const sid = sessionStorage.getItem('studentId');
    if (sid) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  fetch(`${API_BASE}/api/students/${sid}/`)
        .then(res => res.ok ? res.json() : null)
        .then(data => setRole(data?.Role || null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, []);

  // Fetch students enrolled in the course
  useEffect(() => {
    if (!course_id) return;
  fetch(`${API_BASE}/api/courses/${course_id}/enrollments/`)
      .then(res => res.json())
      .then(data => {
        setStudents(data.students || []);
        setLoading(false);
      })
      .catch(() => {
        setStudents([]);
        setLoading(false);
      });
  }, [course_id]);

  /**
   * Remove a student from the course (terminate enrollment).
   * Only available to teachers and admins.
   */
  const handleTerminate = async (studentId: number) => {
    // Fetch current enrollments for student
  const res = await fetch(`${API_BASE}/api/students/${studentId}/enrollments/`);
    const data = await res.json();
    let ids = (data.Enrollments || '').split(',').map((id: string) => id.trim()).filter(Boolean);
    // Remove this course from the student's enrollments
    ids = ids.filter((id: string) => id !== course_id);
    // Update enrollments in backend
  await fetch(`${API_BASE}/api/students/${studentId}/enrollments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Enrollments: ids.join(',') })
    });
    // Remove student from local state
    setStudents(students.filter(s => s.StudentID !== studentId));
  };

  // Render the enrollments list and controls
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", color: "#fff", background: '#232a3b', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 2rem', width: '95vw', minWidth: 0 }}>
      {/* Page title */}
      <h2 style={{ color: '#4f8cff', fontWeight: 700, marginBottom: 24 }}>Students Enrolled in {courseName}</h2>
      {/* Loading and empty states */}
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p style={{ color: '#ccc' }}>No students enrolled.</p>
      ) : (
        <ul style={{ color: '#fff', fontSize: '1.08rem', paddingLeft: 18 }}>
          {students.map((student: any) => (
            <li key={student.StudentID} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              {/* Show student name or ID */}
              <span>{student.Username || student.Name || `ID: ${student.StudentID}`}</span>
              {/* Terminate button for teachers/admins */}
              {(role === 'teacher' || role === 'admin') && (
                <button
                  onClick={() => handleTerminate(student.StudentID)}
                  style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginLeft: 16 }}
                >
                  Terminate
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* Back button to profile */}
      <button
        onClick={() => navigate('/profile')}
        style={{ marginTop: 32, background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.4rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}
      >
        Back to Profile
      </button>
    </div>
  );
};

// Export the page for routing
export default CourseEnrollmentsPage;
