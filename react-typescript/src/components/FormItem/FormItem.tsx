import React from 'react';
import './FormItem.scss';

type ItemProps = {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
};

function FormItem(props: ItemProps) {
  return (
    <div className="form-item">
      <img className="image" src={props.image} alt={props.image} />
      <div>Name: {props.name}</div>
      <div>Surname: {props.surname}</div>
      <div>Date of birth: {props.date}</div>
      <div>Country: {props.select}</div>
      <div>Gender: {props.gender}</div>
    </div>
  );
}

export default FormItem;
