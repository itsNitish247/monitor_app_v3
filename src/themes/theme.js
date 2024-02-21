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
    error: {
      main: '#dc3545', 
    },
    sidebar: {
      main: '#dc3545'
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif', 
    fontWeightBold:700,// Set the default font family
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@import': [
          "url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap')"
        ],
      },
    },
  },
});

export default theme;