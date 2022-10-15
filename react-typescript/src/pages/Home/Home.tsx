import React from 'react';
import './Home.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import CardList from 'components/CardList/CardList';

type Card = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  isFavorite: boolean;
};

type Cards = {
  results: Card[];
};

type HomeState = {
  cards: Cards;
  searching: string;
  isLoading: boolean;
  isFirstCall: boolean;
  errMessage: string | null;
};

type HomeProps = { [x: string]: string };

class Home extends React.Component<HomeProps, HomeState> {
  base: string;
  characterByName: string;
  saveSearchingInit: string;

  constructor(props: HomeProps) {
    super(props);
    this.base = 'https://rickandmortyapi.com/api';
    this.characterByName = `${this.base}/character/?name=`;
    this.saveSearchingInit = 'Rick Sanchez';
    this.state = {
      cards: {
        results: [],
      },
      searching: '',
      isLoading: false,
      isFirstCall: true,
      errMessage: '',
    };
  }

  async componentDidMount() {
    let saveSearching = '';
    console.log(saveSearching);
    console.log(typeof localStorage.getItem('savedStateSearching'));
    console.log(Boolean(localStorage.getItem('savedStateSearching')));
    if (localStorage.getItem('savedStateSearching') !== undefined) {
      saveSearching = JSON.parse(localStorage.getItem('savedStateSearching') as string);
    }
    console.log(saveSearching);
    await this.setState({
      searching: saveSearching,
    });
    this.fetchData(`${this.characterByName}${this.state.searching}`);
  }

  componentWillUnmount() {
    localStorage.setItem('savedStateSearching', JSON.stringify(this.state.searching));
  }

  fetchData(url: string) {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          cards: {
            results: data.results,
          },
          isLoading: false,
          errMessage: '',
        });
      })
      .catch(() => {
        this.state.isFirstCall
          ? this.setState({
              isLoading: false,
              isFirstCall: false,
              errMessage: '',
            })
          : this.setState({
              isLoading: false,
              errMessage: 'Could not fetch the data',
            });
      });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.fetchData(`${this.characterByName}${this.state.searching}`);
  };

  handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      searching: value,
    });
  };

  handleChange = (id: number) => {
    this.setState((prevState) => {
      const updatedCards = prevState.cards.results.map((todo) => {
        if (todo.id === id) {
          todo.isFavorite = !todo.isFavorite;
        }
        return todo;
      });
      return {
        cards: {
          results: updatedCards,
        },
      };
    });
  };

  render() {
    console.log(this.state);
    console.log(this.state.errMessage);
    return (
      <div className="container">
        <SearchBar
          handleChangeForm={this.handleChangeForm}
          handleSubmit={this.handleSubmit}
          searching={this.state.searching}
        />
        {this.state.errMessage ? (
          <div className="error-fetch">{this.state.errMessage}</div>
        ) : (
          <>
            {this.state.isLoading
              ? this.state.isLoading && (
                  <div className="loader">
                    <div></div>
                  </div>
                )
              : this.state.cards && (
                  <CardList cards={this.state.cards} handleChange={this.handleChange} />
                )}
          </>
        )}
      </div>
    );
  }
}

export default Home;
