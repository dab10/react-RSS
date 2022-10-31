import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from 'utils/const/const';
import './Header.scss';

function Header() {
  const location = useLocation();
  return (
    <header className="header-container">
      <div className="page-name-container">
        <Link to={routes.homePage} className="page-name">
          Home
        </Link>
        <Link to={routes.formPage} className="page-name">
          Form
        </Link>
        <Link to={routes.aboutPage} className="page-name">
          About
        </Link>
      </div>
      <div className="current-position">
        Current position: {window.location.origin}
        {location.pathname}
      </div>
    </header>
  );
}

export default Header;
