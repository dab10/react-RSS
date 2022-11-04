import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'store/models/Card';

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

type ActionHandleSubmit = {
  url: string;
};

type ActionHandleChangeForm = {
  query: string | null;
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
    cardsFetching(state) {
      state.isLoading = true;
    },
    cardsFetchingSuccess(state, action: PayloadAction<ActionFetchSuccess>) {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },
    cardsFetchingError(state) {
      state.data = [];
      state.totalPages = 0;
      state.isLoading = false;
      state.isError = true;
    },
    setUrlAfterSubmit(state, action: PayloadAction<ActionHandleSubmit>) {
      state.url = action.payload.url;
      state.page = 1;
      state.isFirstCall = false;
    },
    handleChangeInput(state, action: PayloadAction<ActionHandleChangeForm>) {
      state.query = action.payload.query;
    },
  },
});

export default homeSlice.reducer;
export const { setUrlAfterSubmit, handleChangeInput } = homeSlice.actions;
