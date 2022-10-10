import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputDate from './InputDate';

test('click date', async () => {
  render(
    <InputDate
      handleChange={() => {}}
      formErrors={{
        date: '',
      }}
    />
  );
  const userDate = screen.getByLabelText(/date:/i);
  userEvent.click(userDate);
  userEvent.type(userDate, '2000-01-01');
  expect(userDate).toHaveValue('2000-01-01');
});
