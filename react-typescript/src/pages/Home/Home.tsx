import React from 'react';
import cardData from 'components/cardData/cardData';
import CardItem from 'components/CardItem/CardItem';
import './Home.scss';

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

type HomeProps = Record<string, never>;

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
  state: HomeState = {
    cards: cardData,
    searching: '',
  };

  componentDidMount() {
    const saveState = JSON.parse(localStorage.getItem('savedState') as string);
    this.setState({ searching: saveState });
  }

  componentWillUnmount() {
    localStorage.setItem('savedState', JSON.stringify(this.state.searching));
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
      <div className="list">
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.searching}
              name="searching"
              placeholder="Search"
              onChange={this.handleChangeForm}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {cardItems}
      </div>
    );
  }
}

export default Home;
