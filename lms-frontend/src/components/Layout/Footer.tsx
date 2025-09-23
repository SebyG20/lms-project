// Footer.tsx
// This component renders the footer for Cyber College.
// It appears at the bottom of every page and shows copyright information.

/**
 * Footer component
 * Displays copyright notice for Cyber College.
 */
const Footer = () => (
  <footer>
    {/* Copyright notice: updates automatically to the current year */}
    <p>&copy; {new Date().getFullYear()} Cyber College. All rights reserved.</p>
  </footer>
);

// Export the Footer component for use in the app layout
export default Footer;
