import React from 'react';
import cardData from '../../components/cardData/cardData';
import CardItem from '../../components/CardItem/CardItem';
import './Home.scss';
import SearchBar from '../../components/SearchBar/SearchBar';

type Card = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  isFavorite: boolean;
};

type HomeState = {
  cards: Card[];
  searching: string;
};

type HomeProps = { [x: string]: string };

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      cards: cardData,
      searching: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('savedStateSearching') !== undefined) {
      const saveSearching = JSON.parse(localStorage.getItem('savedStateSearching') as string);
      this.setState({ searching: saveSearching });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('savedStateSearching', JSON.stringify(this.state.searching));
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  handleChangeForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    this.setState({
      searching: value,
    });
  }

  handleChange(id: number) {
    this.setState((prevState) => {
      const updatedCards = prevState.cards.map((todo) => {
        if (todo.id === id) {
          todo.isFavorite = !todo.isFavorite;
        }
        return todo;
      });
      return {
        cards: updatedCards,
      };
    });
  }

  render() {
    const cardItems = this.state.cards.map((item) => (
      <CardItem key={item.id} handleChange={this.handleChange} {...item} />
    ));
    return (
      <div>
        <SearchBar
          handleChangeForm={this.handleChangeForm}
          handleSubmit={this.handleSubmit}
          searching={this.state.searching}
        />
        <div className="list">{cardItems}</div>
      </div>
    );
  }
}

export default Home;
