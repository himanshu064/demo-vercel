import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';

import store from './store';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
        <Toaster />
      </Provider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
