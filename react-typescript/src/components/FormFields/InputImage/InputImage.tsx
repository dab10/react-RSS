import React from 'react';
import './InputImage.scss';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    React.AriaAttributes {}

interface InputImageProps extends InputProps {
  formErrors: {
    image: string;
  };
  handleChange: () => void;
}

type Ref = HTMLInputElement;

const InputImage = React.forwardRef<Ref, InputImageProps>(
  ({ handleChange, formErrors, ...props }, ref) => {
    return (
      <div>
        <label>
          Image:
          <input
            className="input-image"
            type="file"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            ref={ref}
            onChange={handleChange}
          />
        </label>
        <div className={`hidden ${formErrors.image ? 'error' : ''}`} {...props}>
          {formErrors.image}
        </div>
      </div>
    );
  }
);

export default InputImage;
