import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Page404 from 'pages/Page404/Page404';
import Footer from 'components/Footer/Footer';
import ROUTES from 'utils/const/const';
import './App.scss';
class App extends React.Component {
  render() {
    return (
      <>
        <header className="header-container">
          <Link to={ROUTES.HOMEPAGE} className="page-name">
            Home
          </Link>
          <Link to={ROUTES.ABOUTPAGE} className="page-name">
            About
          </Link>
        </header>
        <Routes>
          <Route path={ROUTES.HOMEPAGE} element={<Home />} />
          <Route path={ROUTES.ABOUTPAGE} element={<About />} />
          <Route path={ROUTES.NOTFOUNDPAGE} element={<Page404 />} />
          <Route path={ROUTES.ANYPAGE} element={<Navigate to={ROUTES.NOTFOUNDPAGE} replace />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
