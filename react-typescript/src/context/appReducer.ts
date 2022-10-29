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

export type StateType = {
  homePage: HomeState;
  formPage: FormState;
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

// type Action = {
//   homePage: {
//     id: number;
//     data: Card[];
//     dataPopup: Card;
//     query: string | null;
//     url: string;
//   };
// };

const appReducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: action.payload.homePage.data,
          isLoading: false,
          isError: false,
        },
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: [],
          isLoading: false,
          isError: true,
        },
      };
    case 'DATA_FROM_LOCAL_STORAGE':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          query: action.payload.homePage.query,
          url: action.payload.homePage.url,
          isFirstCall: false,
        },
      };
    case 'HANDLE_SUBMIT':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          url: action.payload.homePage.url,
          isLoading: true,
          isFirstCall: false,
        },
      };
    case 'HANDLE_CHANGE_FORM':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          query: action.payload.homePage.query,
        },
      };
    case 'HANDLE_CHANGE_LIKES':
      // const updatedCardsLike = state.homePage.data.map((todo) => {
      //   if (todo.id === action.payload.homePage.id) {
      //     todo.isFavorite = !todo.isFavorite;
      //   }
      //   return todo;
      // });
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: action.payload.homePage.data,
        },
      };
    case 'CLOSE_POPUP':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          dataPopup: action.payload.homePage.dataPopup,
          isPopup: false,
        },
      };
    case 'OPEN_POPUP':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          dataPopup: action.payload.homePage.dataPopup,
          isPopup: true,
        },
      };
    case 'ADD_NEW_FORM':
      return {
        ...state,
        formPage: {
          formItems: [...state.formPage.formItems, action.payload.formPage.formItems],
          isSuccess: true,
        },
      };
    case 'SET_MESSAGE_FALSE':
      return {
        ...state,
        formPage: {
          ...state.formPage,
          isSuccess: false,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
