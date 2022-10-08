import React from 'react';
import './MyInput.css';

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

type Ref = HTMLInputElement;

const MyInput = React.forwardRef<Ref, InputProps>((props, ref) => {
  return <input className="myInput" ref={ref} {...props} />;
});

export default MyInput;
