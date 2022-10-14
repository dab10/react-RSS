export const routes = {
  homePage: '/',
  formPage: '/form',
  aboutPage: '/about',
  notFoundPage: '/404',
  anyPage: '*',
};

export const quantityCharacters = 2;

export const timeConfirmationMessage = 2000;

export const stateInit = {
  formItems: [],
  formErrors: {
    name: '',
    surname: '',
    image: '',
    date: '',
    select: '',
    agree: '',
    gender: '',
  },
  nameValid: false,
  surnameValid: false,
  imageValid: false,
  dateValid: false,
  selectValid: false,
  agreeValid: false,
  genderValid: false,
  formValid: false,
  firstTypingAfterInit: true,
};
