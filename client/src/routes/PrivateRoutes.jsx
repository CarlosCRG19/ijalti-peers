import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components';
import { useAuth } from '../contexts/auth';

import { PostJobOffer, AspirantProfile, CompanyProfile, AspirantFeed } from '../views';
import AspirantSearch from '../views/AspirantSearch';
import AspirantRoutes from './AspirantRoutes';
import CompanyRoutes from './CompanyRoutes';
import SharedRoutes from './SharedRoutes';

const PrivateRoutes = () => {
  const { idToken, user } = useAuth();
if (!idToken) return null;
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<SharedRoutes />}>
          <Route
            path="/profile/aspirant/:id"
            element={(
              <AspirantProfile />
            )}
          />
          <Route
            path="/profile/company/:id"
            element={(
              <CompanyProfile />
            )}
          />
        </Route>
        {user.role === 'company'
          ? (
            <Route element={<CompanyRoutes />}>
              <Route path="/post-job-offer" element={<PostJobOffer />} />
              <Route path="/" element={<Navigate to={`/profile/company/${user.userId}`} />} />
            </Route>
          )
          : (
            <Route element={<AspirantRoutes />}>
              <Route path="/" element={<AspirantFeed />} />
            </Route>
          )}
      </Routes>
    </>
  );
};

export default PrivateRoutes;
