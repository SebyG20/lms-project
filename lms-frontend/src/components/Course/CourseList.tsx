import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Type for course data from backend
type Course = {
  CourseID: number;
  Title: string;
  Description: string;
};

const API_URL = 'http://localhost:8000/api/courses/'; // Update if your backend runs elsewhere


interface CourseListProps {
  useShortDescriptions?: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ useShortDescriptions = false }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching courses from API:', API_URL);
    fetch(API_URL)
      .then((res) => {
        console.log('API response status:', res.status);
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched courses:', data);
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="course-list">
      <h2 className="course-list-title">Available Courses</h2>
      <div className="course-grid">
        {courses.length === 0 ? (
          <div>No courses found.</div>
        ) : (
          courses.map(course => (
            <div className="course-card" key={course.CourseID}>
              <h3>{course.Title}</h3>
              <p>{useShortDescriptions ? '' : course.Description}</p>
              <Link className="course-link" to={`/courses/${course.CourseID}`}>View Course</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
