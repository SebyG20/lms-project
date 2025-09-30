// Footer.test.tsx
// This test checks that the Footer component renders the expected copyright text.
// It uses React Testing Library to render the component and query for the text.
// Expected result: The test passes if the copyright text is present in the document.

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Layout/Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    // Render the Footer component
    render(<Footer />);
    // Assert that the copyright symbol and year are present
    expect(screen.getByText(/cyber college/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText(/©/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
