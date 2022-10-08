import React from 'react';

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
      <img src={props.image} alt={props.image} />
    </div>
  );
}

export default FormItem;
