import React, { createContext, Dispatch, useReducer } from 'react';
import appReducer, { StateType } from './appReducer';

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

type Cards = {
  results: Card[];
};

type HomeState = {
  data: Cards;
  dataPopup: Card;
  query: string | null;
  url: string;
  isLoading: boolean;
  isFirstCall: boolean;
  isPopup: boolean;
  isError: boolean;
};

type AppContextType = {
  state: {
    homePage: HomeState;
    formPage?: string;
  };
  dispatch: Dispatch<{ type: string; payload: StateType }>;
};

export const AppContext = createContext({} as AppContextType);

export const AppState = ({ children }: { children: React.ReactNode }) => {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const savedItem = localStorage.getItem('savedStateSearching');
  const parsedItem = savedItem ? JSON.parse(savedItem) : savedItem;

  const initialState = {
    homePage: {
      data: {
        results: [
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
        ],
      },
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
      },
      isLoading: true,
      isPopup: false,
      isError: false,
      query: parsedItem ? `${parsedItem}` : null,
      url: parsedItem ? `${characterByName}${parsedItem}` : `${characterByName}null`,
      isFirstCall: parsedItem ? false : true,
    },
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
