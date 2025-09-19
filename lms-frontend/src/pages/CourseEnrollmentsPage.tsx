import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CourseEnrollmentsPage: React.FC = () => {
  const { course_id } = useParams<{ course_id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const courseName = location.state?.courseName || '';
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!course_id) return;
    fetch(`http://localhost:8000/api/courses/${course_id}/enrollments/`)
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

  // Remove student from course
  const handleTerminate = async (studentId: number) => {
    // Fetch current enrollments for student
    const res = await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`);
    const data = await res.json();
    let ids = (data.Enrollments || '').split(',').map((id: string) => id.trim()).filter(Boolean);
    ids = ids.filter((id: string) => id !== course_id);
    await fetch(`http://localhost:8000/api/students/${studentId}/enrollments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Enrollments: ids.join(',') })
    });
    setStudents(students.filter(s => s.StudentID !== studentId));
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", color: "#fff", background: '#232a3b', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 2rem', width: '95vw', minWidth: 0 }}>
      <h2 style={{ color: '#4f8cff', fontWeight: 700, marginBottom: 24 }}>Students Enrolled in {courseName}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p style={{ color: '#ccc' }}>No students enrolled.</p>
      ) : (
        <ul style={{ color: '#fff', fontSize: '1.08rem', paddingLeft: 18 }}>
          {students.map((student: any) => (
            <li key={student.StudentID} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span>{student.Username || student.Name || `ID: ${student.StudentID}`}</span>
              <button
                onClick={() => handleTerminate(student.StudentID)}
                style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginLeft: 16 }}
              >
                Terminate
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => navigate('/profile')}
        style={{ marginTop: 32, background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.4rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}
      >
        Back to Profile
      </button>
    </div>
  );
};

export default CourseEnrollmentsPage;
