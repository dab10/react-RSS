import React from 'react';
import './About.scss';

function About() {
  return (
    <div className="about-page-container">
      <h2>About me</h2>
      <div>Hello!</div>
      <div>My name is Bazhenov Denis.</div>
      <div>I want to be a frontend developer.</div>
      <div>
        Telegram
        <a href="http://t.me/dab1000" className="telegram">
          @dab1000
        </a>
      </div>
    </div>
  );
}

export default About;
