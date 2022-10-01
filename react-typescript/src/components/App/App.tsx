import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
    );
  }
}

export default App;
