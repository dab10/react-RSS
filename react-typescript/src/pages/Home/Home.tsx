import React, { useContext } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import Popup from 'components/Popup/Popup';
import { AppContext } from 'context/AppState';

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
        type: 'FETCH_SUCCESS',
        payload: {
          homePage: {
            data: updatedCards,
          },
        },
      });
    } catch {
      dispatch({ type: 'FETCH_ERROR' });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: 'HANDLE_SUBMIT',
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
      type: 'HANDLE_CHANGE_FORM',
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
      type: 'HANDLE_CHANGE_LIKES',
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
        type: 'CLOSE_POPUP',
        payload: {
          homePage: {
            dataPopup: state.homePage.data[cardId],
          },
        },
      });
    } else {
      document.body.classList.add('stop-scrolling');
      dispatch({
        type: 'OPEN_POPUP',
        payload: {
          homePage: {
            dataPopup: state.homePage.data[cardId],
          },
        },
      });
    }
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
            </>
          )}
        </>
      }
    </div>
  );
}

export default Home;
