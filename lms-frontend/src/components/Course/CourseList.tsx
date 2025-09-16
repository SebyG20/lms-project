import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Type for course data from backend
type Course = {
  CourseID: number;
  Title: string;
  Description: string;
};

const API_URL = 'http://localhost:8000/api/courses/'; // Update if your backend runs elsewhere

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
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
        {courses.map(course => (
          <div className="course-card" key={course.CourseID}>
            <h3>{course.Title}</h3>
            <p>{course.Description}</p>
            <Link className="course-link" to={`/courses/${course.CourseID}`}>View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
