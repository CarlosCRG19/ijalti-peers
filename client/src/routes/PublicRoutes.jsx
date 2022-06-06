import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../views/Login';
import { Signup } from '../views/Signup';
import PostJobOffer from '../views/PostJobOffer';
import LandingPage from '../views/LandingPage';

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/post-job-offer" element={<PostJobOffer />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

export default PublicRoutes;
