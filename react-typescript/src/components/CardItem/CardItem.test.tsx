import React from 'react';
import { render, screen } from '@testing-library/react';
import cardData from 'components/cardData/cardData';
import CardItem from './CardItem';
import { BrowserRouter } from 'react-router-dom';

test('renders card', () => {
  const randomNumber = Math.floor(Math.random() * cardData.length);
  render(
    <CardItem handleClickToggle={() => {}} handleChange={() => {}} {...cardData[randomNumber]} />,
    { wrapper: BrowserRouter }
  );
  const regexp = new RegExp(`${cardData[randomNumber].name}`, 'i');
  const name = screen.getByText(regexp);
  expect(name).toBeInTheDocument();
});

test('renders card', () => {
  const cardItems = cardData.map((item) => (
    <CardItem handleClickToggle={() => {}} key={item.id} handleChange={() => {}} {...item} />
  ));
  render(<BrowserRouter>{cardItems}</BrowserRouter>);
  const quantityCards = screen.getAllByRole('checkbox').length;
  expect(quantityCards).toBe(cardData.length);
});
