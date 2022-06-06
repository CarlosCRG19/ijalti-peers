import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';

import PostJobOffer from '../views/PostJobOffer';

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
  </Routes>
);

export default PrivateRoutes;
