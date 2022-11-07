export const routes = {
  homePage: '/',
  formPage: '/form',
  aboutPage: '/about',
  notFoundPage: '/notFoundPage',
  anyPage: '*',
};

export const quantityCharacters = 2;

export const timeConfirmationMessage = 2000;

export const maxLimitPerPage = 20;

export enum ResultsPerPage {
  FIVE = 5,
  TEN = 10,
}

export enum FilterByStatus {
  ALIVE = 'alive',
  DEAD = 'dead',
  UNKNOWN = 'unknown',
  ALL = 'all',
}
