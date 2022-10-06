import FormItem from 'components/FormItem/FormItem';
import React from 'react';

type FormItemProps = {
  id: number;
  name: string;
  surname: string;
};

type ListProps = {
  formItems: FormItemProps[];
};

class FormList extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  render() {
    const formItems = this.props.formItems.map((item) => <FormItem key={item.id} {...item} />);

    return <div>{formItems}</div>;
  }
}

export default FormList;
