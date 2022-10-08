import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('full app rendering/navigating', () => {
  render(<Header />, { wrapper: BrowserRouter });
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
