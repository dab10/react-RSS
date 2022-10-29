import React, { useContext } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import Popup from 'components/Popup/Popup';
import { AppContext } from 'context/AppState';
import { TypeDispatch } from 'utils/const/const';
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

  const fetchData = async (url: string, limit = 20, pageNumber = 1) => {
    let sliceLeft;
    let sliceRight;
    console.log(pageNumber, limit);
    if (limit === 5) {
      if (pageNumber % 4 === 1) {
        sliceLeft = 0;
        sliceRight = 5;
      } else if (pageNumber % 4 === 2) {
        sliceLeft = 5;
        sliceRight = 10;
      } else if (pageNumber % 4 === 3) {
        sliceLeft = 10;
        sliceRight = 15;
      } else if (pageNumber % 4 === 0) {
        sliceLeft = 15;
        sliceRight = 20;
      }
    } else if (limit === 10) {
      if (pageNumber % 2 === 1) {
        sliceLeft = 0;
        sliceRight = 10;
      } else if (pageNumber % 2 === 0) {
        sliceLeft = 10;
        sliceRight = 20;
      }
    } else {
      sliceLeft = 0;
      sliceRight = 20;
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
    let pageNumberLimit;
    if (state.homePage.limit === 5) {
      pageNumberLimit = Math.ceil(pageNumber / 4);
    } else if (state.homePage.limit === 10) {
      pageNumberLimit = Math.ceil(pageNumber / 2);
    } else {
      pageNumberLimit = pageNumber;
    }

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
    let pageNumberLimit;
    if (Number(value) === 5) {
      pageNumberLimit = Math.ceil(state.homePage.page / 4);
    } else if (Number(value) === 10) {
      pageNumberLimit = Math.ceil(state.homePage.page / 2);
    } else {
      pageNumberLimit = state.homePage.page;
    }
    dispatch({
      type: TypeDispatch.HANDLE_CHANGE_LIMIT,
      payload: {
        homePage: {
          limit: Number(value),
        },
      },
    });
    console.log('x', pageNumberLimit, Number(value));
    await fetchData(`${characterByName}${state.homePage.query}&page=1`, Number(value));
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
          <select defaultValue={'20'} onChange={handleChangeLimit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
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
