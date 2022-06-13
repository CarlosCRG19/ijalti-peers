import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

const CompanyRoutes = () => {
  const { idToken, user } = useAuth();

  console.log(idToken, user);
  if (!idToken || user.role !== 'company') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default CompanyRoutes;
