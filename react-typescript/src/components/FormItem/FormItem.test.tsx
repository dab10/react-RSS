import React from 'react';
import { render, screen } from '@testing-library/react';
import FormItem from './FormItem';

test('render item', () => {
  const item = {
    id: 0,
    name: 'Ivan',
    surname: 'Petrov',
    image: '',
    date: '2000-01-01',
    select: 'Russia',
    gender: 'male',
  };

  render(
    <FormItem
      id={item.id}
      name={item.name}
      surname={item.surname}
      image={item.image}
      date={item.date}
      select={item.select}
      gender={item.gender}
    />
  );

  expect(screen.getByText(`Name: ${item.name}`)).toBeInTheDocument();
  expect(screen.getByText(`Surname: ${item.surname}`)).toBeInTheDocument();
  expect(screen.getByText(`Date of birth: ${item.date}`)).toBeInTheDocument();
  expect(screen.getByText(`Country: ${item.select}`)).toBeInTheDocument();
  expect(screen.getByText(`Gender: ${item.gender}`)).toBeInTheDocument();
});
