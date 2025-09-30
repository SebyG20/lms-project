import { render, screen } from '@testing-library/react';
import Login from './Login';

/**
 * Test: Login component renders email and password fields.
 * Expected: The form fields for email and password should be present in the document.
 */
describe('Login', () => {
  it('renders login form fields', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
