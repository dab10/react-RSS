import React from 'react';
import './SearchBar.scss';

type SearchProps = {
  searching: string | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchBar(props: SearchProps) {
  return (
    <div className="searching">
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          value={props.searching === null ? '' : props.searching}
          name="searching"
          placeholder="Example: Rick Sanchez"
          onChange={props.handleChangeForm}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
