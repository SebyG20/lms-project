// Footer.tsx
// This component renders the footer for Cyber College.
// It appears at the bottom of every page and shows copyright information.

// React functional component for the footer
const Footer = () => (
  <footer>
    {/* Copyright notice: updates automatically to the current year */}
    <p>&copy; {new Date().getFullYear()} Cyber College. All rights reserved.</p>
  </footer>
);

// Export the Footer component so it can be used in the app layout
export default Footer;
