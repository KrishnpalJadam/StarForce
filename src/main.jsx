 import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

import './index.css';  
import App from './App';
import store from './Components/Redux/store';  

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </Provider>
  </StrictMode>
);
