import React from 'react';
import './MyButton.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

type Ref = HTMLButtonElement;

const MyButton = React.forwardRef<Ref, ButtonProps>((props, ref) => {
  const { children, ...otherProps } = props;
  return (
    <button ref={ref} {...otherProps} className="myBtn">
      {children}
    </button>
  );
});

export default MyButton;
