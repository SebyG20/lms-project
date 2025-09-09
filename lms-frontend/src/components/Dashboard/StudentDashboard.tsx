// Import CourseList to display the list of available courses for students
import CourseList from '../Course/CourseList';

// StudentDashboard component displays the dashboard view for student users
// It includes a heading and the list of available courses
const StudentDashboard = () => (
  <section>
    {/* Heading for the student dashboard */}
    <h2>Student Dashboard</h2>
    {/* Display the list of available courses */}
    <CourseList />
  </section>
);

// Export the StudentDashboard component as default
export default StudentDashboard;
