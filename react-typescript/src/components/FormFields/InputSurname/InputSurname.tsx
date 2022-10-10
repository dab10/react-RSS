import React from 'react';
import './InputSurname.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

interface InputSurnameProps extends InputProps {
  formErrors: {
    surname: string;
  };
  handleChange: () => void;
}

type Ref = HTMLInputElement;

const InputSurname = React.forwardRef<Ref, InputSurnameProps>(
  ({ handleChange, formErrors, ...props }, ref) => {
    return (
      <div>
        <label>
          Surname:
          <input
            className="input-surname"
            type="text"
            name="surname"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </label>
        <div className={`hidden ${formErrors.surname ? 'error' : ''}`} {...props}>
          {formErrors.surname}
        </div>
      </div>
    );
  }
);

export default InputSurname;
