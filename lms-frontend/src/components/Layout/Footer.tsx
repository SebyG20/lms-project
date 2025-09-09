// Footer component displays the footer section of the application
// It shows copyright information
const Footer = () => (
  <footer>
    {/* Copyright notice with the current year */}
    <p>&copy; {new Date().getFullYear()} LMS. All rights reserved.</p>
  </footer>
);

// Export the Footer component as default
export default Footer;
