import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import './InputDate.scss';

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

const InputDate = ({ register, formState: { errors } }: InputProps) => (
  <div>
    <label>
      Date:
      <input className="input-date" type="date" {...register('date', { required: true })} />
    </label>
    {!errors.date && <div className="hidden"></div>}
    {errors.date && <div className="error">Field must contain date</div>}
  </div>
);

export default InputDate;
