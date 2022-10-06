import React from 'react';

type ItemProps = {
  id: number;
  name: string;
  surname: string;
};

class FormItem extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
  }

  render() {
    return (
      <div className="form-item">
        <div>Name: {this.props.name}</div>
        <div>Surname: {this.props.surname}</div>
      </div>
    );
  }
}

export default FormItem;
