import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockApi } from '../../utils/mocks/mockApi';
import Home from './Home';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';

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
    render(<Home />);
    const mockId = 'savedStateSearching';
    const mockJson = 'example';
    userEvent.type(screen.getByRole('textbox'), mockJson);
    window.localStorage.setItem(
      mockId,
      JSON.stringify((screen.getByRole('textbox') as HTMLInputElement).value)
    );
    render(<Home />);
    expect(window.localStorage.getItem('savedStateSearching')).toEqual(JSON.stringify(mockJson));
  });

  test('search without result', async () => {
    mockApi.use(
      rest.get(`https://rickandmortyapi.com/api/character/`, async (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(<Home />);

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
    render(<Home />);

    userEvent.click(screen.getByText(/Search/i));
    await waitFor(() => expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked());
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
  });

  test('open/close popup', async () => {
    render(<Home />);

    await waitFor(async () => {
      userEvent.click(screen.getAllByAltText(/Rick/i)[0]);
      expect(screen.getByText('Location: Earth')).toBeInTheDocument();
    });

    await waitFor(async () => {
      userEvent.click(screen.getByText(/x/i));
      expect(document.body).not.toHaveClass('stop-scrolling');
    });

    await waitFor(async () => {
      userEvent.click(screen.getAllByAltText(/Rick/i)[0]);
      expect(screen.getByText('Location: Earth')).toBeInTheDocument();
    });

    await waitFor(async () => {
      userEvent.click(screen.getByTestId('popup'));
      expect(document.body).not.toHaveClass('stop-scrolling');
    });
  });
});
