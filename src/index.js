  import 'react-app-polyfill/stable';
  import 'core-js';
  import React from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App';

  import { Provider } from 'react-redux';
  import store from './store';

  import { ThemeProvider } from '@mui/material/styles'; 
  import theme from './themes/theme'
import { ServerCountProvider } from './context/CountsContenxt';




  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ThemeProvider theme={theme}> 
      <ServerCountProvider> {/* Wrap your application with ServerCountProvider */}
        <App /> 
      </ServerCountProvider>
      </ThemeProvider>
    </Provider>,
  );
