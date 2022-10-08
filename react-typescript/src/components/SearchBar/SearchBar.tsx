import React from 'react';
import './SearchBar.scss';

type SearchProps = {
  searching: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

class SearchBar extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return (
      <div className="searching">
        <form onSubmit={(event) => this.props.handleSubmit(event)}>
          <input
            type="text"
            value={this.props.searching === null ? '' : this.props.searching}
            name="searching"
            placeholder="Search"
            onChange={this.props.handleChangeForm}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
