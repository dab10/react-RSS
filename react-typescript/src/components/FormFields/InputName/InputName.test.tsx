import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputName from './InputName';

test('type', () => {
  render(
    <InputName
      // handleChange={() => {}}
      formErrors={{
        name: '',
      }}
    />
  );

  userEvent.type(screen.getByLabelText(/name:/i), 'Hello, World!');
  expect(screen.getByLabelText(/name:/i)).toHaveValue('Hello, World!');
});
