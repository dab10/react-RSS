import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders github link', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/github/i);
  expect(linkElement).not.toBeDisabled();
});
