import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';

import { PostJobOffer, AspirantProfile } from '../views';

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
  </Routes>
);

export default PrivateRoutes;
