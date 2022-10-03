import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders github link', () => {
  render(<SearchBar handleChangeForm={() => {}} handleSubmit={() => {}} searching="" />);
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveFocus();
});
