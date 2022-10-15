import CardItem from 'components/CardItem/CardItem';
import React from 'react';
import './CardList.scss';

type Card = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  isFavorite: boolean;
};

type Cards = {
  results: Card[];
};

type ListProps = {
  cards: Cards;
  handleChange: (id: number) => void;
};

function CardList(props: ListProps) {
  const cardItems = props.cards.results.map((item) => (
    <CardItem key={item.id} handleChange={() => props.handleChange} {...item} />
  ));

  return <div className="list">{cardItems}</div>;
}

export default CardList;
