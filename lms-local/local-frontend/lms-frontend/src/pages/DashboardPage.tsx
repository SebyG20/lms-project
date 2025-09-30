// DashboardPage.tsx
// This page displays the dashboard for the logged-in user, based on their role.
// Admins see course management and user management options, teachers see course management, students see their dashboard.

import React, { useEffect, useState } from 'react';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import CourseList from '../components/Course/CourseList';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
	// State for user role
	const [role, setRole] = useState<string | null>(null);
	// React Router navigation hook
	const navigate = useNavigate();

	// Fetch user role on mount
	useEffect(() => {
		const sid = sessionStorage.getItem('studentId');
		if (sid) {
			const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'; // This line can be removed if not used
			fetch(`${API_BASE}/api/students/${sid}/`)
				.then(res => res.ok ? res.json() : null)
				.then(data => setRole(data?.Role || null))
				.catch(() => setRole(null));
		} else {
			setRole(null);
		}
	}, []);

	// Admin dashboard view
	if (role === 'admin') {
		return (
			<section>
				{/* Admin header and actions */}
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
					<h2 style={{ fontSize: '1.2rem', marginBottom: 0 }}>Admin Dashboard</h2>
					<div style={{ display: 'flex', gap: 8 }}>
						{/* Add course button */}
						<button
							style={{
								background: '#4f8cff',
								color: '#fff',
								border: 'none',
								borderRadius: 6,
								padding: '0.5rem 0.8rem',
								fontWeight: 700,
								fontSize: '1rem',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/courses/create')}
						>
							Add Course
						</button>
						{/* Manage users button */}
						<button
							style={{
								background: '#ffb347',
								color: '#232a3b',
								border: 'none',
								borderRadius: 6,
								padding: '0.5rem 0.8rem',
								fontWeight: 700,
								fontSize: '1rem',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/users')}
						>
							Manage Users
						</button>
					</div>
				</div>
				{/* Courses section */}
				<div style={{ marginTop: 12 }}>
					<h3 style={{ fontSize: '1.05rem', marginBottom: 10 }}>All Courses</h3>
					<div style={{ maxWidth: 420, margin: '0 auto', background: '#232a3b', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '1.2rem 1rem', color: '#fff' }}>
						<CourseList />
					</div>
				</div>
			</section>
		);
	}
	// Teacher dashboard view
	if (role === 'teacher') {
		return (
			<section>
				{/* Teacher header and actions */}
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
					<h2>Teacher Dashboard</h2>
					{/* Add course button */}
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
				{/* Courses section */}
				<div style={{ marginTop: 24 }}>
					<h3>All Courses</h3>
					<div>
						<CourseList />
					</div>
				</div>
			</section>
		);
	}
	// Student dashboard view
	return <StudentDashboard />;
};

export default DashboardPage;
