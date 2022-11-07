import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
const store = setupStore();
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
