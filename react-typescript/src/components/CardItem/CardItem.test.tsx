import React from 'react';
import { render, screen } from '@testing-library/react';
import cardData from 'components/cardData/cardData';
import CardItem from './CardItem';

test('renders card', () => {
  const randomNumber = Math.floor(Math.random() * cardData.length);
  render(<CardItem handleChange={() => {}} {...cardData[randomNumber]} />);
  const regexp = new RegExp(`${cardData[randomNumber].name}`, 'i');
  const name = screen.getByText(regexp);
  expect(name).toBeInTheDocument();
});

test('renders card', () => {
  const cardItems = cardData.map((item) => (
    <CardItem key={item.id} handleChange={() => {}} {...item} />
  ));
  render(<>{cardItems}</>);
  const quantityCards = screen.getAllByRole('checkbox').length;
  expect(quantityCards).toBe(cardData.length);
});
