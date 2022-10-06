import React from 'react';
import './MyButton.module.css';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

class MyButton extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <button {...props} className="myBtn">
        {children}
      </button>
    );
  }
}

export default MyButton;
