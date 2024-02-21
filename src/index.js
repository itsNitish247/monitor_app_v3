import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from '@mui/material/styles'; 
import theme from './themes/theme'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}> 
      <App />
    </ThemeProvider>
  </Provider>,
);
