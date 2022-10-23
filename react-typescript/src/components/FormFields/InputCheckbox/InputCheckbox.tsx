import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import './InputCheckbox.scss';

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

const InputCheckbox = ({ register, formState: { errors } }: InputProps) => (
  <div>
    <label htmlFor="agree" className="input-checkbox">
      Agree with terms
      <input type="checkbox" {...register('agree', { required: true })} />
    </label>
    {!errors.agree && <div className="hidden"></div>}
    {errors.agree && <div className="error">Checkbox must be checked</div>}
  </div>
);

export default InputCheckbox;
