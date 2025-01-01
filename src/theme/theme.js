// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const themeOptions = {
  palette: {
    mode: 'light', 
    primary: {
      main: '#9785ba',
      light: '#af9fcd',
      contrastText: '#f9fafa',
    },
    secondary: {
      main: '#d7c7f4',
    },
    text: {
      primary: '#3c3c3c',
    },
  },
  typography: {
    fontFamily: 'Ubuntu', 
    h1: {
      fontFamily: 'Ubuntu',
    },
    h2: {
      fontFamily: 'Open Sans', 
    },
    h3: {
      fontFamily: 'Open Sans',
    },
    h4: {
      fontFamily: 'Open Sans',
    },
    h5: {
      fontFamily: 'Open Sans',
    },
    h6: {
      fontFamily: 'Open Sans',
    },
    subtitle2: {
      fontFamily: 'Open Sans',
    },
    body2: {
      fontFamily: 'Open Sans',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;