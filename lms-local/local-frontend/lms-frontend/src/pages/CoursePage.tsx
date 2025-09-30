// CoursePage.tsx
// This page displays the details for a specific course, based on the course ID in the URL.
// It uses the CourseDetail component and passes the course ID as a key.

import CourseDetail from '../components/Course/CourseDetail';
import { useParams } from 'react-router-dom';

// Functional component for the course detail page
const CoursePage = () => {
	// Get course ID from URL params
	const { id } = useParams();
	// Render the course detail component
	return <CourseDetail key={id} />;
};

// Export the CoursePage component as default
export default CoursePage;
