import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

test('full app rendering/navigating', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/home/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/about/i));
  expect(screen.getByText(/i want to be a frontend developer/i)).toBeInTheDocument();
});

test('landing on a bad page', () => {
  const badRoute = '/badRoute';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
