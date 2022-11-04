import React, { useContext } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import { AppContext } from 'context/AppState';
import { maxLimitPerPage, FilterByStatus, ResultsPerPage, TypeDispatch } from 'utils/const/const';
import { getPageCount } from 'utils/pagination/getPageCount';
import Pagination from 'components/UI/pagination/Pagination';
import MySelect from 'components/UI/select/MySelect';
import { Card } from './Home.types';
import { useAppDispatch, useAppSelector } from 'store/hooks/redux';
import { fetchData } from 'store/reducers/ActionCreator';
import {
  changeLimit,
  changePage,
  closePopup,
  handleChangeInput,
  handleChangeLikes,
  loadingFalse,
  openPopup,
  setUrlAfterSubmit,
} from 'store/reducers/HomeSlice';

function Home() {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const { state, dispatch } = useContext(AppContext);
  const dispatch1 = useAppDispatch();
  const { data, url, query, filterByStatus, limit, totalPages, page, isFirstCall } = useAppSelector(
    (state) => state.homeReducer
  );

  // const fetchData = async (url: string, limit = maxLimitPerPage, pageNumber = 1) => {
  //   const arrayFromZeroToMaxLimit = [...Array(maxLimitPerPage).keys()];
  //   const chunkSize = Math.ceil(maxLimitPerPage / limit);
  //   let count = 1;
  //   let sliceLeft;
  //   let sliceRight;

  //   for (let i = 0; i < maxLimitPerPage; i += limit) {
  //     const chunk = arrayFromZeroToMaxLimit.slice(i, i + limit);
  //     const sliceLeftChunk = Math.min(...chunk);
  //     const sliceRightChunk = Math.max(...chunk);

  //     if (pageNumber % chunkSize === count) {
  //       sliceLeft = sliceLeftChunk;
  //       sliceRight = sliceRightChunk + 1;
  //     }
  //     count++;
  //     count === chunkSize ? (count = 0) : count;
  //   }

  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw Error();
  //     }

  //     const updatedCards = data.results.slice(sliceLeft, sliceRight).map((item: Card) => {
  //       item.isFavorite = false;
  //       return item;
  //     });
  //     dispatch({
  //       type: TypeDispatch.FETCH_SUCCESS,
  //       payload: {
  //         homePage: {
  //           data: updatedCards,
  //           totalPages: getPageCount(data.info.count, limit),
  //         },
  //       },
  //     });
  //   } catch {
  //     dispatch({ type: TypeDispatch.FETCH_ERROR });
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch1(setUrlAfterSubmit(`${characterByName}${query}`));
    dispatch1(await fetchData(`${characterByName}${query}&page=1&status=${filterByStatus}`, limit));
    localStorage.setItem('savedStateSearching', JSON.stringify(query));
  };

  // const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   dispatch({
  //     type: TypeDispatch.HANDLE_CHANGE_FORM,
  //     payload: {
  //       homePage: {
  //         query: value,
  //       },
  //     },
  //   });
  // };

  const handleChange = (id: number) => {
    const updatedCards = data.map((todo) => {
      if (todo.id === id) {
        todo.isFavorite = !todo.isFavorite;
      }
      return todo;
    });
    dispatch1(handleChangeLikes(updatedCards));
  };

  // const handleClickToggle = (id = 0) => {
  //   const cardId = state.homePage.data.findIndex((item) => item.id === id);
  //   if (id) {
  //     dispatch({
  //       type: TypeDispatch.CLOSE_POPUP,
  //       payload: {
  //         homePage: {
  //           dataPopup: state.homePage.data[cardId],
  //         },
  //       },
  //     });
  //   } else {
  //     dispatch({
  //       type: TypeDispatch.OPEN_POPUP,
  //       payload: {
  //         homePage: {
  //           dataPopup: state.homePage.data[cardId],
  //         },
  //       },
  //     });
  //   }
  // };

  const handleClickToggle = (id = 0) => {
    const cardId = data.findIndex((item) => item.id === id);
    if (id) {
      dispatch1(closePopup(data[cardId]));
    } else {
      dispatch1(openPopup(data[cardId]));
    }
  };

  const handleChangePage = async (pageNumber: number) => {
    const chunkSize = Math.ceil(maxLimitPerPage / limit);
    const pageNumberLimit = Math.ceil(pageNumber / chunkSize);

    dispatch1(changePage(pageNumber));
    dispatch1(
      await fetchData(
        `${characterByName}${query}&page=${pageNumberLimit}&status=${filterByStatus}`,
        limit,
        pageNumber
      )
    );
  };

  const handleChangeLimit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch1(changeLimit(Number(value)));

    if (!isFirstCall) {
      dispatch1(
        await fetchData(`${characterByName}${query}&page=1&status=${filterByStatus}`, Number(value))
      );
    } else {
      dispatch1(loadingFalse());
    }
  };

  const filterItems = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch({
      type: TypeDispatch.FILTER_ITEMS,
      payload: {
        homePage: {
          filterByStatus: value,
        },
      },
    });

    if (!state.homePage.isFirstCall) {
      await fetchData(
        `${characterByName}${state.homePage.query}&page=1&status=${value}`,
        state.homePage.limit
      );
    } else {
      dispatch({ type: TypeDispatch.LOADING_FALSE });
    }
  };

  return (
    <div className="container">
      <SearchBar
        handleChangeForm={(event) => dispatch1(handleChangeInput(event.target.value))}
        handleSubmit={handleSubmit}
        searching={query}
      />
      <div className="limit-wrapper">
        <MySelect
          label="Filter by status:"
          defaultValue=""
          options={[
            { name: FilterByStatus.ALIVE, value: FilterByStatus.ALIVE },
            { name: FilterByStatus.DEAD, value: FilterByStatus.DEAD },
            { name: FilterByStatus.UNKNOWN, value: FilterByStatus.UNKNOWN },
            { name: FilterByStatus.ALL, value: '' },
          ]}
          onChange={filterItems}
        />
        <MySelect
          label="Number of elements per page:"
          defaultValue={maxLimitPerPage}
          options={[
            { name: ResultsPerPage.FIVE, value: ResultsPerPage.FIVE },
            { name: ResultsPerPage.TEN, value: ResultsPerPage.TEN },
            { name: maxLimitPerPage, value: maxLimitPerPage },
          ]}
          onChange={handleChangeLimit}
        />
      </div>
      {state.homePage.isError && !state.homePage.isFirstCall && (
        <div className="error-fetch">Could not fetch the data</div>
      )}
      {
        <>
          {state.homePage.isLoading ? (
            <div className="loader">
              <div></div>
            </div>
          ) : (
            <>
              <CardList
                cards={data}
                handleChange={handleChange}
                handleClickToggle={handleClickToggle}
              />
              <Pagination totalPages={totalPages} page={page} handleChangePage={handleChangePage} />
            </>
          )}
        </>
      }
    </div>
  );
}

export default Home;
