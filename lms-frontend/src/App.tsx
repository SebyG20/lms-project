import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
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
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses/:id" element={<CoursePage />} />
          <Route path="/courses/:id/edit" element={<EditCoursePage />} />
          <Route path="/courses/create" element={<CreateCoursePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/courses/:course_id/enrollments" element={<CourseEnrollmentsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/table" element={<UsersPage fullTable={true} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
