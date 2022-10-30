import React, { useContext } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import Popup from 'components/Popup/Popup';
import { AppContext } from 'context/AppState';
import { maxLimitPerPage, ResultsPerPage, TypeDispatch } from 'utils/const/const';
import { getPageCount } from 'utils/pagination/getPageCount';
import Pagination from 'components/UI/pagination/Pagination';

function Home() {
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

  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const { state, dispatch } = useContext(AppContext);

  const fetchData = async (url: string, limit = maxLimitPerPage, pageNumber = 1) => {
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
      console.log(res.ok);
      if (!res.ok) {
        throw Error();
      }
      const updatedCards = data.results.slice(sliceLeft, sliceRight).map((item: Card) => {
        item.isFavorite = false;
        return item;
      });
      dispatch({
        type: TypeDispatch.FETCH_SUCCESS,
        payload: {
          homePage: {
            data: updatedCards,
            totalPages: getPageCount(data.info.count, limit),
          },
        },
      });
    } catch {
      console.log('111');
      dispatch({ type: TypeDispatch.FETCH_ERROR });
    }
  };

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
    await fetchData(`${characterByName}${state.homePage.query}`, state.homePage.limit);
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
      if (todo.id === id) {
        todo.isFavorite = !todo.isFavorite;
      }
      return todo;
    });
    dispatch({
      type: TypeDispatch.HANDLE_CHANGE_LIKES,
      payload: {
        homePage: {
          data: updatedCards,
        },
      },
    });
  };

  const handleClickToggle = (id = 0) => {
    const cardId = state.homePage.data.findIndex((item) => item.id === id);
    if (state.homePage.isPopup && id) {
      document.body.classList.remove('stop-scrolling');
      dispatch({
        type: TypeDispatch.CLOSE_POPUP,
        payload: {
          homePage: {
            dataPopup: state.homePage.data[cardId],
          },
        },
      });
    } else {
      document.body.classList.add('stop-scrolling');
      dispatch({
        type: TypeDispatch.OPEN_POPUP,
        payload: {
          homePage: {
            dataPopup: state.homePage.data[cardId],
          },
        },
      });
    }
  };

  const handleChangePage = async (pageNumber: number) => {
    const chunkSize = Math.ceil(maxLimitPerPage / state.homePage.limit);
    const pageNumberLimit = Math.ceil(pageNumber / chunkSize);

    dispatch({
      type: TypeDispatch.HANDLE_SET_PAGE,
      payload: {
        homePage: {
          page: pageNumber,
        },
      },
    });
    await fetchData(
      `${characterByName}${state.homePage.query}&page=${pageNumberLimit}`,
      state.homePage.limit,
      pageNumber
    );
  };

  const handleChangeLimit = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const chunkSize = Math.ceil(maxLimitPerPage / Number(value));
    const pageNumberLimit = Math.ceil(state.homePage.page / chunkSize);

    dispatch({
      type: TypeDispatch.HANDLE_CHANGE_LIMIT,
      payload: {
        homePage: {
          limit: Number(value),
        },
      },
    });
    console.log('x', pageNumberLimit, Number(value));
    if (!state.homePage.isFirstCall) {
      await fetchData(`${characterByName}${state.homePage.query}&page=1`, Number(value));
    } else {
      dispatch({ type: TypeDispatch.FETCH_ERROR });
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
        <label htmlFor="select">
          Кол-во элементов на странице:&ensp;
          <select defaultValue={maxLimitPerPage} onChange={handleChangeLimit}>
            <option value={ResultsPerPage.FIVE}>{ResultsPerPage.FIVE}</option>
            <option value={ResultsPerPage.TEN}>{ResultsPerPage.TEN}</option>
            <option value={maxLimitPerPage}>{maxLimitPerPage}</option>
          </select>
        </label>
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
              <Popup
                card={state.homePage.dataPopup}
                active={state.homePage.isPopup}
                handleClickToggle={handleClickToggle}
              />
              <Pagination
                totalPages={state.homePage.totalPages}
                page={state.homePage.page}
                handleChangePage={handleChangePage}
              />
            </>
          )}
        </>
      }
    </div>
  );
}

export default Home;
