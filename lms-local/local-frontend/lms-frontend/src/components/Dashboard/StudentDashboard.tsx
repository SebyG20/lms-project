// StudentDashboard.tsx
// This component renders the dashboard for student users.
// It shows a heading and a list of available courses (with short descriptions).

import { useEffect, useState } from 'react';
import CourseList from '../Course/CourseList';

/**
 * StudentDashboard component
 * Displays the student dashboard and available courses.
 * Re-renders when sessionStorage changes (e.g., enrollments).
 */
const StudentDashboard = () => {
  // State to force re-render when enrollments change
  const [enrollKey, setEnrollKey] = useState(0);
  useEffect(() => {
    // Listen for sessionStorage changes and update enrollKey
    const sync = () => setEnrollKey(k => k + 1);
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return (
    <section>
      {/* Dashboard heading */}
      <h2>Student Dashboard</h2>
      {/* List of available courses for students */}
      <CourseList useShortDescriptions={true} key={enrollKey} />
    </section>
  );
};

// Export the StudentDashboard component for routing
export default StudentDashboard;
