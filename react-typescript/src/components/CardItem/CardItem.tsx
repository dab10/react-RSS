import React from 'react';
import './CardItem.scss';

type CardProps = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  isFavorite: boolean;
  handleChange: (id: number) => void;
};

class CardItem extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className="card-item">
        <img
          src={process.env.PUBLIC_URL + this.props.image}
          alt={this.props.name}
          className="card-item__image"
        />
        <div className="about-container">
          <div className="about-container__text">
            <div>Name: {this.props.name}</div>
            <div>Status: {this.props.status}</div>
            <div>Species: {this.props.species}</div>
            <div>Gender: {this.props.gender}</div>
          </div>
          <div className="about-container__like">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.props.isFavorite}
                onChange={() => this.props.handleChange(this.props.id)}
              />
              <span></span>
            </label>
          </div>
        </div>
        <div>{this.props.isFavorite}</div>
      </div>
    );
  }
}

export default CardItem;
