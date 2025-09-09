

// Login component renders a login form for users to enter their credentials
// This is a stateless functional component
const Login = () => (
  // The form element handles user login input
  <form>
    {/* Add a user avatar/profile image here for visual engagement */}
    {/* Example: <img src="/assets/avatar-placeholder.png" alt="User Avatar" className="avatar-img" /> */}
    {/* Heading for the login form */}
    <h2>Login</h2>
    {/* Email input field */}
    <input type="email" placeholder="Email" required />
    {/* Password input field */}
    <input type="password" placeholder="Password" required />
    {/* Login button, styled to match the app's color scheme */}
  <button type="submit">Login</button>
  </form>
);

// Export the Login component as default
export default Login;
