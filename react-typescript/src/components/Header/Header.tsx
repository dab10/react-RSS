import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'utils/const/const';
import './Header.scss';

function Header() {
  return (
    <header className="header-container">
      <Link to={routes.homePage} className="page-name">
        Home
      </Link>
      <Link to={routes.aboutPage} className="page-name">
        About
      </Link>
    </header>
  );
}

export default Header;
