import FormList from 'components/FormList/FormList';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { quantityCharacters } from 'utils/const/const';
import newId from 'utils/newId/newId';

interface IFormInputs {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
  agree: boolean;
}

export default function Form() {
  // const cardInit = [
  //   {
  //     id: 0,
  //     name: '',
  //     surname: '',
  //     image: '',
  //     date: '',
  //     select: '',
  //     agree: false,
  //     gender: '',
  //   },
  // ];

  const [formItems, setFormItems] = useState([] as Array<IFormInputs>);

  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitted, submitCount },
    handleSubmit,
    reset,
    formState,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const url = new Blob([data.image[0]], { type: 'application/json' });
    const newItem = {
      id: newId(),
      name: data.name,
      surname: data.surname,
      image: URL.createObjectURL(url),
      date: data.date,
      select: data.select,
      agree: data.agree,
      gender: data.gender,
    };
    setFormItems([...formItems, newItem]);
    // console.log(isDirty, isValid, isSubmitted, submitCount);
    // reset();
    // clearErrors();
    // console.log(isDirty, isValid, isSubmitted, submitCount);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: '', surname: '', image: '', date: '', select: '', agree: false, gender: '' });
    }
  }, [formState, reset]);

  return (
    <div>
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
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          {...register('image', { required: true })}
        />
        {errors.image && <div>Field must contain image file</div>}
        <input type="date" {...register('date', { required: true })} />
        {errors.date && <div>Field must contain date</div>}
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
        <label htmlFor="agree">Agree with terms</label>
        <input type="checkbox" {...register('agree', { required: true })} />
        {errors.agree && <div>Checkbox must be checked</div>}
        <button
          type="submit"
          disabled={
            (!isDirty && !isSubmitted) ||
            (isDirty && !isValid && isSubmitted) ||
            (!!submitCount && !isValid)
          }
        >
          Submit
        </button>
      </form>
      <div>
        <FormList formItems={formItems} />
      </div>
    </div>
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
