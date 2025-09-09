
// Import useNavigate from react-router-dom to programmatically navigate between pages
import { useNavigate } from 'react-router-dom';

// Register component renders a registration form for new users
// It also provides a button to navigate to the login page if the user already has an account
const Register = () => {
  // useNavigate hook allows navigation to other routes
  const navigate = useNavigate();
  return (
    // The form element handles user registration input
    <form>
      {/* Add a user avatar/profile image here for visual engagement */}
      {/* Example: <img src="/assets/avatar-placeholder.png" alt="User Avatar" className="avatar-img" /> */}
  {/* Heading for the registration form */}
      <h2>Register</h2>
      {/* Name input field */}
      <input type="text" placeholder="Name" required />
      {/* Email input field */}
      <input type="email" placeholder="Email" required />
      {/* Password input field */}
      <input type="password" placeholder="Password" required />
      {/* Register button, styled to match the app's color scheme */}
  <button type="submit">Register</button>
      {/* Button to navigate to the login page if the user already has an account */}
      <button
        type="button"
        style={{ marginTop: '1rem', background: '#232a3b', color: '#4f8cff', border: 'none', textDecoration: 'underline', fontWeight: 500 }}
        onClick={() => navigate('/login')}
      >
        Already have an account? Log in!
      </button>
    </form>
  );
};

// Export the Register component as default
export default Register;
