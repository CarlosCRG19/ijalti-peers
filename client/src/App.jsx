import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AuthProvider } from './contexts/auth';
import { AspirantRoutes, CompanyRoutes, SharedRoutes } from './routes';

import Login from './views/Login';
import LandingPage from './views/LandingPage';
import PostJobOffer from './views/PostJobOffer';
import { AspirantSignup, CompanySignup, Signup } from './views/Signup';

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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/company" element={<CompanySignup />} />
          <Route path="/signup/aspirant" element={<AspirantSignup />} />
          <Route element={<SharedRoutes />}>
            <Route path="/landing" element={<LandingPage />} />
          </Route>
          <Route element={<CompanyRoutes />}>
            <Route path="/post-job-offer" element={<PostJobOffer />} />
          </Route>
          <Route element={<AspirantRoutes />}>
            <Route />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
