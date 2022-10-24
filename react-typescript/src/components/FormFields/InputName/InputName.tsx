import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import { quantityCharacters } from 'utils/const/const';
import './InputName.scss';

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

const InputName = ({ register, formState: { errors } }: InputProps) => (
  <div>
    <label htmlFor="input-name">
      Name:
      <input
        id="input-name"
        className="input-name"
        {...register('name', { required: true, minLength: quantityCharacters })}
      />
    </label>
    {!errors.name && <div className="hidden"></div>}
    {errors.name && (
      <div className="error">{`Name must contain at least ${quantityCharacters} character`}</div>
    )}
  </div>
);

export default InputName;
