import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

/**
 * Test: CourseList component shows a loading message when first rendered.
 * Expected: The text 'Loading courses...' should appear in the document.
 */
describe('CourseList', () => {
  it('renders loading state initially', () => {
    render(<CourseList />);
    expect(screen.getByText(/loading courses/i)).toBeInTheDocument();
  });
});
