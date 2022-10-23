import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { quantityCharacters } from 'utils/const/const';

interface IFormInputs {
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
  agree: string;
}

const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input {...register('name', { required: true, minLength: quantityCharacters })} />
      {errors.name && <div>{`Name must contain at least ${quantityCharacters} character`}</div>}
      <label htmlFor="surname">Surname:</label>
      <input {...register('surname', { required: true, minLength: quantityCharacters })} />
      {errors.surname && (
        <div>{`Surname must contain at least ${quantityCharacters} character`}</div>
      )}
      <label htmlFor="image">Image:</label>
      <input type="file" {...register('image', { required: true })} />
      {errors.image && <div>Field must contain image file</div>}
      <input type="date" {...register('date', { required: true })} />
      {errors.image && <div>Field must contain date</div>}
      <label htmlFor="select">Country:</label>
      <select defaultValue="" {...register('select', { required: true })}>
        <option value="" disabled>
          Please select a country
        </option>
        <option value="Russia">Russia</option>
        <option value="Belarus">Belarus</option>
        <option value="Kazakhstan">Kazakhstan</option>
      </select>
      {errors.select && <div>Country must be selected</div>}
      <label>Gender:</label>
      <label htmlFor="male">male</label>
      <input type="radio" value="male" {...register('gender', { required: true })} />
      <label htmlFor="female">female</label>
      <input type="radio" value="female" {...register('gender', { required: true })} />
      {errors.gender && <div>Gender must be checked</div>}
      <label htmlFor="agree">
        <input type="checkbox" {...register('agree', { required: true })} />
        Agree with terms
      </label>
      {errors.agree && <div>Checkbox must be checked</div>}
      <input type="submit" />
    </form>
  );
}

// import React from 'react';
// import { useForm, UseFormReturn, SubmitHandler, FieldValues } from 'react-hook-form';
// import newId from 'utils/newId/newId';

// type InputProps = React.DetailedHTMLProps<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   HTMLInputElement
// >;

// const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
//   <input ref={ref} {...props} />
// ));

// type Option = {
//   label: React.ReactNode;
//   value: string | number | string[];
// };

// type SelectProps = React.DetailedHTMLProps<
//   React.SelectHTMLAttributes<HTMLSelectElement>,
//   HTMLSelectElement
// > & { options: Option[] };

// const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ options, ...props }, ref) => (
//   <select ref={ref} {...props}>
//     {options.map(({ label, value }) => (
//       <option key={newId()} value={value}>
//         {label}
//       </option>
//     ))}
//   </select>
// ));

// type FormProps<TFormValues extends FieldValues> = {
//   onSubmit: SubmitHandler<TFormValues>;
//   children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
// };

// const FormSubmit = <TFormValues extends Record<string, string>>({
//   onSubmit,
//   children,
// }: FormProps<TFormValues>) => {
//   const methods = useForm<TFormValues>();
//   return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
// };

// type FormValues = {
//   firstName: string;
//   lastName: string;
//   sex: string;
// };

// export default function Form() {
//   const onSubmit = (data: FormValues) => console.log(data);

//   return (
//     <FormSubmit<FormValues> onSubmit={onSubmit}>
//       {({ register }) => (
//         <>
//           <Input {...register('firstName')} />
//           <Input {...register('lastName')} />
//           <Select
//             {...register('sex')}
//             options={[
//               { label: 'Female', value: 'female' },
//               { label: 'Male', value: 'male' },
//               { label: 'Other', value: 'other' },
//             ]}
//           />
//           <Input type="submit" />
//         </>
//       )}
//     </FormSubmit>
//   );
// }
