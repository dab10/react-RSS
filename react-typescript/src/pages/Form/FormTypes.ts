export type FormProps = Record<string, never>;

export type FormItemState = {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  agree: boolean;
  gender: string;
};

export type FormErrors = {
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  agree: string;
  gender: string;
};

export type FormState = {
  formItems: FormItemState[];
  formErrors: FormErrors;
  nameValid: boolean;
  surnameValid: boolean;
  imageValid: boolean;
  formValid: boolean;
  dateValid: boolean;
  selectValid: boolean;
  agreeValid: boolean;
  genderValid: boolean;
  firstTypingAfterInit: boolean;
};

export enum FieldNumber {
  name,
  surname,
  image,
  date,
  select,
  agree,
  gender,
}

export enum FieldName {
  name = 'name',
  surname = 'surname',
  image = 'image',
  date = 'date',
  select = 'select',
  agree = 'agree',
  gender = 'gender',
}

export enum isCheckTypeOfChecked {
  no,
  yes,
}

export type FieldNumberStrings = keyof typeof FieldNumber;
