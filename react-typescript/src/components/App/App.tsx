import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Page404 from 'pages/Page404/Page404';
import Footer from 'components/Footer/Footer';
import './App.scss';
import Form from 'pages/Form/Form';

class App extends React.Component {
  render() {
    return (
      <>
        <header className="header-container">
          <Link to="/" className="page-name">
            Home
          </Link>
          <Link to="/form" className="page-name">
            Form
          </Link>
          <Link to="/about" className="page-name">
            About
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
