import React, { useEffect, useState } from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';
import Popup from 'components/Popup/Popup';

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

function Home() {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const stateInit = [
    {
      id: 0,
      image: '',
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      location: {
        name: '',
      },
      isFavorite: false,
    },
  ];
  const stateInitPopup = {
    id: 0,
    image: '',
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    location: {
      name: '',
    },
    isFavorite: false,
  };

  const [data, setData] = useState(stateInit);
  const [dataPopup, setDataPopup] = useState(stateInitPopup);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isFirstCall, setIsFirstCall] = useState(() => {
    const savedItem = localStorage.getItem('savedStateSearching') as string;
    const parsedItem = JSON.parse(savedItem);
    return parsedItem ? false : true;
  });
  const [query, setQuery] = useState(() => {
    const savedItem = localStorage.getItem('savedStateSearching') as string;
    const parsedItem = JSON.parse(savedItem);
    return parsedItem ? `${parsedItem}` : null;
  });
  const [url, setUrl] = useState(() => {
    const savedItem = localStorage.getItem('savedStateSearching') as string;
    const parsedItem = JSON.parse(savedItem);
    return parsedItem ? `${characterByName}${parsedItem}` : `${characterByName}null`;
  });

  useEffect(() => {
    const saveSearching = localStorage.getItem('savedStateSearching');
    if (saveSearching && JSON.parse(saveSearching)) {
      setQuery(`${JSON.parse(saveSearching)}`);
      setUrl(`${characterByName}${JSON.parse(saveSearching)}`);
      setIsFirstCall(false);
    }
  }, [characterByName]);

  useEffect(() => {
    localStorage.setItem('savedStateSearching', JSON.stringify(query));
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
          throw Error();
        }
        setData(data.results);
      } catch {
        setIsError(true);
        setData([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [characterByName, url]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl(`${characterByName}${query}`);
    setIsFirstCall(false);
  };

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleChange = (id: number) => {
    setData((prevData) => {
      const updatedCards = prevData.map((todo) => {
        if (todo.id === id) {
          todo.isFavorite = !todo.isFavorite;
        }
        return todo;
      });
      return updatedCards;
    });
  };

  const handleClickToggle = (id = 0) => {
    const cardId = data.findIndex((item) => item.id === id);
    if (isPopup && id) {
      document.body.classList.remove('stop-scrolling');
      setDataPopup(data[cardId]);
      setIsPopup(false);
    } else {
      document.body.classList.add('stop-scrolling');
      setDataPopup(data[cardId]);
      setIsPopup(true);
    }
  };

  return (
    <div className="container">
      <SearchBar
        handleChangeForm={handleChangeForm}
        handleSubmit={handleSubmit}
        searching={query}
      />
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
              <Popup card={dataPopup} active={isPopup} handleClickToggle={handleClickToggle} />
            </>
          )}
        </>
      }
    </div>
  );
}

export default Home;
