// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', 
    },
    success: {
      main: '#28a745', 
    },
    secondary: { 
      main: '#4a5092'
    },
    error: {
      main: '#dc3545', 
    },
    navbar: {
      main: '#dc3545'
    },
    warning: {
      main: '#F9E076'
    },
    background: {  
      default: '#eef2f6', 
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif', 
    fontSize: 7,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@import': [
          "url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap')"
        ],
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
          padding: 0,
        },
        '#root': {
          width: '75%',
          margin: '0 auto',
        },
      },
    },
  },
});

export default theme;
