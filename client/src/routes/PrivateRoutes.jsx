import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';

import { PostJobOffer, AspirantProfile, CompanyProfile } from '../views';

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/post-job-offer"
      element={(
        <>
          <Navbar />
          <PostJobOffer />
        </>
      )}
    />
    <Route
      path="/profile/aspirant/:id"
      element={(
        <>
          <Navbar />
          <AspirantProfile />
        </>
      )}
    />
    <Route
      path="/profile/company/:id"
      element={(
        <>
          <Navbar />
          <CompanyProfile />
        </>
      )}
    />
  </Routes>
);

export default PrivateRoutes;
