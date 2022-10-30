import { AppContext } from 'context/AppState';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utils/const/const';
import './Header.scss';

function Header() {
  const { state } = useContext(AppContext);
  return (
    <header className="header-container">
      <Link to={routes.homePage} className="page-name">
        Home
      </Link>
      <Link to={routes.formPage} className="page-name">
        Form
      </Link>
      <Link to={routes.aboutPage} className="page-name">
        About
      </Link>
      {state.homePage.dataPopup.id ? (
        <Link to={`${routes.homePage}:id`} className="page-name">
          Item
        </Link>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
