import React from 'react';
import './Popup.scss';

type PopupProps = {
  card: {
    id: number;
    image: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    location: {
      name: string;
    };
  };
  active: boolean;
  handleClickToggle: (id: number) => void;
};

const Popup = (props: PopupProps) => {
  console.log(props.card);
  return (
    <div
      className={props.active ? 'modal active' : 'modal'}
      onClick={() => props.handleClickToggle(props.card.id)}
    >
      <div
        className={props.active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__close" onClick={() => props.handleClickToggle(props.card.id)}>
          X
        </div>
        <img src={props.card.image} alt={props.card.name} className="modal__image" />
        <div className="modal__text">
          <div>Base ID: {props.card.id}</div>
          <div>Name: {props.card.name}</div>
          <div>Status: {props.card.status}</div>
          <div>Species: {props.card.species}</div>
          <div>Type: {props.card.type}</div>
          <div>Gender: {props.card.gender}</div>
          <div>Location: {props.card.location.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
