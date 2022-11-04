import { createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from 'store/models/Card';
import { AppDispatch } from 'store/store';
import { maxLimitPerPage } from 'utils/const/const';
import { getPageCount } from 'utils/pagination/getPageCount';
import { homeSlice } from './HomeSlice';

export const fetchData =
  async (url: string, limit = maxLimitPerPage, pageNumber = 1) =>
  async (dispatch: AppDispatch) => {
    const arrayFromZeroToMaxLimit = [...Array(maxLimitPerPage).keys()];
    const chunkSize = Math.ceil(maxLimitPerPage / limit);
    let count = 1;
    let sliceLeft;
    let sliceRight;

    for (let i = 0; i < maxLimitPerPage; i += limit) {
      const chunk = arrayFromZeroToMaxLimit.slice(i, i + limit);
      const sliceLeftChunk = Math.min(...chunk);
      const sliceRightChunk = Math.max(...chunk);

      if (pageNumber % chunkSize === count) {
        sliceLeft = sliceLeftChunk;
        sliceRight = sliceRightChunk + 1;
      }
      count++;
      count === chunkSize ? (count = 0) : count;
    }

    try {
      dispatch(homeSlice.actions.cardsFetching());
      const res = await fetch(url);
      const data = await res.json();

      const updatedCards = data.results.slice(sliceLeft, sliceRight).map((item: Card) => {
        item.isFavorite = false;
        return item;
      });

      dispatch(
        homeSlice.actions.cardsFetchingSuccess({
          data: updatedCards,
          totalPages: getPageCount(data.info.count, limit),
        })
      );
    } catch (e) {
      dispatch(homeSlice.actions.cardsFetchingError());
    }
  };

// export const fetchData = createAsyncThunk(
//   'data/detchAll',
//   async (_, thunkAPI) => {
//   }
// )
