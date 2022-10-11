import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputSurname from './InputSurname';

test('type', () => {
  render(
    <InputSurname
      handleChange={() => {}}
      formErrors={{
        surname: '',
      }}
    />
  );

  userEvent.type(screen.getByLabelText(/surname:/i), 'Hello');
  userEvent.type(screen.getByLabelText(/surname:/i), ', World!');
  expect(screen.getByLabelText(/surname:/i)).toHaveValue('Hello, World!');
});
