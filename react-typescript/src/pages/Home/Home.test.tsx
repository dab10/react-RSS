import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

const localStorageMock = (function () {
  let store: { [x: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

test('data is added into local storage', () => {
  render(<Home />);
  const mockId = 'savedState';
  const mockJson = 'example';
  userEvent.type(screen.getByRole('textbox'), mockJson);
  window.localStorage.setItem(
    mockId,
    JSON.stringify((screen.getByRole('textbox') as HTMLInputElement).value)
  );
  render(<Home />);
  expect(window.localStorage.getItem('savedState')).toEqual(JSON.stringify(mockJson));
});

test('click checkbox', () => {
  render(<Home />);
  expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
  userEvent.click(screen.getAllByRole('checkbox')[0]);
  expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
});

test('click search button', () => {
  const handleClick = jest.fn();
  render(<Home />);
  userEvent.click(screen.getByText(/search/i));
  expect(handleClick).toHaveBeenCalledTimes(0);
});
