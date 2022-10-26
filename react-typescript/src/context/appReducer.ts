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

export type StateType = {
  homePage: HomeState;
  formPage?: string;
};

const appReducer = (state: StateType, action: { type: string; payload: StateType }) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      const updatedCards = action.payload.homePage.data.results.map((item) => {
        item.isFavorite = false;
        return item;
      });
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: {
            results: updatedCards,
          },
          isLoading: false,
          isError: false,
        },
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          data: {
            results: [],
          },
          isLoading: false,
          isError: true,
        },
      };
    // case COUNT_ZERO:
    //   return {
    //     count: 0,
    //     id: Date.now().toString(),
    //   };
    default:
      return state;
  }
};

export default appReducer;
