import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import './InputSelect.scss';

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

const InputSelect = ({ register, formState: { errors } }: InputProps) => (
  <div>
    <label htmlFor="select">
      Country:
      <select className="input-select" defaultValue="" {...register('select', { required: true })}>
        <option value="" disabled>
          Please select a country
        </option>
        <option value="Russia">Russia</option>
        <option value="Belarus">Belarus</option>
        <option value="Kazakhstan">Kazakhstan</option>
      </select>
    </label>
    {!errors.select && <div className="hidden"></div>}
    {errors.select && <div className="error">Country must be selected</div>}
  </div>
);

export default InputSelect;
