import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Page404 from 'pages/Page404/Page404';
import Footer from 'components/Footer/Footer';
import routes from 'utils/const/const';
import './App.scss';
class App extends React.Component {
  render() {
    return (
      <>
        <header className="header-container">
          <Link to={routes.homePage} className="page-name">
            Home
          </Link>
          <Link to={routes.aboutPage} className="page-name">
            About
          </Link>
        </header>
        <Routes>
          <Route path={routes.homePage} element={<Home />} />
          <Route path={routes.aboutPage} element={<About />} />
          <Route path={routes.notFoundPage} element={<Page404 />} />
          <Route path={routes.anyPage} element={<Navigate to={routes.notFoundPage} replace />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
