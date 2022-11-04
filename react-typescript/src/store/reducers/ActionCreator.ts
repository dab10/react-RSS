import { createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from 'store/models/Card';
import { maxLimitPerPage } from 'utils/const/const';
import { getPageCount } from 'utils/pagination/getPageCount';

export const fetchData = createAsyncThunk(
  'data/fetch',
  async (
    {
      url,
      limit = maxLimitPerPage,
      pageNumber = 1,
    }: {
      url: string;
      limit?: number;
      pageNumber?: number;
    },
    { rejectWithValue }
  ) => {
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
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw Error();
      }

      const updatedCards = data.results.slice(sliceLeft, sliceRight).map((item: Card) => {
        item.isFavorite = false;
        return item;
      });

      return { data: updatedCards, totalPages: getPageCount(data.info.count, limit) };
    } catch {
      return rejectWithValue(true);
    }
  }
);
