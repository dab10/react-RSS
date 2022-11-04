import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';
import { setupStore } from 'store/store';
import { Provider } from 'react-redux';

test('full app rendering/navigating', () => {
  const store = setupStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/about/i));
  expect(screen.getByText(/i want to be a frontend developer/i)).toBeInTheDocument();
});

test('landing on a bad page', () => {
  const badRoute = '/badRoute';
  const store = setupStore();

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
