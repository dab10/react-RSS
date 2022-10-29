import React, { useContext } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import Popup from 'components/Popup/Popup';
import { AppContext } from 'context/AppState';
import { TypeDispatch } from 'utils/const/const';
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

  const fetchData = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw Error();
      }
      const updatedCards = data.results.map((item: Card) => {
        item.isFavorite = false;
        return item;
      });
      dispatch({
        type: TypeDispatch.FETCH_SUCCESS,
        payload: {
          homePage: {
            data: updatedCards,
            totalPages: data.info.pages,
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
    await fetchData(`${characterByName}${state.homePage.query}`);
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
    dispatch({
      type: TypeDispatch.HANDLE_SET_PAGE,
      payload: {
        homePage: {
          page: pageNumber,
        },
      },
    });
    await fetchData(`${characterByName}${state.homePage.query}&page=${pageNumber}`);
  };

  return (
    <div className="container">
      <SearchBar
        handleChangeForm={handleChangeForm}
        handleSubmit={handleSubmit}
        searching={state.homePage.query}
      />
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
