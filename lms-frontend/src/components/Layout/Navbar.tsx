// Import Link from react-router-dom to enable navigation between pages
import { Link } from 'react-router-dom';

// Navbar component provides the main navigation bar for the application
// It includes links to the home page, dashboard, and registration page
const Navbar = () => (
  <nav>
    {/* Link to the home page */}
    <Link to="/">LMS</Link>
    {/* Link to the student dashboard */}
    <Link to="/dashboard">Dashboard</Link>
    {/* Link to the registration page */}
    <Link to="/register">Register</Link>
  </nav>
);

// Export the Navbar component as default
export default Navbar;
