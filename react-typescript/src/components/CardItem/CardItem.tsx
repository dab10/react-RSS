import React from 'react';
import './CardItem.scss';

type CardProps = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  isFavorite: boolean;
  handleChange: (id: number) => void;
  handleClickToggle: (id: number) => void;
};

function CardItem(props: CardProps) {
  return (
    <div className="card-item" onClick={() => props.handleClickToggle(props.id)}>
      <img src={props.image} alt={props.name} className="card-item__image" />
      <div className="about-container">
        <div className="about-container__text">
          <div>Name: {props.name}</div>
          <div>Status: {props.status}</div>
          <div>Species: {props.species}</div>
          <div>Gender: {props.gender}</div>
        </div>
        <div className="about-container__like">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={props.isFavorite}
              onChange={() => props.handleChange(props.id)}
            />
            <span></span>
          </label>
        </div>
      </div>
      <div>{props.isFavorite}</div>
    </div>
  );
}

export default CardItem;
