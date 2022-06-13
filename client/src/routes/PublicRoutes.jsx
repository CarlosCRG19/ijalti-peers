import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../views/Login';
import { AspirantSignup, CompanySignup, Signup } from '../views/Signup';
import LandingPage from '../views/LandingPage';
import NotFound from '../views/NotFound/NotFound';

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup/aspirant" element={<AspirantSignup />} />
    <Route path="/signup/company" element={<CompanySignup />} />
    <Route path="/error" element={<NotFound />} />
  </Routes>
);

export default PublicRoutes;
