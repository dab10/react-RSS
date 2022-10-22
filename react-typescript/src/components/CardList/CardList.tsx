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

type ListProps = {
  cards: Card[];
  handleChange: (id: number) => void;
  handleClickToggle: (id: number) => void;
};

function CardList(props: ListProps) {
  const cardItems = props.cards.map((item) => (
    <CardItem
      key={item.id}
      handleChange={props.handleChange}
      handleClickToggle={() => props.handleClickToggle(item.id)}
      {...item}
    />
  ));

  return <div className="list">{cardItems}</div>;
}

export default CardList;
