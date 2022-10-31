import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';
import { AppState } from 'context/AppState';

test('full app rendering/navigating', () => {
  render(
    <AppState>
      <App />
    </AppState>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/about/i));
  expect(screen.getByText(/i want to be a frontend developer/i)).toBeInTheDocument();
});

test('landing on a bad page', () => {
  const badRoute = '/badRoute';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <AppState>
        <App />
      </AppState>
    </MemoryRouter>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
