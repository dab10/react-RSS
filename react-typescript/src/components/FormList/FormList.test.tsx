import React from 'react';
import { render, screen } from '@testing-library/react';
import FormList from './FormList';
import newId from 'utils/newId/newId';

test('render items', () => {
  const minQuantityItems = 1;
  const maxQuantityItems = 10;
  const randomNumber = Math.floor(
    minQuantityItems + Math.random() * (maxQuantityItems + 1 - minQuantityItems)
  );

  class Item {
    id = newId();
    name = 'Ivan';
    surname = 'Petrov';
    image = '';
    date = '2000-01-01';
    select = 'Russia';
    gender = 'male';
  }

  const testArray = Array(randomNumber);
  for (let i = 0; i < randomNumber; i++) {
    testArray[i] = new Item();
  }

  render(<FormList formItems={testArray} />);
  const quantityItems = screen.getAllByRole('img').length;
  expect(quantityItems).toBe(randomNumber);
});
