import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../views/Login';
import { AspirantSignup, CompanySignup, Signup } from '../views/Signup';
import PostJobOffer from '../views/PostJobOffer';
import LandingPage from '../views/LandingPage';

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup/aspirant" element={<AspirantSignup />} />
    <Route path="/signup/company" element={<CompanySignup />} />
  </Routes>
);

export default PublicRoutes;
