import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageError from './MessageError';

test('message error', () => {
  const errorMessage = 'Surname must contain at least 2 character';

  render(<MessageError messageError={errorMessage} />);

  expect(screen.getByText(errorMessage)).toHaveClass('error');
});
