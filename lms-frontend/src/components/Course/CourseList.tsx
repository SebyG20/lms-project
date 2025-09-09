// Import Link from react-router-dom to enable navigation between pages
import { Link } from 'react-router-dom';

// Hardcoded list of courses for demonstration purposes
// Each course has an id, title, and description
const courses = [
  { id: 1, title: 'Computer Science', description: 'Introduction to algorithms, programming, and computer systems.' },
  { id: 2, title: 'English', description: 'Develop reading, writing, and communication skills.' },
  { id: 3, title: 'Maths', description: 'Explore algebra, geometry, calculus, and more.' },
  { id: 4, title: 'Biology', description: 'Study living organisms, cells, and ecosystems.' },
  { id: 5, title: 'Physics', description: 'Learn about matter, energy, and the laws of nature.' },
  { id: 6, title: 'Art', description: 'Discover creativity through drawing, painting, and visual expression.' },
];

// CourseList component displays all available courses in a grid layout
// Each course is shown as a card with a title, description, and a link to view more details
const CourseList = () => (
  <div className="course-list">
    {/* Title for the course list section */}
    <h2 className="course-list-title">Available Courses</h2>
    {/* Grid container for course cards */}
    <div className="course-grid">
      {courses.map(course => (
        // Each course card displays the course title, description, and a link to the course detail page
        <div className="course-card" key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {/* Link to the course detail page for the selected course */}
          <Link className="course-link" to={`/courses/${course.id}`}>View Course</Link>
        </div>
      ))}
    </div>
  </div>
);

// Export the CourseList component as default
export default CourseList;
