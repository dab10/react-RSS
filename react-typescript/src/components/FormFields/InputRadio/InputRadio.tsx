import React from 'react';
import './InputRadio.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

interface InputRadioProps extends InputProps {
  gender: 'male' | 'female';
  handleChange: () => void;
}

type Ref = HTMLInputElement;

const InputRadio = React.forwardRef<Ref, InputRadioProps>(
  ({ gender, handleChange, ...props }, ref) => {
    return (
      <>
        <label htmlFor={gender}>{gender}</label>
        <input
          type="radio"
          name="gender"
          value={gender}
          id={gender}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
      </>
    );
  }
);

export default InputRadio;
