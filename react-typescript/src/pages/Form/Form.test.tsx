import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form';
import userEvent from '@testing-library/user-event';

describe('form tests', () => {
  test('message error', async () => {
    render(<Form />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });
    const nameInput = screen.getByLabelText('Name:');
    const surnameInput = screen.getByLabelText(/surname:/i);
    const dateInput = screen.getByLabelText(/date:/i);
    const imageInput = screen.getByLabelText(/image:/i);
    const countrySelect = screen.getByLabelText(/country:/i);
    const genderRadio = screen.getByLabelText(/male/i);
    const agreeCheckbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button');

    userEvent.type(nameInput, 'Ivan');
    userEvent.type(surnameInput, 'Petrov');
    userEvent.type(dateInput, '2000-01-01');
    userEvent.upload(imageInput, file);
    userEvent.selectOptions(countrySelect, 'Kazakhstan');
    userEvent.click(genderRadio);
    userEvent.click(agreeCheckbox);
    userEvent.click(button);

    expect(screen.getByText(`Field must contain image file`)).toBeInTheDocument();
  });
});
