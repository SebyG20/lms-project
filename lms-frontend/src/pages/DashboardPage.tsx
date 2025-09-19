
import React, { useEffect, useState } from 'react';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import CourseList from '../components/Course/CourseList';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
	const [role, setRole] = useState<string | null>(null);
	const navigate = useNavigate();
	useEffect(() => {
		const sid = sessionStorage.getItem('studentId');
		if (sid) {
			fetch(`http://localhost:8000/api/students/${sid}/`)
				.then(res => res.ok ? res.json() : null)
				.then(data => setRole(data?.Role || null))
				.catch(() => setRole(null));
		} else {
			setRole(null);
		}
	}, []);

	if (role === 'teacher') {
			return (
				<section>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
						<h2>Teacher Dashboard</h2>
						<button
							style={{
								background: '#4f8cff',
								color: '#fff',
								border: 'none',
								borderRadius: 6,
								padding: '0.7rem 1.2rem',
								fontWeight: 700,
								fontSize: '1.1rem',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/courses/create')}
						>
							Add Course
						</button>
					</div>
					{/* Show course list for teachers too */}
					<div style={{ marginTop: 24 }}>
						<h3>All Courses</h3>
						<div>
							<CourseList />
						</div>
					</div>
				</section>
			);
	}
	return <StudentDashboard />;
};

export default DashboardPage;
