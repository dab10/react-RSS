import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputCheckbox from './InputCheckbox';

test('click checkbox', () => {
  render(
    <InputCheckbox
      handleChange={() => {}}
      formErrors={{
        agree: '',
      }}
    />
  );
  expect(screen.getByRole('checkbox')).not.toBeChecked();
  userEvent.click(screen.getByRole('checkbox'));
  expect(screen.getByRole('checkbox')).toBeChecked();
});
