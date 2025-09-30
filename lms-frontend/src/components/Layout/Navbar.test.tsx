import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

/**
 * Test: Navbar component renders the Home and Dashboard links.
 * Expected: The text 'Home' and 'Dashboard' should appear in the document.
 */
describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
