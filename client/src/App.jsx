import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1877D2',
    },
    blue: {
      darkest: '#064887',
      dark: '#0862B9',
      regular: '#1877D2',
      light: '#3E8CD7',
      lightest: '#65A3DF',
    },
    orange: '#FF5A0B',
    green: '#8bc34a',
    gray: {
      A: '#F4F7FA',
      B: '#E7EDF3',
      C: '#8CA2BA',
      D: '#495869',
      E: '#122740',
    },
    white: '#fff',
    black: '#000',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      {'idToken' in localStorage && <PrivateRoutes />}
      <PublicRoutes />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
