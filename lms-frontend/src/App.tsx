// Import necessary modules and components for routing and layout
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import SupportPage from './pages/SupportPage';
import EditCoursePage from './pages/EditCoursePage';
import CreateCoursePage from './pages/CreateCoursePage';
import CourseEnrollmentsPage from './pages/CourseEnrollmentsPage';
import UsersPage from './pages/UsersPage';
import './App.css';

// App component is the root component of the LMS frontend
// It sets up the main layout and routing for the application
function App() {
  return (
    // Router provides navigation between different pages
    <Router>
      {/* Navbar is always visible at the top */}
      <Navbar />
      {/* Main content area where routed pages are displayed */}
      <main>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          {/* Login page route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Register page route */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Student dashboard route */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Course detail page route (dynamic by course id) */}
          <Route path="/courses/:id" element={<CoursePage />} />
          {/* Course edit page for teachers */}
          <Route path="/courses/:id/edit" element={<EditCoursePage />} />
          {/* Create course page for teachers */}
          <Route path="/courses/create" element={<CreateCoursePage />} />
          {/* Profile page route */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Support page route */}
          <Route path="/support" element={<SupportPage />} />
          {/* Enrollments page for teachers to manage enrolled students */}
          <Route path="/courses/:course_id/enrollments" element={<CourseEnrollmentsPage />} />
          {/* Users page route for admin user management */}
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
      {/* Footer is always visible at the bottom */}
      <Footer />
    </Router>
  );
}

// Export the App component as default
export default App;
