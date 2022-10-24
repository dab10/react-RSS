import React from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { quantityCharacters } from 'utils/const/const';
import './InputSurname.scss';

interface IFormValues {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
  agree: boolean;
}

type InputProps = {
  register: UseFormRegister<IFormValues>;
  required: boolean;
  formState: FormState<IFormValues>;
};

const InputSurname = ({ register, formState: { errors } }: InputProps) => (
  <div>
    <label htmlFor="surname">
      Surname:
      <input
        id="surname"
        className="input-surname"
        {...register('surname', { required: true, minLength: quantityCharacters })}
      />
    </label>
    {!errors.surname && <div className="hidden"></div>}
    {errors.surname && (
      <div className="error">{`Surname must contain at least ${quantityCharacters} character`}</div>
    )}
  </div>
);

export default InputSurname;
