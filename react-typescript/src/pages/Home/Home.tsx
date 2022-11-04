import React from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import { maxLimitPerPage, FilterByStatus, ResultsPerPage } from 'utils/const/const';
import Pagination from 'components/UI/pagination/Pagination';
import MySelect from 'components/UI/select/MySelect';
import { useAppDispatch, useAppSelector } from 'store/hooks/redux';
import { fetchData } from 'store/reducers/ActionCreator';
import {
  changeLimit,
  changePage,
  closePopup,
  filterItems,
  handleChangeInput,
  handleChangeLikes,
  loadingFalse,
  openPopup,
  setUrlAfterSubmit,
} from 'store/reducers/HomeSlice';
import { Card } from 'store/models/Card';

function Home() {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const dispatch = useAppDispatch();
  const { data, query, filterByStatus, limit, totalPages, page, isFirstCall, isError, isLoading } =
    useAppSelector((state) => state.homeReducer);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setUrlAfterSubmit(`${characterByName}${query}`));
    dispatch(
      // await fetchData(`${characterByName}${query}&page=1&status=${filterByStatus}`, limit)
      await fetchData({
        url: `${characterByName}${query}&page=1&status=${filterByStatus}`,
        limit: limit,
      })
    );
    localStorage.setItem('savedStateSearching', JSON.stringify(query));
  };

  const handleChange = (id: number) => {
    const cloneData = JSON.parse(JSON.stringify(data));
    const updatedCards = cloneData.map((todo: Card) => {
      if (todo.id === id) {
        todo.isFavorite = !todo.isFavorite;
      }
      return todo;
    });
    dispatch(handleChangeLikes(updatedCards));
  };

  const handleClickToggle = (id = 0) => {
    const cardId = data.findIndex((item) => item.id === id);
    if (id) {
      dispatch(closePopup(data[cardId]));
    } else {
      dispatch(openPopup(data[cardId]));
    }
  };

  const handleChangePage = async (pageNumber: number) => {
    const chunkSize = Math.ceil(maxLimitPerPage / limit);
    const pageNumberLimit = Math.ceil(pageNumber / chunkSize);

    dispatch(changePage(pageNumber));
    dispatch(
      await fetchData({
        url: `${characterByName}${query}&page=${pageNumberLimit}&status=${filterByStatus}`,
        limit: limit,
        pageNumber: pageNumber,
      })
    );
  };

  const handleChangeLimit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(changeLimit(Number(value)));

    if (!isFirstCall) {
      dispatch(
        await fetchData({
          url: `${characterByName}${query}&page=1&status=${filterByStatus}`,
          limit: Number(value),
        })
      );
    } else {
      dispatch(loadingFalse());
    }
  };

  const handleFilterItems = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(filterItems(value));

    if (!isFirstCall) {
      dispatch(
        await fetchData({ url: `${characterByName}${query}&page=1&status=${value}`, limit: limit })
      );
    } else {
      dispatch(loadingFalse());
    }
  };

  return (
    <div className="container">
      <SearchBar
        handleChangeForm={(event) => dispatch(handleChangeInput(event.target.value))}
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
          onChange={handleFilterItems}
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
      {isError && !isFirstCall && <div className="error-fetch">Could not fetch the data</div>}
      {
        <>
          {isLoading ? (
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
