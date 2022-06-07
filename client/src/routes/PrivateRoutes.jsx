import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';

import PostJobOffer from '../views/PostJobOffer';
import AspirantSearch from '../views/AspirantSearch'
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
      path='/aspirant-search'
      element={(
        <>
          <Navbar />
          <AspirantSearch />
        </>
      )}
    />
  </Routes>
);

export default PrivateRoutes;
