// NavbarMocked.test.tsx
// This test checks that the Navbar component renders the Home link.
// It mocks react-router-dom's Link to a simple span to avoid ESM issues.

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock Link to a span to avoid ESM issues with react-router-dom
jest.mock('react-router-dom', () => ({
  Link: (props: any) => <span {...props} />,
}));

import Navbar from '../components/Layout/Navbar';

describe('Navbar', () => {
  it('renders Home link', () => {
    render(<Navbar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
