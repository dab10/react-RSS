export const routes = {
  homePage: '/',
  formPage: '/form',
  aboutPage: '/about',
  notFoundPage: '/404',
  anyPage: '*',
};

export const quantityCharacters = 2;

export const timeConfirmationMessage = 2000;

export enum TypeDispatch {
  DATA_FROM_LOCAL_STORAGE = 'DATA_FROM_LOCAL_STORAGE',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
  HANDLE_SUBMIT = 'HANDLE_SUBMIT',
  HANDLE_CHANGE_FORM = 'HANDLE_CHANGE_FORM',
  HANDLE_CHANGE_LIKES = 'HANDLE_CHANGE_LIKES',
  CLOSE_POPUP = 'CLOSE_POPUP',
  OPEN_POPUP = 'OPEN_POPUP',
  ADD_NEW_FORM = 'ADD_NEW_FORM',
  SET_MESSAGE_FALSE = 'SET_MESSAGE_FALSE',
  HANDLE_SET_PAGE = 'HANDLE_SET_PAGE',
  HANDLE_CHANGE_LIMIT = 'HANDLE_CHANGE_LIMIT',
  FILTER_ITEMS = 'FILTER_ITEMS',
  LOADING_FALSE = 'LOADING_FALSE',
}

export const maxLimitPerPage = 20;

export enum ResultsPerPage {
  FIVE = 5,
  TEN = 10,
}
