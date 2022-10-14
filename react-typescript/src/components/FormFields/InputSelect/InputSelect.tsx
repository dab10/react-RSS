import React from 'react';
import MessageError from '../MessageError/MessageError';
import './InputSelect.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    React.AriaAttributes {}

interface InputSelectProps extends InputProps {
  formErrors: {
    select: string;
  };
  handleChange: () => void;
}

type Ref = HTMLSelectElement;

const InputSelect = React.forwardRef<Ref, InputSelectProps>(
  ({ handleChange, defaultValue, formErrors, ...props }, ref) => {
    return (
      <div>
        <label>
          Country:
          <select
            className="input-select"
            name="select"
            ref={ref}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...props}
          >
            <option value="" disabled>
              Please select a country
            </option>
            <option value="Russia">Russia</option>
            <option value="Belarus">Belarus</option>
            <option value="Kazakhstan">Kazakhstan</option>
          </select>
        </label>
        <MessageError messageError={formErrors.select} />
      </div>
    );
  }
);

export default InputSelect;
