import React from 'react';
import MessageError from '../MessageError/MessageError';
import './InputDate.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

interface InputDateProps extends InputProps {
  formErrors: {
    date: string;
  };
  handleChange: () => void;
}

type Ref = HTMLInputElement;

const InputDate = React.forwardRef<Ref, InputDateProps>(
  ({ handleChange, formErrors, ...props }, ref) => {
    return (
      <div>
        <label>
          Date:
          <input
            className="input-date"
            type="date"
            name="date"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </label>
        <MessageError messageError={formErrors.date} />
      </div>
    );
  }
);

export default InputDate;
