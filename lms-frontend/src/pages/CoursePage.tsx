import CourseDetail from '../components/Course/CourseDetail';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
	const { id } = useParams();
	return <CourseDetail key={id} />;
};

export default CoursePage;
