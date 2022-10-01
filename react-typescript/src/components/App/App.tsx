import React from 'react';
import cardData from 'components/cardData/cardData';
import CardItem from 'components/CardItem/CardItem';
import './App.scss';

type Card = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  isFavourite: boolean;
};

type AppState = {
  cards: Card[];
};

type AppProps = Record<string, never>;

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    cards: cardData,
  };

  handleChange = (id: number) => {
    this.setState((prevState) => {
      const updatedCards = prevState.cards.map((todo) => {
        if (todo.id === id) {
          todo.isFavourite = !todo.isFavourite;
        }
        return todo;
      });
      return {
        cards: updatedCards,
      };
    });
  };

  render() {
    const cardItems = this.state.cards.map((item) => (
      <CardItem key={item.id} handleChange={this.handleChange} {...item} />
    ));
    return <div className="list">{cardItems}</div>;
  }
}

export default App;
