import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputSelect from './InputSelect';

test('selectOptions', () => {
  render(
    <InputSelect
      handleChange={() => {}}
      formErrors={{
        select: '',
      }}
    />
  );

  userEvent.selectOptions(screen.getByLabelText(/country:/i), 'Kazakhstan');

  expect((screen.getByRole('option', { name: 'Russia' }) as HTMLOptionElement).selected).toBe(
    false
  );
  expect((screen.getByRole('option', { name: 'Belarus' }) as HTMLOptionElement).selected).toBe(
    false
  );
  expect((screen.getByRole('option', { name: 'Kazakhstan' }) as HTMLOptionElement).selected).toBe(
    true
  );
});
