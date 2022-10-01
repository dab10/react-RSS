import React from 'react';
import { Link } from 'react-router-dom';
import './Page404.scss';

class About extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Page not found (404). Go to{' '}
          <Link to="/" className="homepage-link">
            Homepage
          </Link>
        </h2>
      </div>
    );
  }
}

export default About;
