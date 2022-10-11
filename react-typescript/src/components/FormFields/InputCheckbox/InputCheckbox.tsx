import React from 'react';
import MessageError from '../MessageError/MessageError';
import './InputCheckbox.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

interface InputCheckboxProps extends InputProps {
  formErrors: {
    agree: string;
  };
  handleChange: () => void;
}

type Ref = HTMLInputElement;

const InputCheckbox = React.forwardRef<Ref, InputCheckboxProps>(
  ({ handleChange, formErrors, ...props }, ref) => {
    return (
      <div>
        <label className="input-checkbox">
          <input type="checkbox" name="agree" ref={ref} onChange={handleChange} {...props} />
          Agree with terms
        </label>
        <MessageError messageError={formErrors.agree} />
      </div>
    );
  }
);

export default InputCheckbox;
