import React from 'react';
import './InputName.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

interface InputNameProps extends InputProps {
  formErrors: {
    name: string;
  };
  handleChange: () => void;
}

type Ref = HTMLInputElement;

const InputName = React.forwardRef<Ref, InputNameProps>(
  ({ handleChange, formErrors, ...props }, ref) => {
    return (
      <div>
        <label>
          Name:
          <input
            className="input-name"
            type="text"
            name="name"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </label>
        <div className={`hidden ${formErrors.name ? 'error' : ''}`} {...props}>
          {formErrors.name}
        </div>
      </div>
    );
  }
);

export default InputName;
