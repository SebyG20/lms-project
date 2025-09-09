// Navbar.tsx
// This component renders the top navigation bar for Cyber College.
// It provides quick links to the main sections of the app: Home, Dashboard, and Register.

// Import Link from react-router-dom to enable navigation between pages
import { Link } from 'react-router-dom';

// React functional component for the navigation bar
const Navbar = () => (
  <nav>
    {/* Brand/Logo link: clicking this always brings the user to the home page */}
    <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Home</Link>

    {/* Link to the student dashboard: where users can see available courses and their progress */}
    <Link to="/dashboard">Dashboard</Link>

    {/* Link to the registration page: for new users to sign up */}
    <Link to="/register">Register</Link>
  </nav>
);

// Export the Navbar component so it can be used in the app layout
export default Navbar;
