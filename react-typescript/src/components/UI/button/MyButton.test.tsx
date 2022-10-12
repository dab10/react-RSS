import React from 'react';
import { render, screen } from '@testing-library/react';
import MyButton from './MyButton';

test('message error', () => {
  render(<MyButton />);

  expect(screen.getByRole('button')).toBeInTheDocument();
});
