import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import { AppState } from 'context/AppState';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <BrowserRouter>
    <AppState>
      <App />
    </AppState>
  </BrowserRouter>
);
