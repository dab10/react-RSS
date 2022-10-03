import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Page404 from '../../pages/Page404/Page404';
import Footer from '../../components/Footer/Footer';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <>
        <header className="header-container">
          <Link to="/" className="page-name">
            Home
          </Link>
          <Link to="/about" className="page-name">
            About
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
