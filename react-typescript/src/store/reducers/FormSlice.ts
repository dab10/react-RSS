import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FormInputs = {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
  agree: boolean;
};

type FormState = {
  formItems: FormInputs[];
  isSuccess: boolean;
};

const initialState: FormState = {
  formItems: [],
  isSuccess: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addNewForm(state, action: PayloadAction<FormInputs>) {
      state.formItems.push(action.payload);
      state.isSuccess = true;
    },
    setMessageFalse(state) {
      state.isSuccess = false;
    },
  },
});

export default formSlice.reducer;
export const { addNewForm, setMessageFalse } = formSlice.actions;
