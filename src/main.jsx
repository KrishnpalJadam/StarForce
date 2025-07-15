 import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

import './index.css'; // Tailwind, Bootstrap, or global CSS
import App from './App';
import store from './Components/Redux/store'; // ✅ Make sure this path is correct

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
