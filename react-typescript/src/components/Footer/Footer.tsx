import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <footer className="footer-container">
        <div>
          <a className="footer-github" href="https://github.com/dab10">
            github
          </a>
        </div>
        <div className="footer-year">2022</div>
      </footer>
    </div>
  );
}

export default Footer;
