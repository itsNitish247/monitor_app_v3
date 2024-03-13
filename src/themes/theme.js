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
    fontFamily: 'Poppins, sans-serif', 
    fontSize: 9,
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': {
          fontFamily: 'Poppins',
          src: `url(${require('../Fonts/Poppins-Regular.ttf')}) format('truetype')`, 
          fontWeight: 1,
          fontStyle: 'normal',
        },
      },
    },
  },
});

export default theme;
