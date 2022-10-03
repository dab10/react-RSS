import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

test('renders Telegram link', () => {
  render(<About />);
  const el = screen.getByText('Telegram');
  const link = screen.getByText('@dab1000');
  expect(el).toContainElement(link);
});
