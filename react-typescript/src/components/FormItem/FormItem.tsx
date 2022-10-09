import React from 'react';
import './FormItem.scss';

type ItemProps = {
  id: number;
  name: string;
  surname: string;
  image: string;
};

function FormItem(props: ItemProps) {
  return (
    <div className="form-item">
      <div>Name: {props.name}</div>
      <div>Surname: {props.surname}</div>
      <img className="image" src={props.image} alt={props.image} />
    </div>
  );
}

export default FormItem;
