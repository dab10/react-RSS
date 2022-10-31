import { TypeDispatch } from 'utils/const/const';
import { Actions, StateType } from './context.types';

const appReducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case TypeDispatch.FETCH_SUCCESS:
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
    case TypeDispatch.FETCH_ERROR:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: [],
          totalPages: 0,
          isLoading: false,
          isError: true,
        },
      };
    case TypeDispatch.DATA_FROM_LOCAL_STORAGE:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          query: action.payload.homePage.query,
          url: action.payload.homePage.url,
          isFirstCall: false,
        },
      };
    case TypeDispatch.HANDLE_SUBMIT:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          url: action.payload.homePage.url,
          page: 1,
          isLoading: true,
          isFirstCall: false,
        },
      };
    case TypeDispatch.HANDLE_CHANGE_FORM:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          query: action.payload.homePage.query,
        },
      };
    case TypeDispatch.HANDLE_CHANGE_LIKES:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: action.payload.homePage.data,
        },
      };
    case TypeDispatch.CLOSE_POPUP:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          dataPopup: action.payload.homePage.dataPopup,
          isPopup: false,
        },
      };
    case TypeDispatch.OPEN_POPUP:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          dataPopup: action.payload.homePage.dataPopup,
          isPopup: true,
        },
      };
    case TypeDispatch.ADD_NEW_FORM:
      return {
        ...state,
        formPage: {
          formItems: [...state.formPage.formItems, action.payload.formPage.formItems],
          isSuccess: true,
        },
      };
    case TypeDispatch.SET_MESSAGE_FALSE:
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
    case TypeDispatch.HANDLE_CHANGE_LIMIT:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          limit: action.payload.homePage.limit,
          isLoading: true,
          page: 1,
        },
      };
    case TypeDispatch.FILTER_ITEMS:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          filterByStatus: action.payload.homePage.filterByStatus,
          isLoading: true,
          page: 1,
        },
      };
    case TypeDispatch.LOADING_FALSE:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          isLoading: false,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
