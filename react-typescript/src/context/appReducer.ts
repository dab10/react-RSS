import { TypeDispatch } from 'utils/const/const';
import { Actions, StateType } from './context.types';

const appReducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: action.payload.homePage.data,
          totalPages: action.payload.homePage.totalPages,
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
    case TypeDispatch.HANDLE_SET_PAGE:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          page: action.payload.homePage.page,
          isLoading: true,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
