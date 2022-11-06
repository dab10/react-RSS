import React, { ChangeEvent, useContext } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import { AppContext } from 'context/AppState';
import { maxLimitPerPage, FilterByStatus, ResultsPerPage, TypeDispatch } from 'utils/const/const';
import Pagination from '@mui/material/Pagination';
import MySelect from 'components/UI/select/MySelect';
import classNames from 'classnames';
import { useFetchData } from 'utils/fetchData/fetchData';

function Home() {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const { state, dispatch } = useContext(AppContext);
  const paginationClass = classNames({ hidden: !state.homePage.data.length });
  const fetchData = useFetchData();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: TypeDispatch.HANDLE_SUBMIT,
      payload: {
        homePage: {
          url: `${characterByName}${state.homePage.query}`,
        },
      },
    });
    await fetchData(
      `${characterByName}${state.homePage.query}&page=1&status=${state.homePage.filterByStatus}`,
      state.homePage.limit
    );
    localStorage.setItem('savedStateSearching', JSON.stringify(state.homePage.query));
  };

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch({
      type: TypeDispatch.HANDLE_CHANGE_FORM,
      payload: {
        homePage: {
          query: value,
        },
      },
    });
  };

  const handleChange = (id: number) => {
    const updatedCards = state.homePage.data.map((todo) => {
      if (todo.id === id) todo.isFavorite = !todo.isFavorite;
      return todo;
    });
    dispatch({
      type: TypeDispatch.HANDLE_CHANGE_LIKES,
      payload: {
        homePage: { data: updatedCards },
      },
    });
  };

  const handleClickToggle = (id = 0) => {
    const cardId = state.homePage.data.findIndex((item) => item.id === id);
    if (id) {
      dispatch({
        type: TypeDispatch.CLOSE_POPUP,
        payload: {
          homePage: { dataPopup: state.homePage.data[cardId] },
        },
      });
    } else {
      dispatch({
        type: TypeDispatch.OPEN_POPUP,
        payload: {
          homePage: { dataPopup: state.homePage.data[cardId] },
        },
      });
    }
  };

  const handleChangePage = async (event: ChangeEvent<unknown>, pageNumber: number) => {
    const chunkSize = Math.ceil(maxLimitPerPage / state.homePage.limit);
    const pageNumberLimit = Math.ceil(pageNumber / chunkSize);

    dispatch({
      type: TypeDispatch.HANDLE_SET_PAGE,
      payload: {
        homePage: { page: pageNumber },
      },
    });
    await fetchData(
      `${characterByName}${state.homePage.query}&page=${pageNumberLimit}&status=${state.homePage.filterByStatus}`,
      state.homePage.limit,
      pageNumber
    );
  };

  const handleChangeLimit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch({
      type: TypeDispatch.HANDLE_CHANGE_LIMIT,
      payload: {
        homePage: { limit: Number(value) },
      },
    });

    if (!state.homePage.isFirstCall) {
      await fetchData(
        `${characterByName}${state.homePage.query}&page=1&status=${state.homePage.filterByStatus}`,
        Number(value)
      );
    } else {
      dispatch({ type: TypeDispatch.LOADING_FALSE });
    }
  };

  const filterItems = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch({
      type: TypeDispatch.FILTER_ITEMS,
      payload: {
        homePage: { filterByStatus: value },
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
        handleChangeForm={handleChangeForm}
        handleSubmit={handleSubmit}
        searching={state.homePage.query}
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
                cards={state.homePage.data}
                handleChange={handleChange}
                handleClickToggle={handleClickToggle}
              />
              <div className={paginationClass}>
                <Pagination
                  count={state.homePage.totalPages}
                  page={state.homePage.page}
                  onChange={handleChangePage}
                />
              </div>
            </>
          )}
        </>
      }
    </div>
  );
}

export default Home;
