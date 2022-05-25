import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Login from './views/Login';
import { AspirantSignup, CompanySignup, Signup } from './views/Signup';
import Navbar from './components/Navbar';
import PostJobOffer from './views/PostJobOffer';

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
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <a href="/login">Login</a>
              <a href="/post-job-offer">Post</a>
            </>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/aspirant" element={<AspirantSignup />} />
        <Route path="/signup/company" element={<CompanySignup />} />
        <Route path="/post-job-offer" element={<PostJobOffer />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
