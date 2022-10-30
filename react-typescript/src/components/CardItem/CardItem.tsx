import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/const/const';
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
  const router = useNavigate();
  console.log(router);
  return (
    <div className="card-item">
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
      <button
        onClick={() => {
          {
            props ? router(`${routes.homePage}${props.id}`) : router(`${routes.homePage}`);
          }
          props.handleClickToggle(props.id);
        }}
      >
        Open
      </button>
    </div>
  );
}

export default CardItem;
