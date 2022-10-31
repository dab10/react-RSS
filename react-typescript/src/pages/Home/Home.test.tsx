import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockApi } from '../../utils/mocks/mockApi';
import Home from './Home';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { AppState } from 'context/AppState';

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

describe('Home page', () => {
  test('data is added into local storage', async () => {
    render(
      <AppState>
        <Home />
      </AppState>
    );
    const mockId = 'savedStateSearching';
    const mockJson = 'morty';
    userEvent.type(screen.getByRole('textbox'), mockJson);
    window.localStorage.setItem(
      mockId,
      JSON.stringify((screen.getByRole('textbox') as HTMLInputElement).value)
    );
    render(
      <AppState>
        <Home />
      </AppState>
    );
    expect(window.localStorage.getItem('savedStateSearching')).toEqual(JSON.stringify(mockJson));
  });

  test('search without result', async () => {
    mockApi.use(
      rest.get(`https://rickandmortyapi.com/api/character/`, async (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(
      <AppState>
        <Home />
      </AppState>
    );

    await act(async () => {
      userEvent.type(screen.getByRole('textbox'), 'rrrrrr');
      userEvent.click(screen.getByText(/Search/i));
    });
    setTimeout(
      () => expect(screen.getByText(/Could not fetch the data/i)).toBeInTheDocument(),
      2000
    );
  });

  test('click checkbox "like"', async () => {
    render(
      <AppState>
        <Home />
      </AppState>
    );

    userEvent.type(screen.getByRole('textbox'), ' morty');
    userEvent.click(screen.getByText(/Search/i));
    waitFor(() => {
      expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
      userEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    });
  });
});
