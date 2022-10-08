import FormItem from 'components/FormItem/FormItem';
import React from 'react';

type FormItemProps = {
  id: number;
  name: string;
  surname: string;
  image: string;
};

type ListProps = {
  formItems: FormItemProps[];
};

function FormList(props: ListProps) {
  const formItems = props.formItems.map((item) => <FormItem key={item.id} {...item} />);

  return <div>{formItems}</div>;
}

export default FormList;
