import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AuthProvider } from './contexts/auth';
import './App.css';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

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
      <AuthProvider>
        <PublicRoutes />
        <PrivateRoutes />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
