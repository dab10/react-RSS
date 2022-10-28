import React, { createContext, Dispatch, useReducer } from 'react';
import appReducer from './appReducer';

type Card = {
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

// type Cards = {
//   results: Card[];
// };

type HomeState = {
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

type FormState = {
  formItems: FormInputs[];
  isSuccess: boolean;
};

type FormInputs = {
  id: number;
  name: string;
  surname: string;
  image: string;
  date: string;
  select: string;
  gender: string;
  agree: boolean;
};

type ActionDataFromLocalStorage = {
  type: 'DATA_FROM_LOCAL_STORAGE';
  payload: {
    homePage: {
      query: string | null;
      url: string;
    };
  };
};
type ActionFetchSuccess = {
  type: 'FETCH_SUCCESS';
  payload: {
    homePage: {
      data: Card[];
    };
  };
};

type ActionFetchError = {
  type: 'FETCH_ERROR';
};

type ActionHandleSubmit = {
  type: 'HANDLE_SUBMIT';
  payload: {
    homePage: {
      url: string;
    };
  };
};

type ActionHandleChangeForm = {
  type: 'HANDLE_CHANGE_FORM';
  payload: {
    homePage: {
      query: string | null;
    };
  };
};

type ActionHandleChangeLikes = {
  type: 'HANDLE_CHANGE_LIKES';
  payload: {
    homePage: {
      data: Card[];
    };
  };
};

type ActionClosePopup = {
  type: 'CLOSE_POPUP';
  payload: {
    homePage: {
      dataPopup: Card;
    };
  };
};

type ActionOpenPopup = {
  type: 'OPEN_POPUP';
  payload: {
    homePage: {
      dataPopup: Card;
    };
  };
};

type ActionAddNewForm = {
  type: 'ADD_NEW_FORM';
  payload: {
    formPage: {
      formItems: FormInputs;
    };
  };
};

type ActionSetMessageFalse = {
  type: 'SET_MESSAGE_FALSE';
};

type Actions =
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

type AppContextType = {
  state: {
    homePage: HomeState;
    formPage: FormState;
  };
  dispatch: Dispatch<Actions>;
};

export const AppContext = createContext({} as AppContextType);

export const AppState = ({ children }: { children: React.ReactNode }) => {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const savedItem = localStorage.getItem('savedStateSearching');
  const parsedItem = savedItem ? JSON.parse(savedItem) : savedItem;

  const initialState = {
    homePage: {
      id: 0,
      data: [
        {
          id: 0,
          image: '',
          name: '',
          status: '',
          species: '',
          type: '',
          gender: '',
          location: {
            name: '',
          },
          isFavorite: false,
        },
      ] as Array<Card>,
      dataPopup: {
        id: 0,
        image: '',
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        location: {
          name: '',
        },
        isFavorite: false,
      } as Card,
      isLoading: true,
      isPopup: false,
      isError: false,
      query: parsedItem ? `${parsedItem}` : null,
      url: parsedItem ? `${characterByName}${parsedItem}` : `${characterByName}null`,
      isFirstCall: parsedItem ? false : true,
    },
    formPage: {
      formItems: [] as FormInputs[],
      isSuccess: false,
    },
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
