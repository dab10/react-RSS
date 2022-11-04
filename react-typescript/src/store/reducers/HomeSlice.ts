import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'store/models/Card';
import { fetchData } from './ActionCreator';

type HomeState = {
  id: number;
  data: Card[];
  dataPopup: Card;
  totalPages: number;
  limit: number;
  page: number;
  filterByStatus: string;
  query: string | null;
  url: string;
  isLoading: boolean;
  isFirstCall: boolean;
  isPopup: boolean;
  isError: boolean;
};

type ActionFetchSuccess = {
  data: Card[];
  totalPages: number;
};

const base = 'https://rickandmortyapi.com/api';
const characterByName = `${base}/character/?name=`;
const savedItem = localStorage.getItem('savedStateSearching');
const parsedItem = savedItem ? JSON.parse(savedItem) : savedItem;
const initialState: HomeState = {
  id: 0,
  data: [],
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
  totalPages: 0,
  limit: 20,
  page: 1,
  filterByStatus: '',
  isLoading: false,
  isPopup: false,
  isError: false,
  query: parsedItem ? `${parsedItem}` : null,
  url: parsedItem ? `${characterByName}${parsedItem}` : `${characterByName}null`,
  isFirstCall: parsedItem ? false : true,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // cardsFetching(state) {
    //   state.isLoading = true;
    // },
    // cardsFetchingSuccess(state, action: PayloadAction<ActionFetchSuccess>) {
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.data = action.payload.data;
    //   state.totalPages = action.payload.totalPages;
    // },
    // cardsFetchingError(state) {
    //   state.data = [];
    //   state.totalPages = 0;
    //   state.isLoading = false;
    //   state.isError = true;
    // },
    setUrlAfterSubmit(state, action: PayloadAction<string>) {
      state.url = action.payload;
      state.page = 1;
      state.isFirstCall = false;
    },
    handleChangeInput(state, action: PayloadAction<string | null>) {
      state.query = action.payload;
    },
    handleChangeLikes(state, action: PayloadAction<Card[]>) {
      state.data = action.payload;
    },
    closePopup(state, action: PayloadAction<Card>) {
      state.dataPopup = action.payload;
      state.isPopup = false;
    },
    openPopup(state, action: PayloadAction<Card>) {
      state.dataPopup = action.payload;
      state.isPopup = true;
    },
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    changeLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    loadingFalse(state) {
      state.isLoading = false;
    },
    filterItems(state, action: PayloadAction<string>) {
      state.filterByStatus = action.payload;
      state.page = 1;
    },
  },
  extraReducers: {
    [fetchData.fulfilled.type]: (state, action: PayloadAction<ActionFetchSuccess>) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },
    [fetchData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchData.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.data = [];
      state.totalPages = 0;
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const {
  setUrlAfterSubmit,
  handleChangeInput,
  handleChangeLikes,
  closePopup,
  openPopup,
  changePage,
  changeLimit,
  loadingFalse,
  filterItems,
} = homeSlice.actions;
