import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Form from './Form';
import userEvent from '@testing-library/user-event';
import { quantityCharacters } from 'utils/const/const';
import { AppState } from 'context/AppState';

describe('form tests', () => {
  test('check form fields', async () => {
    render(
      <AppState>
        <Form />
      </AppState>
    );

    const nameInput = screen.getByLabelText('Name:');
    const surnameInput = screen.getByLabelText(/surname:/i);
    const dateInput = screen.getByLabelText(/date:/i);
    const imageInput = screen.getByLabelText(/image:/i) as HTMLInputElement;
    const countrySelect = screen.getByLabelText(/country:/i);
    const genderMale = screen.getByLabelText(/male/i);
    const agreeCheckbox = screen.getByRole('checkbox');
    const file = new File(['new file'], 'newFile.png', { type: 'image/png' });

    userEvent.type(nameInput, 'Hello, World!');
    expect(nameInput).toHaveValue('Hello, World!');

    userEvent.type(surnameInput, 'Hello');
    userEvent.type(surnameInput, ', World!');
    expect(surnameInput).toHaveValue('Hello, World!');

    userEvent.click(dateInput);
    userEvent.type(dateInput, '2000-01-01');
    expect(dateInput).toHaveValue('2000-01-01');

    userEvent.upload(imageInput, file);
    const files = imageInput.files;
    expect(files).toHaveLength(1);

    userEvent.selectOptions(countrySelect, 'Kazakhstan');
    expect((screen.getByRole('option', { name: 'Russia' }) as HTMLOptionElement).selected).toBe(
      false
    );
    expect((screen.getByRole('option', { name: 'Belarus' }) as HTMLOptionElement).selected).toBe(
      false
    );
    expect((screen.getByRole('option', { name: 'Kazakhstan' }) as HTMLOptionElement).selected).toBe(
      true
    );

    expect(genderMale).not.toBeChecked();
    userEvent.click(genderMale);
    expect(genderMale).toBeChecked();

    expect(agreeCheckbox).not.toBeChecked();
    userEvent.click(agreeCheckbox);
    expect(agreeCheckbox).toBeChecked();
  });

  test('reset form after submit right form', async () => {
    window.URL.createObjectURL = jest.fn();
    act(() => {
      render(
        <AppState>
          <Form />
        </AppState>
      );
    });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });
    const nameInput = screen.getByLabelText('Name:');
    const surnameInput = screen.getByLabelText(/surname:/i);
    const dateInput = screen.getByLabelText(/date:/i);
    const imageInput = screen.getByLabelText(/image:/i);
    const countrySelect = screen.getByLabelText(/country:/i);
    const genderRadio = screen.getAllByLabelText(/male/i)[0];
    const agreeCheckbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button');

    await act(() => {
      userEvent.type(nameInput, 'Ivan');
      userEvent.type(surnameInput, 'Petrov');
      userEvent.type(dateInput, '2000-01-01');
      userEvent.upload(imageInput, file);
      Object.defineProperty(window.URL, 'value', {
        value: file.name,
      });
      userEvent.selectOptions(countrySelect, 'Kazakhstan');
      userEvent.click(genderRadio);
      userEvent.click(agreeCheckbox);
      userEvent.click(button);
    });

    setTimeout(() => {
      expect(surnameInput).toHaveValue('');
      expect(screen.getByText(`Kazakhstan`)).toBeInTheDocument();
    }, 2000);
  });

  test('message after submit wrong form', async () => {
    act(() => {
      render(
        <AppState>
          <Form />
        </AppState>
      );
    });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });

    const imageInput = screen.getByLabelText(/image:/i);
    const button = screen.getByRole('button');

    await act(() => {
      userEvent.upload(imageInput, file);
      userEvent.click(button);
    });

    expect(screen.getByText(`Checkbox must be checked`)).toBeInTheDocument();
    expect(screen.getByText(`Field must contain date`)).toBeInTheDocument();
    expect(
      screen.getByText(`Name must contain at least ${quantityCharacters} character`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Gender must be checked`)).toBeInTheDocument();
    expect(
      screen.getByText(`Surname must contain at least ${quantityCharacters} character`)
    ).toBeInTheDocument();
  });
});
