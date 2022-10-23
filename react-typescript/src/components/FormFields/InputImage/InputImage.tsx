import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import './InputImage.scss';

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

const InputImage = ({ register, formState: { errors } }: InputProps) => (
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
    {!errors.image && <div className="hidden"></div>}
    {errors.image && <div className="error">Field must contain image file</div>}
  </div>
);

export default InputImage;
