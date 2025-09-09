// StudentDashboard.tsx
// This component renders the dashboard for student users.
// It shows a heading and a list of available courses (with short descriptions).

// Import CourseList to display the list of available courses for students
import CourseList from '../Course/CourseList';

// React functional component for the student dashboard
const StudentDashboard = () => (
  <section>
    {/* Heading: lets the user know they are on their dashboard */}
    <h2>Student Dashboard</h2>

    {/* List of available courses (uses short descriptions for a quick overview) */}
    <CourseList useShortDescriptions={true} />
  </section>
);

// Export the StudentDashboard component so it can be used in routing
export default StudentDashboard;
