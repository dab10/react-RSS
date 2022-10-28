import React, { useContext, useEffect, useState } from 'react';
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
  // const stateInit = [
  //   {
  //     id: 0,
  //     image: '',
  //     name: '',
  //     status: '',
  //     species: '',
  //     type: '',
  //     gender: '',
  //     location: {
  //       name: '',
  //     },
  //     isFavorite: false,
  //   },
  // ];
  // const stateInitPopup = {
  //   id: 0,
  //   image: '',
  //   name: '',
  //   status: '',
  //   species: '',
  //   type: '',
  //   gender: '',
  //   location: {
  //     name: '',
  //   },
  //   isFavorite: false,
  // };

  // const [data, setData] = useState(stateInit);
  // const [dataPopup, setDataPopup] = useState(stateInitPopup);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [isPopup, setIsPopup] = useState(false);
  // const [isFirstCall, setIsFirstCall] = useState(() => {
  //   const savedItem = localStorage.getItem('savedStateSearching') as string;
  //   const parsedItem = savedItem ? JSON.parse(savedItem) : savedItem;
  //   return parsedItem ? false : true;
  // });
  // const [query, setQuery] = useState(() => {
  //   const savedItem = localStorage.getItem('savedStateSearching') as string;
  //   const parsedItem = savedItem ? JSON.parse(savedItem) : savedItem;
  //   return parsedItem ? `${parsedItem}` : null;
  // });
  // const [url, setUrl] = useState(() => {
  //   const savedItem = localStorage.getItem('savedStateSearching') as string;
  //   const parsedItem = savedItem ? JSON.parse(savedItem) : savedItem;
  //   return parsedItem ? `${characterByName}${parsedItem}` : `${characterByName}null`;
  // });

  // useEffect(() => {
  //   const saveSearching = localStorage.getItem('savedStateSearching');
  //   if (saveSearching && JSON.parse(saveSearching)) {
  //     // setQuery(`${JSON.parse(saveSearching)}`);
  //     // setUrl(`${characterByName}${JSON.parse(saveSearching)}`);
  //     // setIsFirstCall(false);
  //     dispatch({
  //       type: 'DATA_FROM_LOCAL_STORAGE',
  //       payload: {
  //         homePage: {
  //           query: `${JSON.parse(saveSearching)}`,
  //           url: `${characterByName}${JSON.parse(saveSearching)}`,
  //         },
  //       },
  //     });
  //   }
  // }, [characterByName, dispatch]);

  // useEffect(() => {
  //   localStorage.setItem('savedStateSearching', JSON.stringify(state.homePage.query));
  // });

  useEffect(() => {
    const fetchData = async () => {
      // setIsError(false);
      // setIsLoading(true);
      // console.log(state.homePage.query);
      try {
        const res = await fetch(state.homePage.url);
        const data = await res.json();
        if (!res.ok) {
          throw Error();
        }
        // setData(data.results);
        // setData((prevData) => {
        //   const updatedCards = prevData.map((item) => {
        //     item.isFavorite = false;
        //     return item;
        //   });
        //   return updatedCards;
        // });
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
        // setIsError(true);
        // setData([]);
        dispatch({ type: 'FETCH_ERROR' });
      }
      // setIsLoading(false);
    };

    fetchData();
  }, [characterByName, dispatch, state.homePage.url]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: 'HANDLE_SUBMIT',
      payload: {
        homePage: {
          url: `${characterByName}${state.homePage.query}`,
        },
      },
    });
    localStorage.setItem('savedStateSearching', JSON.stringify(state.homePage.query));
    // setUrl(`${characterByName}${query}`);
    // setIsFirstCall(false);
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
    // setQuery(value);
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
    // setData((prevData) => {
    //   const updatedCards = prevData.map((todo) => {
    //     if (todo.id === id) {
    //       todo.isFavorite = !todo.isFavorite;
    //     }
    //     return todo;
    //   });
    //   return updatedCards;
    // });
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
      // setDataPopup(data[cardId]);
      // setIsPopup(false);
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
      // setDataPopup(data[cardId]);
      // setIsPopup(true);
    }
  };

  return (
    <div className="container">
      {console.log(state.homePage)}
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
