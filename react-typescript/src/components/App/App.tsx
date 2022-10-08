import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Page404 from 'pages/Page404/Page404';
import Footer from 'components/Footer/Footer';
import routes from 'utils/const/const';
import Header from 'components/Header/Header';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
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
