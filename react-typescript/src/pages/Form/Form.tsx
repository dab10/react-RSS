import FormList from 'components/FormList/FormList';
import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { timeConfirmationMessage } from 'utils/const/const';
import newId from 'utils/newId/newId';
import './Form.scss';
import classNames from 'classnames';
import MyButton from 'components/UI/button/MyButton';
import InputName from 'components/FormFields/InputName/InputName';
import InputSurname from 'components/FormFields/InputSurname/InputSurname';
import InputImage from 'components/FormFields/InputImage/InputImage';
import InputSelect from 'components/FormFields/InputSelect/InputSelect';
import InputDate from 'components/FormFields/InputDate/InputDate';
import InputRadio from 'components/FormFields/InputRadio/InputRadio';
import InputCheckbox from 'components/FormFields/InputCheckbox/InputCheckbox';
import { AppContext } from 'context/AppState';

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
  const { state, dispatch } = useContext(AppContext);

  const {
    register,
    formState: { isDirty, isValid, isSubmitted, submitCount },
    handleSubmit,
    reset,
    formState,
  } = useForm<IFormInputs>();

  const isSuccessClass = classNames({
    hidden: true,
    'not-hidden': state.formPage.isSuccess,
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

    dispatch({
      type: 'ADD_NEW_FORM',
      payload: {
        formPage: {
          formItems: newItem,
        },
      },
    });

    setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE_FALSE' });
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
          <InputName register={register} required formState={formState}></InputName>
          <InputSurname register={register} required formState={formState}></InputSurname>
          <InputImage register={register} required formState={formState}></InputImage>
          <InputDate register={register} required formState={formState}></InputDate>
          <InputSelect register={register} required formState={formState}></InputSelect>
          <InputRadio register={register} required formState={formState}></InputRadio>
          <InputCheckbox register={register} required formState={formState}></InputCheckbox>
          <MyButton
            className="myBtn"
            type="submit"
            disabled={
              (!isDirty && !isSubmitted) ||
              (isDirty && !isValid && isSubmitted) ||
              (!!submitCount && !isValid)
            }
          >
            Submit
          </MyButton>
          <div className={isSuccessClass} data-testid="submit-message">
            <span>✓</span>Saved
          </div>
        </form>
      </div>
      <div>
        <FormList formItems={state.formPage.formItems} />
      </div>
    </div>
  );
};

export default Form;
