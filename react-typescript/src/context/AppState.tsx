import React, { createContext, Dispatch, useReducer } from 'react';
import appReducer from './appReducer';
import { Actions, Card, FormInputs, FormState, HomeState } from './context.types';

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
      data: [] as Array<Card>,
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
      isLoading: false,
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
