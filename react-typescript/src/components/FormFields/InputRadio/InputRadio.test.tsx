import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputRadio from '../InputRadio/InputRadio';

test('radiobutton', () => {
  render(
    <label>
      Gender:
      <div>
        <InputRadio handleChange={() => {}} gender={'male'} />
        <InputRadio handleChange={() => {}} gender={'female'} />
      </div>
    </label>
  );

  const genderMale = screen.getAllByLabelText(/male/i)[0];
  const genderFemale = screen.getAllByLabelText(/male/i)[1];
  userEvent.click(genderFemale);
  expect(genderMale).not.toBeChecked();
  expect(genderFemale).toBeChecked();
});
