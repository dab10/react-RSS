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
  isInit?: boolean;
};

type Cards = {
  results: Card[];
};

type HomeState = {
  cards: Cards;
  cardModal: Card;
  searching: string;
  isPopup: boolean;
};

function Home() {
  const base = 'https://rickandmortyapi.com/api';
  const characterByName = `${base}/character/?name=`;
  const stateInit = {
    cards: {
      results: [
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
          isInit: true,
        },
      ],
    },
    cardModal: {
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
    isPopup: false,
  };

  const [data, setData] = useState(stateInit);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstCall, setIsFirstCall] = useState(() => {
    const savedItem = localStorage.getItem('savedStateSearching') as string;
    const parsedItem = JSON.parse(savedItem);
    console.log(parsedItem);
    return parsedItem ? false : true;
  });
  const [query, setQuery] = useState(() => {
    const savedItem = localStorage.getItem('savedStateSearching') as string;
    const parsedItem = JSON.parse(savedItem);
    console.log(parsedItem);
    return parsedItem ? `${parsedItem}` : null;
  });
  const [url, setUrl] = useState(() => {
    const savedItem = localStorage.getItem('savedStateSearching') as string;
    const parsedItem = JSON.parse(savedItem);
    console.log(parsedItem);
    return parsedItem ? `${characterByName}${parsedItem}` : `${characterByName}null`;
  });
  // const [url, setUrl] = useState(`${characterByName}`);
  // const [search, setSearch] = useState(() => {
  //   const savedItem = localStorage.getItem('savedStateSearching') as string;
  //   const parsedItem = JSON.parse(savedItem);
  //   return parsedItem || '';
  // });

  useEffect(() => {
    console.log('1');
    const saveSearching = localStorage.getItem('savedStateSearching');
    console.log(saveSearching);
    if (saveSearching && JSON.parse(saveSearching)) {
      // setData((prevData) => {
      //   return {
      //     ...prevData,
      //     searching: JSON.parse(saveSearching),
      //   };
      // });
      setQuery(`${JSON.parse(saveSearching)}`);
      setUrl(`${characterByName}${JSON.parse(saveSearching)}`);
      setIsFirstCall(false);
    }
  }, [characterByName]);

  useEffect(() => {
    console.log('2');
    localStorage.setItem('savedStateSearching', JSON.stringify(query));
  }, [query]);

  // async componentDidMount() {
  //   let saveSearching = '';

  //   if (localStorage.getItem('savedStateSearching') !== undefined) {
  //     saveSearching = JSON.parse(localStorage.getItem('savedStateSearching') as string);
  //   }

  //   await this.setState({
  //     isFirstCall: saveSearching === null ? true : false,
  //     searching: saveSearching,
  //   });
  //   this.fetchData(`${this.characterByName}${this.state.searching}`);
  // }

  useEffect(() => {
    console.log('3');
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
          throw Error();
        }
        setData((prevData) => {
          return {
            ...prevData,
            cards: {
              results: data.results,
            },
          };
        });
      } catch {
        // console.log(isFirstCall);
        // setIsFirstCall((prevState) => {
        //   if (prevState) {
        //     prevState = !prevState;
        //   }
        //   return prevState;
        // });
        // console.log(isFirstCall);
        setIsError(true);
        setData((prevData) => {
          return {
            ...prevData,
            cards: {
              results: [],
            },
          };
        });
        // console.log('4');
        // console.log(isFirstCall);
        // if (isFirstCall) {
        //   setIsFirstCall(false);
        //   setErrorMessage('');
        //   console.log(isFirstCall);
        // } else {
        //   setErrorMessage('Could not fetch the data');
        //   console.log(errorMessage);
        // }
        // console.log(isFirstCall);
        // console.log(errorMessage);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [characterByName, url]);

  // async fetchData(url: string) {
  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw Error();
  //     }
  //     this.setState({
  //       cards: {
  //         results: data.results,
  //       },
  //       isLoading: false,
  //       errMessage: '',
  //     });
  //   } catch {
  //     this.state.isFirstCall
  //       ? this.setState({
  //           isLoading: false,
  //           isFirstCall: false,
  //           errMessage: '',
  //         })
  //       : this.setState({
  //           isLoading: false,
  //           errMessage: 'Could not fetch the data',
  //         });
  //   }
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl(`${characterByName}${query}`);
    setIsFirstCall(false);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   this.setState({
  //     isLoading: true,
  //   });
  //   this.fetchData(`${this.characterByName}${this.state.searching}`);
  // };

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    // setData((prevData) => {
    //   return {
    //     ...prevData,
    //     searching: value,
    //   };
    // });
  };

  // handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   this.setState({
  //     searching: value,
  //   });
  // };

  const handleChange = (id: number) => {
    setData((prevData) => {
      const updatedCards = prevData.cards.results.map((todo) => {
        if (todo.id === id) {
          todo.isFavorite = !todo.isFavorite;
        }
        return todo;
      });
      return {
        ...prevData,
        cards: {
          results: updatedCards,
        },
      };
    });
  };

  // handleChange = (id: number) => {
  //   this.setState((prevState) => {
  //     const updatedCards = prevState.cards.results.map((todo) => {
  //       if (todo.id === id) {
  //         todo.isFavorite = !todo.isFavorite;
  //       }
  //       return todo;
  //     });
  //     return {
  //       cards: {
  //         results: updatedCards,
  //       },
  //     };
  //   });
  // };

  const handleClickToggle = (id = 0) => {
    const cardId = data.cards.results.findIndex((item) => item.id === id);
    if (data.isPopup && id) {
      document.body.classList.remove('stop-scrolling');
      setData((prevData) => {
        return {
          ...prevData,
          cardModal: data.cards.results[cardId],
          isPopup: false,
        };
      });
    } else {
      document.body.classList.add('stop-scrolling');
      setData((prevData) => {
        return {
          ...prevData,
          cardModal: data.cards.results[cardId],
          isPopup: true,
        };
      });
    }
  };

  // handleClickToggle = (id = 0) => {
  //   const cardId = this.state.cards.results.findIndex((item) => item.id === id);
  //   if (this.state.isPopup && id) {
  //     document.body.classList.remove('stop-scrolling');
  //     this.setState({
  //       cardModal: this.state.cards.results[cardId],
  //       isPopup: false,
  //     });
  //   } else {
  //     document.body.classList.add('stop-scrolling');
  //     this.setState({
  //       cardModal: this.state.cards.results[cardId],
  //       isPopup: true,
  //     });
  //   }
  // };

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
                cards={data.cards}
                handleChange={handleChange}
                handleClickToggle={handleClickToggle}
              />
              <Popup
                card={data.cardModal}
                active={data.isPopup}
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
