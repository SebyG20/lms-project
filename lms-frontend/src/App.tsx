
// Import necessary modules and components for routing and layout
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
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
        </Routes>
      </main>
      {/* Footer is always visible at the bottom */}
      <Footer />
    </Router>
  );
}

// Export the App component as default
export default App;
