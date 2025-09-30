// UsersPage.tsx
// This page allows admins to manage users: view, edit, delete, and see enrollments.
// It handles table rendering, modals for editing/enrollments/deletion, and all CRUD logic.

import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
import { useNavigate } from "react-router-dom";

const UsersPage: React.FC = () => {
	// State for all users
	const [users, setUsers] = useState<any[]>([]);
	// State for loading indicator
	const [loading, setLoading] = useState(true);
	// State for error message display
	const [error, setError] = useState<string | null>(null);
	// State for current user's role
	const [role, setRole] = useState<string | null>(null);
	// React Router navigation hook
	const navigate = useNavigate();
	// State for enrollments modal
	const [showEnrollmentsModal, setShowEnrollmentsModal] = useState(false);
	const [enrollmentsCourses, setEnrollmentsCourses] = useState<any[]>([]);
	const [selectedUser, setSelectedUser] = useState<any>(null);
	// State for edit modal
	const [showEditModal, setShowEditModal] = useState(false);
	const [editForm, setEditForm] = useState<any>({ Name: '', Email: '', Password: '', Role: '' });
	// State for delete modal
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userToDelete, setUserToDelete] = useState<any>(null);

	/**
	 * Opens the edit modal for a user and populates the form.
	 */
	const handleEditClick = (user: any) => {
		setSelectedUser(user);
		setEditForm({
			Name: user.Name || '',
			Email: user.Email || '',
			Password: user.Password || '',
			Role: user.Role || '',
		});
		setShowEditModal(true);
	};

	/**
	 * Handles input changes for the edit user form.
	 */
	const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setEditForm({ ...editForm, [e.target.name]: e.target.value });
	};

	/**
	 * Handles edit user form submission and updates user in backend.
	 */
	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedUser) return;
		try {
			const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
			const res = await fetch(`${API_BASE}/api/students/${selectedUser.StudentID}/`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					Name: editForm.Name,
					Email: editForm.Email,
					Password: editForm.Password,
					Role: selectedUser?.Role === 'admin' ? 'admin' : editForm.Role,
					Enrollments: selectedUser.Enrollments || ''
				}),
			});
			if (res.ok) {
				const updated = await res.json();
				setUsers(users.map(u => u.StudentID === selectedUser.StudentID ? updated : u));
				setShowEditModal(false);
				setSelectedUser(null);
			} else {
				alert('Failed to update user');
			}
		} catch {
			alert('Failed to update user');
		}
	};

	/**
	 * Opens the enrollments modal and fetches courses for a user.
	 */
	const handleShowEnrollments = async (user: any) => {
		setSelectedUser(user);
		if (!user.Enrollments) {
			setEnrollmentsCourses([]);
			setShowEnrollmentsModal(true);
			return;
		}
		const ids = user.Enrollments.split(',').map((id: string) => id.trim()).filter(Boolean);
		if (ids.length === 0) {
			setEnrollmentsCourses([]);
			setShowEnrollmentsModal(true);
			return;
		}
		const courses = await Promise.all(ids.map((id: string) =>
			fetch(`${API_BASE}/api/courses/${id}/`).then(res => res.ok ? res.json() : null)
		));
		setEnrollmentsCourses(courses.filter(Boolean));
		setShowEnrollmentsModal(true);
	};

	/**
	 * Opens the delete modal for a user (except admin).
	 */
	const handleDeleteUser = (user: any) => {
		if (user.Role === 'admin') {
			alert('Cannot delete admin user');
			return;
		}
		setUserToDelete(user);
		setShowDeleteModal(true);
	};

	/**
	 * Confirms user deletion and removes user from backend and UI.
	 */
	const confirmDeleteUser = async () => {
		if (!userToDelete) return;
		try {
			const res = await fetch(`${API_BASE}/api/students/${userToDelete.StudentID}/`, {
				method: 'DELETE',
			});
			if (res.ok) {
				setUsers(users.filter(u => u.StudentID !== userToDelete.StudentID));
				setShowDeleteModal(false);
				setUserToDelete(null);
			} else {
				alert('Failed to delete user');
			}
		} catch {
			alert('Failed to delete user');
		}
	};

	// Fetch current user's role on mount
	useEffect(() => {
		const sid = sessionStorage.getItem("studentId");
		if (sid) {
			fetch(`${API_BASE}/api/students/${sid}/`)
				.then((res) => (res.ok ? res.json() : null))
				.then((data) => setRole(data?.Role || null))
				.catch(() => setRole(null));
		} else {
			setRole(null);
		}
	}, []);

	// Redirect non-admin users to dashboard
	useEffect(() => {
		if (role && role !== "admin") {
			navigate("/dashboard");
		}
	}, [role, navigate]);

	// Fetch all users for admin
	useEffect(() => {
		if (role === "admin") {
			fetch(`${API_BASE}/api/students/`)
				.then(res => res.json())
				.then(data => {
					setUsers(data);
					setLoading(false);
				})
				.catch(() => {
					setError('Failed to fetch users');
					setLoading(false);
				});
		}
	}, [role, navigate]);

	// Render the users management table and modals
	return (
		<>
			<div style={{ maxWidth: 900, margin: "2rem auto", color: "#fff", background: '#232a3b', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: '2.5rem 2rem', width: '95vw', minWidth: 0 }}>
				{/* Page title */}
				<h2 style={{ color: '#4f8cff', fontWeight: 700, marginBottom: 24 }}>Users Management</h2>
				{/* Loading and error states */}
				   {loading ? (
					   <p>Loading...</p>
				   ) : error ? (
					   <p style={{ color: '#ff4d4f' }}>{error}</p>
				   ) : (
					   <div className="table-scroll">
						   <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181c23', borderRadius: 8 }}>
							   <thead>
								   <tr style={{ color: '#4f8cff', fontWeight: 700 }}>
									   <th style={{ padding: '0.7rem' }}>ID</th>
									   <th style={{ padding: '0.7rem' }}>Name</th>
									   <th style={{ padding: '0.7rem' }}>Email</th>
									   <th style={{ padding: '0.7rem' }}>Password</th>
									   <th style={{ padding: '0.7rem' }}>Role</th>
									   <th style={{ padding: '0.7rem' }}>Enrollments</th>
									   <th style={{ padding: '0.7rem' }}>Actions</th>
								   </tr>
							   </thead>
							   <tbody>
								   {users.map((user: any) => (
									   <tr key={user.StudentID} style={{ background: '#181c23', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
										   <td style={{ padding: '0.9rem 0.7rem', borderRadius: '8px 0 0 8px' }}>{user.StudentID}</td>
										   <td style={{ padding: '0.9rem 0.7rem' }}>{user.Name}</td>
										   <td style={{ padding: '0.9rem 0.7rem' }}>{user.Email}</td>
										   <td style={{ padding: '0.9rem 0.7rem' }}>{user.Password}</td>
										   <td style={{ padding: '0.9rem 0.7rem' }}>{user.Role}</td>
										   <td style={{ padding: '0.9rem 0.7rem', textAlign: 'center' }}>
											   {/* Enrollments button opens enrollments modal */}
											   <button
												   style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, marginRight: 0, minWidth: 110 }}
												   onClick={() => handleShowEnrollments(user)}
											   >Enrollments</button>
										   </td>
										   <td style={{ padding: '0.9rem 0.7rem', textAlign: 'center', borderRadius: '0 8px 8px 0' }}>
											   {/* Edit and delete buttons open respective modals */}
											   <button
												   style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, marginRight: 8, minWidth: 70 }}
												   onClick={() => handleEditClick(user)}
											   >Edit</button>
											   <button
												   style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 700, minWidth: 70 }}
												   onClick={() => handleDeleteUser(user)}
											   >Delete</button>
										   </td>
									   </tr>
								   ))}
							   </tbody>
						   </table>
					   </div>
				   )}
				{/* TODO: Add create user form */}
			</div>
					{showEnrollmentsModal && (
						<div style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							background: 'rgba(0,0,0,0.5)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 9999,
						}}>
							<div style={{
								background: '#232a3b',
								borderRadius: 12,
								padding: '2rem 2.5rem',
								boxShadow: '0 4px 24px #0004',
								color: '#fff',
								minWidth: 320,
								textAlign: 'center',
							}}>
								<h3 style={{ marginBottom: 16 }}>Enrollments for {selectedUser?.Name}</h3>
								{enrollmentsCourses.length === 0 ? (
									<p style={{ color: '#ccc' }}>No enrollments found.</p>
								) : (
									<ul style={{ color: '#fff', fontSize: '1.08rem', paddingLeft: 18, textAlign: 'left' }}>
										{enrollmentsCourses.map((course: any) => (
											<li key={course.CourseID} style={{ marginBottom: 8 }}>
												<strong>{course.Title}</strong> <span style={{ color: '#aaa', fontSize: '0.95em' }}>({course.Description?.slice(0, 40)})</span>
											</li>
										))}
									</ul>
								)}
								<button
									style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: 18 }}
									onClick={() => setShowEnrollmentsModal(false)}
								>Close</button>
							</div>
						</div>
					)}

					{showEditModal && (
						<div style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							background: 'rgba(0,0,0,0.5)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 9999,
						}}>
							<div style={{
								background: '#232a3b',
								borderRadius: 12,
								padding: '2rem 2.5rem',
								boxShadow: '0 4px 24px #0004',
								color: '#fff',
								minWidth: 320,
								textAlign: 'center',
							}}>
								<h3 style={{ marginBottom: 16 }}>Edit User</h3>
								<form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
									<input name="Name" value={editForm.Name} onChange={handleEditFormChange} placeholder="Name" style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181c23', color: '#fff' }} required />
									<input name="Email" value={editForm.Email} onChange={handleEditFormChange} placeholder="Email" style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181c23', color: '#fff' }} required />
									<input name="Password" value={editForm.Password} onChange={handleEditFormChange} placeholder="Password" style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181c23', color: '#fff' }} required />
									<select name="Role" value={editForm.Role} onChange={handleEditFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181c23', color: '#fff' }} required disabled={selectedUser?.Role === 'admin'}>
										<option value="student">Student</option>
										<option value="teacher">Teacher</option>
										<option value="admin">Admin</option>
									</select>
									<div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
										<button type="submit" style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Save</button>
										<button type="button" style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }} onClick={() => setShowEditModal(false)}>Cancel</button>
									</div>
								</form>
							</div>
						</div>
					)}
		{/* ...existing code... */}
		{showDeleteModal && (
			<div style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				background: 'rgba(0,0,0,0.5)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 9999,
			}}>
				<div style={{
					background: '#232a3b',
					borderRadius: 12,
					padding: '2rem 2.5rem',
					boxShadow: '0 4px 24px #0004',
					color: '#fff',
					minWidth: 320,
					textAlign: 'center',
				}}>
					<h3 style={{ marginBottom: 16, color: '#ff4d4f' }}>Delete User</h3>
					<p style={{ marginBottom: 24, fontSize: '1.08em', color: '#fff' }}>
						Are you sure you want to delete user <span style={{ fontWeight: 700, color: '#4f8cff' }}>{userToDelete?.Name}</span>?
					</p>
					<div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
						<button
							style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
							onClick={confirmDeleteUser}
						>Delete</button>
						<button
							style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
							onClick={() => { setShowDeleteModal(false); setUserToDelete(null); }}
						>Cancel</button>
					</div>
				</div>
			</div>
		)}
		{/* ...existing code... */}
		</>
	);
};

export default UsersPage;
