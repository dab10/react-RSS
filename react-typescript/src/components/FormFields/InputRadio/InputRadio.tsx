import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import './InputRadio.scss';

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

const InputRadio = ({ register, formState: { errors } }: InputProps) => (
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
    {!errors.gender && <div className="hidden"></div>}
    {errors.gender && <div className="error">Gender must be checked</div>}
  </div>
);
export default InputRadio;
