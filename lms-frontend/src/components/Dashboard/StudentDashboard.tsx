// StudentDashboard.tsx
// This component renders the dashboard for student users.
// It shows a heading and a list of available courses (with short descriptions).

// Import CourseList to display the list of available courses for students
// import removed, see below

// React functional component for the student dashboard

import React, { useEffect, useState } from 'react';
import CourseList from '../Course/CourseList';

const StudentDashboard = () => {
  const [enrollKey, setEnrollKey] = useState(0);
  useEffect(() => {
    const sync = () => setEnrollKey(k => k + 1);
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return (
    <section>
      <h2>Student Dashboard</h2>
      <CourseList useShortDescriptions={true} key={enrollKey} />
    </section>
  );
};

// Export the StudentDashboard component so it can be used in routing
export default StudentDashboard;
