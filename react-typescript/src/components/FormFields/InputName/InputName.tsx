import React from 'react';
import MessageError from '../MessageError/MessageError';
import './InputName.scss';
import { useForm, UseFormReturn, SubmitHandler } from 'react-hook-form';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface InputNameProps extends InputProps {
  formErrors: {
    name: string;
  };
}

type Ref = HTMLInputElement;

const InputName = React.forwardRef<Ref, InputNameProps>(({ formErrors, ...props }, ref) => {
  return (
    <div>
      <label>
        Name:
        <input className="input-name" type="text" name="name" ref={ref} {...props} />
      </label>
      <MessageError messageError={formErrors.name} />
    </div>
  );
});

export default InputName;

// import React from 'react';
// import MessageError from '../MessageError/MessageError';
// import './InputName.scss';

// interface InputProps
//   extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
//     React.AriaAttributes {}

// interface InputNameProps extends InputProps {
//   formErrors: {
//     name: string;
//   };
//   handleChange: () => void;
// }

// type Ref = HTMLInputElement;

// const InputName = React.forwardRef<Ref, InputNameProps>(
//   ({ handleChange, formErrors, ...props }, ref) => {
//     return (
//       <div>
//         <label>
//           Name:
//           <input
//             className="input-name"
//             type="text"
//             name="name"
//             ref={ref}
//             onChange={handleChange}
//             {...props}
//           />
//         </label>
//         <MessageError messageError={formErrors.name} />
//       </div>
//     );
//   }
// );

// export default InputName;
