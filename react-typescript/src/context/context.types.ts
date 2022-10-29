import { TypeDispatch } from 'utils/const/const';

export type Card = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: {
    name: string;
  };
  isFavorite: boolean;
};

export type HomeState = {
  id: number;
  data: Card[];
  dataPopup: Card;
  query: string | null;
  url: string;
  isLoading: boolean;
  isFirstCall: boolean;
  isPopup: boolean;
  isError: boolean;
};

export type FormState = {
  formItems: FormInputs[];
  isSuccess: boolean;
};

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

export type StateType = {
  homePage: HomeState;
  formPage: FormState;
};

type ActionDataFromLocalStorage = {
  type: TypeDispatch.DATA_FROM_LOCAL_STORAGE;
  payload: {
    homePage: {
      query: string | null;
      url: string;
    };
  };
};

type ActionFetchSuccess = {
  type: TypeDispatch.FETCH_SUCCESS;
  payload: {
    homePage: {
      data: Card[];
    };
  };
};

type ActionFetchError = {
  type: TypeDispatch.FETCH_ERROR;
};

type ActionHandleSubmit = {
  type: TypeDispatch.HANDLE_SUBMIT;
  payload: {
    homePage: {
      url: string;
    };
  };
};

type ActionHandleChangeForm = {
  type: TypeDispatch.HANDLE_CHANGE_FORM;
  payload: {
    homePage: {
      query: string | null;
    };
  };
};

type ActionHandleChangeLikes = {
  type: TypeDispatch.HANDLE_CHANGE_LIKES;
  payload: {
    homePage: {
      data: Card[];
    };
  };
};

type ActionClosePopup = {
  type: TypeDispatch.CLOSE_POPUP;
  payload: {
    homePage: {
      dataPopup: Card;
    };
  };
};

type ActionOpenPopup = {
  type: TypeDispatch.OPEN_POPUP;
  payload: {
    homePage: {
      dataPopup: Card;
    };
  };
};

type ActionAddNewForm = {
  type: TypeDispatch.ADD_NEW_FORM;
  payload: {
    formPage: {
      formItems: FormInputs;
    };
  };
};

type ActionSetMessageFalse = {
  type: TypeDispatch.SET_MESSAGE_FALSE;
};

export type Actions =
  | ActionDataFromLocalStorage
  | ActionFetchSuccess
  | ActionFetchError
  | ActionHandleSubmit
  | ActionHandleChangeForm
  | ActionHandleChangeLikes
  | ActionClosePopup
  | ActionOpenPopup
  | ActionAddNewForm
  | ActionSetMessageFalse;
