import FormItem from 'components/FormItem/FormItem';
import React from 'react';
import './FormList.scss';

type FormItemProps = {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
};

type ListProps = {
  formItems: FormItemProps[];
};

function FormList(props: ListProps) {
  const formItems = props.formItems.map((item) => <FormItem key={item.id} {...item} />);

  return <div className="items">{formItems}</div>;
}

export default FormList;
