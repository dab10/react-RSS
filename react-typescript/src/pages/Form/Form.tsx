import FormList from 'components/FormList/FormList';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { quantityCharacters, timeConfirmationMessage } from 'utils/const/const';
import newId from 'utils/newId/newId';
import './Form.scss';
import classNames from 'classnames';

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

const Form = () => {
  const [formItems, setFormItems] = useState([] as Array<IFormInputs>);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitted, submitCount },
    handleSubmit,
    reset,
    formState,
  } = useForm<IFormInputs>();

  const isSuccessClass = classNames({
    hidden: true,
    'not-hidden': isSuccess,
  });

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

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, timeConfirmationMessage);
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
        <div className={isSuccessClass}>
          <span>✓</span>Saved
        </div>
      </form>
      <div>
        <FormList formItems={formItems} />
      </div>
    </div>
  );
};

export default Form;
