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
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div>
            <label htmlFor="name">
              Name:
              <input
                className="input-name"
                {...register('name', { required: true, minLength: quantityCharacters })}
              />
            </label>
            {errors.name && (
              <div className="error">{`Name must contain at least ${quantityCharacters} character`}</div>
            )}
          </div>
          <div>
            <label htmlFor="surname">
              Surname:
              <input
                className="input-surname"
                {...register('surname', { required: true, minLength: quantityCharacters })}
              />
            </label>
            {errors.surname && (
              <div className="error">{`Surname must contain at least ${quantityCharacters} character`}</div>
            )}
          </div>
          <div>
            <label htmlFor="image">
              Image:
              <input
                className="input-image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                {...register('image', { required: true })}
              />
            </label>
            {errors.image && <div className="error">Field must contain image file</div>}
          </div>
          <div>
            <label>
              Date:
              <input className="input-date" type="date" {...register('date', { required: true })} />
            </label>
            {errors.date && <div className="error">Field must contain date</div>}
          </div>
          <div>
            <label htmlFor="select">
              Country:
              <select
                className="input-select"
                defaultValue=""
                {...register('select', { required: true })}
              >
                <option value="" disabled>
                  Please select a country
                </option>
                <option value="Russia">Russia</option>
                <option value="Belarus">Belarus</option>
                <option value="Kazakhstan">Kazakhstan</option>
              </select>
            </label>
            {errors.select && <div className="error">Country must be selected</div>}
          </div>
          <div>
            <label>
              Gender:
              <div className="input-radio">
                <label htmlFor="male">male</label>
                <input type="radio" value="male" {...register('gender', { required: true })} />
                <label htmlFor="female">female</label>
                <input type="radio" value="female" {...register('gender', { required: true })} />
              </div>
            </label>
            {errors.gender && <div className="error">Gender must be checked</div>}
          </div>
          <div>
            <label htmlFor="agree" className="input-checkbox">
              Agree with terms
              <input type="checkbox" {...register('agree', { required: true })} />
            </label>
            {errors.agree && <div className="error">Checkbox must be checked</div>}
          </div>
          <button
            className="myBtn"
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
      </div>
      <div>
        <FormList formItems={formItems} />
      </div>
    </div>
  );
};

export default Form;
