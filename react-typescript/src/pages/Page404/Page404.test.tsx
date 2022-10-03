import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page404 from './Page404';

test('renders homepage link', () => {
  render(
    <MemoryRouter>
      <Page404 />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/homepage/i);
  expect(linkElement).toBeInTheDocument();
});
