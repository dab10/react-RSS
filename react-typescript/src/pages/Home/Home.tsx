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

type Cards = {
  results: Card[];
};

type HomeState = {
  cards: Cards;
  cardModal: Card;
  searching: string;
  isLoading: boolean;
  isFirstCall: boolean;
  isPopup: boolean;
  errMessage: string | null;
};

// type HomeProps = { [x: string]: string };

function Home() {
  // base: string;
  // characterByName: string;

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
    searching: '',
    isLoading: false,
    isFirstCall: true,
    isPopup: false,
    errMessage: '',
  };

  const [data, setData] = useState(stateInit);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const saveSearching = localStorage.getItem('savedStateSearching');
    if (saveSearching) {
      setData((prevData) => {
        return {
          ...prevData,
          isFirstCall: JSON.parse(saveSearching) === null ? true : false,
          searching: JSON.parse(saveSearching),
        };
      });
    }
  }, []);

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
    localStorage.setItem('savedStateSearching', JSON.stringify(data.searching));
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prevData) => {
        return {
          ...prevData,
          isLoading: true,
          errMessage: '',
        };
      });

      try {
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
        data.isFirstCall
          ? setData((prevData) => {
              return {
                ...prevData,
                isFirstCall: false,
                errMessage: '',
              };
            })
          : setData((prevData) => {
              return {
                ...prevData,
                errMessage: 'Could not fetch the data',
              };
            });
      }
      setData((prevData) => {
        return {
          ...prevData,
          isLoading: false,
        };
      });
    };

    setData((prevData) => {
      return {
        ...prevData,
        isLoading: false,
      };
    });

    fetchData();
  }, [data.isFirstCall, url]);

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
    setUrl(`${characterByName}${data.searching}`);
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
    setData((prevData) => {
      return {
        ...prevData,
        searching: value,
      };
    });
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
        searching={data.searching}
      />
      {data.errMessage ? (
        <div className="error-fetch">{data.errMessage}</div>
      ) : (
        <>
          {data.isLoading
            ? data.isLoading && (
                <div className="loader">
                  <div></div>
                </div>
              )
            : data.cards && (
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
      )}
    </div>
  );
}

export default Home;
